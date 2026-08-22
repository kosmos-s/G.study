const fs = require('node:fs');
const path = require('node:path');
const { EmbedBuilder, escapeMarkdown } = require('discord.js');

const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGE_FILE = path.join(DATA_DIR, 'status-message.json');

const STATE_GROUPS = [
  { key: 'running', emoji: '🟢', label: 'ONLINE' },
  { key: 'starting', emoji: '🟡', label: 'STARTING' },
  { key: 'stopping', emoji: '🟠', label: 'STOPPING' },
  { key: 'offline', emoji: '🔴', label: 'OFFLINE' },
  { key: 'unavailable', emoji: '⚪', label: 'UNAVAILABLE' }
];

function normalizeDisplayState(state) {
  const normalized = String(state || 'unknown').toLowerCase();

  if (normalized === 'running') return 'running';
  if (normalized === 'starting') return 'starting';
  if (normalized === 'stopping') return 'stopping';
  if (normalized === 'offline') return 'offline';

  return 'unavailable';
}

function formatUptime(uptimeMs) {
  const ms = Number(uptimeMs || 0);

  if (!Number.isFinite(ms) || ms <= 0) {
    return '방금 열림';
  }

  const totalSeconds = Math.floor(ms / 1000);

  if (totalSeconds < 60) {
    return '방금 열림';
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    if (hours > 0) return `${days}일 ${hours}시간`;
    return `${days}일`;
  }

  if (hours > 0) {
    if (minutes > 0) return `${hours}시간 ${minutes}분`;
    return `${hours}시간`;
  }

  return `${minutes}분`;
}

function buildGroupValue(rows, groupKey) {
  return rows
    .map((row) => {
      const safeName = escapeMarkdown(String(row.name));

      if (groupKey === 'running') {
        return `${safeName} · ${formatUptime(row.uptimeMs)}`;
      }

      return safeName;
    })
    .join('\n')
    .slice(0, 1024);
}

function buildStatusEmbed(rows, panelName) {
  // Pterodactyl API에서 받은 서버 순서를 그대로 유지합니다.
  const visibleRows = [...rows];

  const embed = new EmbedBuilder()
    .setTitle(`🦖 ${panelName}`)
    .setDescription('Server Status')
    .setFooter({
      text: `${visibleRows.length} Servers · Updated`
    })
    .setTimestamp();

  if (!visibleRows.length) {
    embed.addFields({
      name: '⚪ NO SERVERS',
      value: '현재 표시할 서버가 없습니다.',
      inline: false
    });

    return embed;
  }

  for (const group of STATE_GROUPS) {
    const groupedRows = visibleRows.filter(
      (row) => normalizeDisplayState(row.state) === group.key
    );

    if (!groupedRows.length) continue;

    embed.addFields({
      name: `${group.emoji} ${group.label} · ${groupedRows.length}`,
      value: buildGroupValue(groupedRows, group.key),
      inline: false
    });
  }

  return embed;
}

function buildErrorEmbed(panelName, message) {
  return new EmbedBuilder()
    .setColor(0xED4245)
    .setTitle(`🦖 ${panelName}`)
    .setDescription('Server Status')
    .addFields({
      name: '⚠️ STATUS UNAVAILABLE',
      value: `서버 상태를 불러오지 못했습니다.\n\n\`${String(message).slice(0, 900)}\``,
      inline: false
    })
    .setTimestamp();
}

function buildStateNotification(row, previousState) {
  const current = normalizeDisplayState(row.state);
  const previous = normalizeDisplayState(previousState);
  const safeName = escapeMarkdown(String(row.name));

  if (current === previous) {
    return null;
  }

  if (current === 'running') {
    return `🟢 ${safeName} 서버가 열렸습니다.`;
  }

  if (current === 'offline') {
    return `🔴 ${safeName} 서버가 종료되었습니다.`;
  }

  return null;
}

function readSavedMessageId() {
  try {
    return JSON.parse(fs.readFileSync(MESSAGE_FILE, 'utf8')).messageId || null;
  } catch (_) {
    return null;
  }
}

function saveMessageId(messageId) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    MESSAGE_FILE,
    JSON.stringify({ messageId }, null, 2),
    'utf8'
  );
}

async function upsertStatusMessage(channel, embed) {
  const savedId = readSavedMessageId();

  if (savedId) {
    try {
      const message = await channel.messages.fetch(savedId);
      await message.edit({ embeds: [embed] });
      return message;
    } catch (error) {
      console.warn(
        '[Discord] 기존 상태 메시지를 찾지 못해 새로 생성합니다:',
        error.message
      );
    }
  }

  const message = await channel.send({ embeds: [embed] });
  saveMessageId(message.id);
  return message;
}

module.exports = {
  buildStatusEmbed,
  buildErrorEmbed,
  buildStateNotification,
  upsertStatusMessage
};
