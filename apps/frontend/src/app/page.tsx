"use client";
import { Draw } from "@/components/draw";
import { LaTeXChat } from "@/components/latex/chat";
import { LaTeXEditor } from "@/components/latex/editor";
import { LaTeXRender } from "@/components/latex/render";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
	return (
		<>
			<div className="flex">
				<div className="flex-1 h-[calc(100dvh-3rem)] border-r border-border">
					<Draw />
				</div>
				<div className="flex-1">
					<ScrollArea className="h-[calc(100dvh-3rem)] w-full">
						<div className="min-h-40 border-b border-border">
							<LaTeXRender />
						</div>
						<div className="min-h-40 border-b border-border">
							<LaTeXEditor />
						</div>
						<div className="h-40">
              <LaTeXChat />
            </div>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
