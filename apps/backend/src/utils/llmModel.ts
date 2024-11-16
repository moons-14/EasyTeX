export const llmModels = {
	"gpt-4o-mini": {
		provider: "openai",
		model: "gpt-4o-mini",
	},
	"gpt-4o": {
		provider: "openai",
		model: "gpt-4o",
	},
	"gemini-flash": {
		provider: "gemini",
		model: "gemini-1.5-flash-002",
	},
	"gemini-pro": {
		provider: "gemini",
		model: "gemini-1.5-pro-002",
	},
} as const;
