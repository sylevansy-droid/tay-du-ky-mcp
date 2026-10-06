#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "Tay Du Ky MCP", version: "1.0.0" });
const answer = (text: string) => ({ content: [{ type: "text" as const, text }] });

server.tool(
  "tay_du_ky_ke_chuyen",
  "Kể hoặc kể tiếp Tây Du Ký bằng tiếng Việt theo hồi, nhân vật hoặc sự kiện.",
  {
    chu_de: z.string().describe("Hồi, nhân vật hoặc sự kiện muốn nghe"),
    do_dai: z.enum(["ngan", "vua", "dai"]).optional().default("vua")
  },
  async ({ chu_de, do_dai }) => answer(
    `Hãy kể bằng tiếng Việt, tự nhiên và hấp dẫn về "${chu_de}". Độ dài: ${do_dai}. ` +
    `Bám theo cốt truyện Tây Du Ký và không chép nguyên văn bản dịch hiện đại.`
  )
);

server.tool(
  "tay_du_ky_tom_tat",
  "Tóm tắt một hồi, nhân vật hoặc sự kiện trong Tây Du Ký.",
  { noi_dung: z.string().describe("Nội dung cần tóm tắt") },
  async ({ noi_dung }) => answer(
    `Hãy tóm tắt bằng tiếng Việt phần Tây Du Ký về "${noi_dung}". ` +
    `Nêu diễn biến chính, nhân vật quan trọng và kết quả.`
  )
);

server.tool(
  "tay_du_ky_hoi_dap",
  "Hỏi đáp về nhân vật, pháp bảo, yêu quái, địa danh và diễn biến Tây Du Ký.",
  { cau_hoi: z.string().describe("Câu hỏi về Tây Du Ký") },
  async ({ cau_hoi }) => answer(
    `Hãy trả lời bằng tiếng Việt câu hỏi về Tây Du Ký: "${cau_hoi}". ` +
    `Nếu có nhiều dị bản thì nói rõ.`
  )
);

server.tool(
  "tay_du_ky_nhan_vat",
  "Giới thiệu một nhân vật trong Tây Du Ký.",
  { ten: z.string().describe("Tên nhân vật") },
  async ({ ten }) => answer(
    `Hãy giới thiệu nhân vật "${ten}" trong Tây Du Ký: thân phận, tính cách, ` +
    `năng lực/pháp bảo, vai trò và các sự kiện nổi bật.`
  )
);

const transport = new StdioServerTransport();
await server.connect(transport);
