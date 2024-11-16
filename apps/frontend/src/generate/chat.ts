import { useLaTeXStore } from "../store/LaTeXStore";

export const generateLaTeXFromChat = async () => {
	const latex = useLaTeXStore.getState().latex;
	const chatInput = useLaTeXStore.getState().chatInput;
	const addChatMessage = useLaTeXStore.getState().addChatMessage;
	const setLLMLoading = useLaTeXStore.getState().setLLMLoading;
	const llmModel = useLaTeXStore.getState().llmModel;
	const setLaTeX = useLaTeXStore.getState().setLaTeX;

	if (chatInput !== null) {
		try {
			setLLMLoading(true);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/generate/chat`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						chat: chatInput,
						currentLatex: latex,
						model: llmModel,
					}),
				},
			);
			const data = (await response.json()) as {
				success: boolean;
				result: string;
				error: string;
			};

			if (response.ok && data.success) {
				setLaTeX(data.result);
				addChatMessage(data.result, "bot", "chat", false);
			} else {
				addChatMessage(
					data.error ||
						"Some error has occurred. Please try again in a few moments.",
					"bot",
					"draw",
					true,
				);
			}

			setLLMLoading(false);

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (e: any) {
			addChatMessage(
				e.message ||
					"Some error has occurred. Please try again in a few moments.",
				"bot",
				"draw",
				true,
			);
			setLLMLoading(false);
		}
	} else {
		addChatMessage(
			"Please provide some instructions for the AI to generate LaTeX.",
			"bot",
			"draw",
			true,
		);
		setLLMLoading(false);
	}
};
