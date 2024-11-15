import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
	return (
		<>
			<div className="flex">
				<div className="flex-1 bg-red-200 h-[calc(100dvh-3rem)] border-r border-border">
					Paint and GUI Editor
				</div>
				<div className="flex-1">
					<ScrollArea className="h-[calc(100dvh-3rem)] w-full">
						<div className="h-40 border-b border-border bg-green-200">LaTeX Preview Render</div>
						<div className="h-40 border-b border-border bg-blue-200">LaTex Code Editor</div>
						<div className="h-40 bg-orange-200">Chat UI with AI</div>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
