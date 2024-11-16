import { generateLaTeXFromChat } from "@/generate/chat";
import { generateLaTeXFromDrawing } from "@/generate/draw";
import { create } from "zustand";

export type LLMModel = "gpt-4o-mini" | "gpt-4o" | "gemini-flash" | "gemini-pro";
export const llmModels = [
	"gpt-4o-mini",
	"gpt-4o",
	"gemini-flash",
	"gemini-pro",
];

export const useLaTeXStore = create<{
	latex: string;
	setLaTeX: (latex: string) => void;
	chatMessages: {
		role: string;
		message: string;
		type: "chat" | "draw";
		error: boolean;
	}[];
	addChatMessage: (
		message: string,
		role: "bot" | "user",
		type: "chat" | "draw",
		error?: boolean,
	) => void;
	clearChatMessages: () => void;
	chatInput: string;
	setChatInput: (input: string) => void;
	generateLaTeXFromDrawing: () => void;
	generateLaTeXFromChat: () => void;
	llmModel: LLMModel;
	changeLLMModel: (model: LLMModel) => void;
	exportPNG: (() => Promise<Blob>) | null;
	setExportPNG: (exportPNG: (() => Promise<Blob>) | null) => void;
	llmLoading: boolean;
	setLLMLoading: (loading: boolean) => void;
}>((set) => ({
	latex: "",
	setLaTeX: (latex: string) => set({ latex }),
	chatMessages: [
		{
			role: "bot",
			type: "chat",
			message: "Hello! I am an assistant writing LaTeX. How can I help you?",
			error: false,
		},
	],
	addChatMessage: (message, role, type, error = false) =>
		set((state) => ({
			chatMessages: [{ message, role, type, error }, ...state.chatMessages],
		})),
	clearChatMessages: () => set({ chatMessages: [] }),
	chatInput: "",
	setChatInput: (input: string) => set({ chatInput: input }),
	generateLaTeXFromDrawing: generateLaTeXFromDrawing,
	generateLaTeXFromChat: generateLaTeXFromChat,
	llmModel: "gpt-4o-mini",
	changeLLMModel: (model) => set({ llmModel: model }),
	exportPNG: null,
	setExportPNG: (exportPNG) => set({ exportPNG }),
	llmLoading: false,
	setLLMLoading: (loading) => set({ llmLoading: loading }),
}));
