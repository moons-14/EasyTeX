import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { llmModels } from "../utils/llmModel";

export const generateDraw = async (
	draw: string,
	model: keyof typeof llmModels,
	apiKey: {
		openai: string;
		gemini: string;
	},
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
						"Output the formula contained in the given image as a latex. If several formulas are included, output them in list format. The output must not contain any content other than LaTeX.",
				},
				{
					role: "user",
					content: [
						{
							type: "image",
							image: `data:image/png;base64,${draw.replace(/^data:image\/\w+;base64,/, "")}`,
						},
						{
							type: "text",
							text: "LaTeX the formulae contained in this image.",
						},
					],
				},
			],
		});
		console.log(result.text);
		return result.text;
	}

	const google = createGoogleGenerativeAI({
		baseUrl:
			"https://gateway.ai.cloudflare.com/v1/e7d3f881b710e0efd62095efb7795061/voice-genius/google-ai-studio",
		apiKey: apiKey.gemini,
	});
	const result = await generateText({
		model: google(modelDetail.model, {}),
		messages: [
			{
				role: "system",
				content:
					"Output the formula contained in the given image as a latex. If several formulas are included, output them in list format. The output must not contain any content other than LaTeX.",
			},
			{
				role: "user",
				content: [
					{
						type: "file",
						data: draw,
						mimeType: "image/png",
					},
					{
						type: "text",
						text: "LaTeX the formulae contained in this image.",
					},
				],
			},
		],
	});
};
