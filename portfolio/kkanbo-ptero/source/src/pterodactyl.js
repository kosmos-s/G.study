class PterodactylApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'PterodactylApiError';
    this.status = status;
  }
}

function normalizeBaseUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

class PterodactylClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = normalizeBaseUrl(baseUrl);
    this.apiKey = String(apiKey || '').trim();
  }

  async request(apiPath) {
    const response = await fetch(`${this.baseUrl}${apiPath}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Accept: 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      let detail = '';

      try {
        const body = await response.json();
        detail = body?.errors?.[0]?.detail || body?.message || '';
      } catch (_) {
        // JSON 형식이 아닌 오류 응답은 무시합니다.
      }

      throw new PterodactylApiError(
        `Pterodactyl API ${response.status}${detail ? `: ${detail}` : ''}`,
        response.status
      );
    }

    return response.json();
  }

  async listServers() {
    const servers = [];
    let page = 1;
    let totalPages = 1;

    do {
      const payload = await this.request(`/api/client?per_page=100&page=${page}`);
      servers.push(...(payload.data || []));

      totalPages = payload.meta?.pagination?.total_pages || 1;
      page += 1;
    } while (page <= totalPages);

    return servers;
  }

  async getServerRuntime(server) {
    const attrs = server.attributes || {};

    if (attrs.status === 'suspended') {
      return { state: 'suspended', uptimeMs: 0 };
    }

    if (attrs.status === 'installing') {
      return { state: 'installing', uptimeMs: 0 };
    }

    if (attrs.status === 'restoring_backup') {
      return { state: 'restoring', uptimeMs: 0 };
    }

    try {
      const payload = await this.request(
        `/api/client/servers/${attrs.identifier}/resources`
      );

      const state = String(payload.attributes?.current_state || 'unknown').toLowerCase();
      const rawUptime = Number(payload.attributes?.resources?.uptime || 0);

      return {
        state,
        uptimeMs: Number.isFinite(rawUptime) && rawUptime > 0 ? rawUptime : 0
      };
    } catch (error) {
      console.error(
        `[Pterodactyl] ${attrs.name || attrs.identifier} 상태 조회 실패:`,
        error.message
      );

      return { state: 'unknown', uptimeMs: 0 };
    }
  }

  async getStatusRows() {
    const servers = await this.listServers();

    const excludedServers = new Set(
      String(process.env.EXCLUDE_SERVERS || '')
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean)
    );

    const visibleServers = servers.filter((server) => {
      const attrs = server.attributes || {};
      const name = String(attrs.name || '').trim().toLowerCase();
      const identifier = String(attrs.identifier || '').trim().toLowerCase();

      return !excludedServers.has(name) && !excludedServers.has(identifier);
    });

    return Promise.all(
      visibleServers.map(async (server) => {
        const attrs = server.attributes || {};
        const runtime = await this.getServerRuntime(server);

        return {
          identifier: attrs.identifier,
          name: attrs.name || attrs.identifier || '이름 없는 서버',
          state: runtime.state,
          uptimeMs: runtime.uptimeMs
        };
      })
    );
  }
}

module.exports = {
  PterodactylClient,
  PterodactylApiError
};
