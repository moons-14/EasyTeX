import { useLaTeXStore } from "../store/LaTeXStore";

export const generateLaTeXFromDrawing = async () => {
	const exportPNG = useLaTeXStore.getState().exportPNG;
	const addChatMessage = useLaTeXStore.getState().addChatMessage;
	const setLLMLoading = useLaTeXStore.getState().setLLMLoading;
	const llmModel = useLaTeXStore.getState().llmModel;
	const setLaTeX = useLaTeXStore.getState().setLaTeX;

	if (exportPNG !== null) {
		try {
			const blob = await exportPNG();
			if (!blob) throw new Error("error exporting draw");

			setLLMLoading(true);

			const _blob = (await blob.arrayBuffer()) as ArrayBuffer;
			const base64String = btoa(
				new Uint8Array(_blob).reduce(
					(data, byte) => data + String.fromCharCode(byte),
					"",
				),
			);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/generate/draw`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ draw: base64String, model: llmModel }),
				},
			);
			const data = (await response.json()) as {
				success: boolean;
				result: string;
				error: string;
			};

			if (response.ok && data.success) {
				setLaTeX(data.result);
				addChatMessage(data.result, "bot", "draw", false);
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
			"Some error has occurred. Please try again in a few moments.",
			"bot",
			"draw",
			true,
		);
		setLLMLoading(false);
	}
};
