import { create } from "zustand";

export type LLMModel = "gpt-4o-mini" | "gpt-4o" | "gemini-flash" | "gemini-pro";
export const llmModels = ["gpt-4o-mini", "gpt-4o", "gemini-flash", "gemini-pro"];

export const useLaTeXStore = create<{
	latex: string;
	setLaTeX: (latex: string) => void;
	chatMessages: { role: string; message: string; type: "chat" | "draw" }[];
	addChatMessage: (
		message: string,
		role: "bot" | "user",
		type: "chat" | "draw",
	) => void;
	clearChatMessages: () => void;
	chatInput: string;
	setChatInput: (input: string) => void;
	generateLaTeXFromDrawing: () => void;
	generateLaTeXFromChat: () => void;
	llmModel: LLMModel;
	changeLLMModel: (model: LLMModel) => void;
}>((set) => ({
	latex: "",
	setLaTeX: (latex: string) => set({ latex }),
	chatMessages: [
		{
			role: "bot",
			type: "draw",
			message: "The drawing is not clear. Please try again.",
		},
		{
			role: "bot",
			type: "chat",
			message: "Hello! I am an assistant writing LaTeX. How can I help you?",
		},
	],
	addChatMessage: (message, role, type) =>
		set((state) => ({
			chatMessages: [{ message, role, type }, ...state.chatMessages],
		})),
	clearChatMessages: () => set({ chatMessages: [] }),
	chatInput: "",
	setChatInput: (input: string) => set({ chatInput: input }),
	generateLaTeXFromDrawing: () => {},
	generateLaTeXFromChat: () => {},
	llmModel: "gpt-4o-mini",
	changeLLMModel: (model) => set({ llmModel: model }),
}));
