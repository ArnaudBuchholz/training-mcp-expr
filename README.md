# training-mcp-expr
Example of MCP server to evaluate simple mathematical expressions

Based on :
* https://github.com/modelcontextprotocol/typescript-sdk
* https://github.com/ArnaudBuchholz/punyexpr

Install the MCP server as an `stdio` server with :
```json
"mcp-expr": {
  "command": "npx",
  "args": [
    "--y",
    "tsx",
    "/absolute/path/to/training-mcp-expr/index.ts"
  ],
  "env": {}
}
```
