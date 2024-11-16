import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type LLMModel, llmModels, useLaTeXStore } from "@/store/LaTeXStore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export const LaTeXChat = () => {
	const chatInput = useLaTeXStore((state) => state.chatInput);
	const setChatInput = useLaTeXStore((state) => state.setChatInput);
	const addChatMessage = useLaTeXStore((state) => state.addChatMessage);
	const chatMessages = useLaTeXStore((state) => state.chatMessages);
	const generateLaTeXFromChat = useLaTeXStore(
		(state) => state.generateLaTeXFromChat,
	);
	const generateLaTeXFromDrawing = useLaTeXStore(
		(state) => state.generateLaTeXFromDrawing,
	);
	const llmModel = useLaTeXStore((state) => state.llmModel);
	const changeLLMModel = useLaTeXStore((state) => state.changeLLMModel);
	const llmLoading = useLaTeXStore((state) => state.llmLoading);

	return (
		<div className="p-4">
			<div className="pb-4 font-semibold text-lg">
				Generate or Fix LaTeX by Chat
			</div>
			<div className="flex justify-between items-center gap-4 pb-4">
				<Button
					className="flex-1"
					onClick={generateLaTeXFromDrawing}
					disabled={llmLoading}
				>
					Generate LaTeX from drawing
				</Button>
				<Button
					className="flex-1"
					variant="outline"
					disabled={!chatInput}
					onClick={generateLaTeXFromChat || llmLoading}
				>
					Generate LaTeX from Chat
				</Button>
				<Select
					onValueChange={(value) => changeLLMModel(value as LLMModel)}
					value={llmModel}
                    disabled={llmLoading}
				>
					<SelectTrigger className="flex-1">
						<SelectValue placeholder="AI Model" />
					</SelectTrigger>
					<SelectContent>
						{llmModels.map((model) => (
							<SelectItem key={model} value={model}>
								{model}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Textarea
				className="w-full h-40"
				value={chatInput}
				rows={4}
				onChange={(e) => {
					setChatInput(e.target.value);
				}}
			/>
			<div className="mt-4 space-y-4">
                {
                    llmLoading && (
                        <div className="text-center text-sm text-slate-500">Generating...</div>
                    )
                }
				{chatMessages.map((msg, i) => (
					<div
						key={`${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							i
						}-message`}
						className="flex justify-start items-end"
					>
						<div
							className={cn(
								msg.role === "bot"
									? "bg-slate-100 text-black"
									: "bg-slate-950 text-white",
								"rounded-md p-4 max-w-2/3",
							)}
						>
							{msg.message}
						</div>
						{msg.type === "draw" && <div className="mb-1 ml-2">from draw</div>}
					</div>
				))}
			</div>
		</div>
	);
};
