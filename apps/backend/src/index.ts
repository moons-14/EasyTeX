import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { z } from "zod";
import { generateDraw } from "./generate/draw";
import type { llmModels } from "./utils/llmModel";

const app = new Hono();

app.use(cors());

const GenerateDrawSchema = z.object({
	draw: z.string(), // base64
	model: z.string(),
});

app.post(
	"/generate/draw",
	zValidator("json", GenerateDrawSchema),
	async (c) => {
		const { draw, model } = c.req.valid("json");
		const { OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY } = env<{
			OPENAI_API_KEY: string;
			GOOGLE_GENERATIVE_AI_API_KEY: string;
		}>(c);
		try {
			const result = await generateDraw(draw, model as keyof typeof llmModels, {
				openai: OPENAI_API_KEY,
				gemini: GOOGLE_GENERATIVE_AI_API_KEY,
			});
			return c.json({ success: true, result });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (e: any) {
			return c.json({ success: false, error: e.message });
		}
	},
);

app.post("/generate/chat", (c) => {
	return c.text("Hello Hono!");
});

export default app;
