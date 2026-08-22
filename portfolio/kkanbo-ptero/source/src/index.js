require('dotenv').config();

const { Client, GatewayIntentBits, Events } = require('discord.js');
const { PterodactylClient } = require('./pterodactyl');
const {
  buildStatusEmbed,
  buildErrorEmbed,
  buildStateNotification,
  upsertStatusMessage
} = require('./statusBoard');

const required = [
  'DISCORD_TOKEN',
  'DISCORD_CHANNEL_ID',
  'PTERODACTYL_URL',
  'PTERODACTYL_API_KEY'
];

for (const key of required) {
  if (!process.env[key]?.trim()) {
    console.error(`[설정 오류] .env의 ${key} 값이 비어 있습니다.`);
    process.exit(1);
  }
}

const panelName = process.env.PANEL_NAME?.trim() || "깐보's Pterodactyl";
const pollSeconds = Math.max(30, Number(process.env.UPDATE_INTERVAL_SECONDS) || 30);
const boardRefreshSeconds = Math.max(
  pollSeconds,
  Number(process.env.BOARD_REFRESH_SECONDS) || 300
);

const ptero = new PterodactylClient(
  process.env.PTERODACTYL_URL,
  process.env.PTERODACTYL_API_KEY
);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let pollInProgress = false;
let previousRows = null;
let lastBoardUpdateAt = 0;
let boardInErrorState = false;

function rowsToStateMap(rows) {
  return new Map(
    rows.map((row) => [
      String(row.identifier),
      {
        name: row.name,
        state: String(row.state || 'unknown').toLowerCase()
      }
    ])
  );
}

function hasServerListOrStateChanged(previous, current) {
  if (!previous) return true;
  if (previous.length !== current.length) return true;

  const previousMap = rowsToStateMap(previous);

  for (const row of current) {
    const old = previousMap.get(String(row.identifier));

    if (!old) return true;
    if (old.name !== row.name) return true;
    if (old.state !== String(row.state || 'unknown').toLowerCase()) return true;
  }

  return false;
}

async function getTextChannel(channelId, label) {
  const channel = await client.channels.fetch(channelId);

  if (!channel || !channel.isTextBased() || !channel.messages) {
    throw new Error(`${label} 채널이 일반 텍스트 채널이 아니거나 봇이 접근할 수 없습니다.`);
  }

  return channel;
}

async function sendStateNotifications(notificationChannel, previous, current) {
  if (!previous) return;

  const previousMap = rowsToStateMap(previous);

  for (const row of current) {
    const old = previousMap.get(String(row.identifier));

    // 봇 재시작 또는 새 서버 추가 시에는 갑작스러운 알림을 보내지 않습니다.
    if (!old) continue;

    const text = buildStateNotification(row, old.state);

    if (text) {
      await notificationChannel.send({ content: text });
      console.log(`[상태 알림] ${row.name}: ${old.state} -> ${row.state}`);
    }
  }
}

async function pollServers() {
  if (pollInProgress) return;
  pollInProgress = true;

  try {
    const boardChannel = await getTextChannel(
      process.env.DISCORD_CHANNEL_ID,
      'DISCORD_CHANNEL_ID'
    );

    const notificationChannelId =
      process.env.DISCORD_NOTIFICATION_CHANNEL_ID?.trim() ||
      process.env.DISCORD_CHANNEL_ID;

    const notificationChannel =
      notificationChannelId === process.env.DISCORD_CHANNEL_ID
        ? boardChannel
        : await getTextChannel(notificationChannelId, 'DISCORD_NOTIFICATION_CHANNEL_ID');

    const rows = await ptero.getStatusRows();
    const changed = hasServerListOrStateChanged(previousRows, rows);
    const now = Date.now();
    const refreshDue = now - lastBoardUpdateAt >= boardRefreshSeconds * 1000;

    await sendStateNotifications(notificationChannel, previousRows, rows);

    if (changed || refreshDue || boardInErrorState) {
      const embed = buildStatusEmbed(rows, panelName);
      await upsertStatusMessage(boardChannel, embed);

      lastBoardUpdateAt = now;
      boardInErrorState = false;

      console.log(
        `[현황판 갱신] ${new Date().toLocaleString('ko-KR')} · 서버 ${rows.length}개${
          changed ? ' · 상태 변경 감지' : ' · 업타임 갱신'
        }`
      );
    }

    previousRows = rows;
  } catch (error) {
    console.error('[상태 확인 오류]', error);

    try {
      const boardChannel = await getTextChannel(
        process.env.DISCORD_CHANNEL_ID,
        'DISCORD_CHANNEL_ID'
      );

      if (!boardInErrorState) {
        const embed = buildErrorEmbed(panelName, error.message);
        await upsertStatusMessage(boardChannel, embed);
        boardInErrorState = true;
      }
    } catch (discordError) {
      console.error('[Discord 오류]', discordError);
    }
  } finally {
    pollInProgress = false;
  }
}

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`[Discord 연결 완료] ${readyClient.user.tag}`);
  console.log(`[상태 확인] ${pollSeconds}초 간격`);
  console.log(`[현황판 업타임 갱신] ${boardRefreshSeconds}초 간격`);

  await pollServers();
  setInterval(pollServers, pollSeconds * 1000);
});

client.on('error', (error) => console.error('[Discord Client 오류]', error));

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error('[Discord 로그인 실패]', error);
  process.exit(1);
});
