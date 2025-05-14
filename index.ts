import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import 'punyexpr';

// Should be part of punyexpr package
declare global {
  const punyexpr: (expr: string) => () => any;
}

const server = new McpServer({
  name: 'training-mcp-expr',
  version: JSON.parse(readFileSync(new URL(join(import.meta.url, '../package.json')).pathname, 'utf-8')).version,
});

server.tool('evaluate',
  'Evaluate an mathematical expression, supports +, -, *, /, and ^',
  { expr: z.string() },
  async ({ expr }) => {
    try {
      const value = punyexpr(expr)();
      return {
        content: [{ type: 'text', text: String(value) }]
      };
    } catch {
      return {
        content: [{ type: 'text', text: 'The expression could not be evaluated' }]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
