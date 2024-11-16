import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { llmModels } from "../utils/llmModel";

export const generateChat = async (
	chat: string,
	currentLatex: string,
	model: keyof typeof llmModels,
	apiKey: { openai: string; gemini: string },
) => {
	const modelDetail = llmModels[model];

	if (!modelDetail) {
		throw new Error("Model not found");
	}

	if (modelDetail.provider === "openai") {
		const openai = createOpenAI({
			apiKey: apiKey.openai,
			baseURL:
				"https://gateway.ai.cloudflare.com/v1/e7d3f881b710e0efd62095efb7795061/voice-genius/openai",
		});
		const result = await generateText({
			model: openai(modelDetail.model, {}),
			messages: [
				{
					role: "system",
					content:
						"You are an assistant who edits LaTeX based on the user's instructions. You write accurate LaTeX based on the current LaTeX code and the user's instructions. If multiple formulae are included, output them in list format. Do not include any non-LaTeX content in the output. Output as display formulas. Be sure to output the leading and trailing $$ as well.",
				},
				{
					role: "user",
					content: `## Current LaTeX\n${currentLatex}\n\n## User Instruction\n${chat}`,
				},
			],
		});
		console.log(result.text);
		return result.text;
	}

	if (modelDetail.provider === "gemini") {
		const google = createGoogleGenerativeAI({
			// baseUrl:
			// 	"https://gateway.ai.cloudflare.com/v1/e7d3f881b710e0efd62095efb7795061/voice-genius/google-ai-studio",
			apiKey: apiKey.gemini,
		});
		const result = await generateText({
			model: google(modelDetail.model, {}),
			messages: [
				{
					role: "system",
					content:
						"You are an assistant who edits LaTeX based on the user's instructions. You write accurate LaTeX based on the current LaTeX code and the user's instructions. If multiple formulae are included, output them in list format. Do not include any non-LaTeX content in the output. Output as display formulas. Be sure to output the leading and trailing $$ as well.",
				},
				{
					role: "user",
					content: `## Current LaTeX\n${currentLatex}\n\n## User Instruction\n${chat}`,
				},
			],
		});
		console.log(result.text);
		return result.text;
	}
};
