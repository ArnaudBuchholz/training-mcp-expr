import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import 'punyexpr';

const { name, version } = JSON.parse(readFileSync(new URL(join(import.meta.url, '../package.json')).pathname, 'utf-8'));

// Since we use stdio transport, use stderr for logging
console.error(`Starting ${name}@${version} server...`);
console.error(`Using punyexpr@${punyexpr.version}`);

const server = new McpServer({ name, version });

server.tool('evaluate',
  'Evaluates a mathematical expression, supports most operators and parentheses',
  { expr: z.string() },
  async ({ expr }) => {
    console.error(`Received expression: ${expr}`);
    try {
      const value = global.punyexpr(expr)();
      return {
        content: [{ type: 'text', text: String(value) }]
      };
    } catch (e) {
      console.error(`Error evaluating expression: ${e}`);
      return {
        content: [{ type: 'text', text: 'The expression could not be evaluated' }]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
