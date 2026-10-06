#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTayDuKyTools } from "./tools/tay-du-ky.js";

const server = new McpServer({ name: "Tay Du Ky MCP", version: "1.0.0" });
registerTayDuKyTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
