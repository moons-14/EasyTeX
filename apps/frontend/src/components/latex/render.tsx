import { useLaTeXStore } from "@/store/LaTeXStore";
import Latex from "react-latex-next";
import { Button } from "../ui/button";
import "katex/dist/katex.min.css";

export const LaTeXRender = () => {
	const latex = useLaTeXStore((state) => state.latex);
	const generateLaTeXFromDrawing = useLaTeXStore((state) => state.generateLaTeXFromDrawing);

	return (
		<>
			{latex ? (
				<div className="h-full w-full p-4">
					<Latex>
						{latex}
					</Latex>
				</div>
			) : (
				<div className="flex justify-center items-center min-h-40">
					Generate LaTeX from the button below!
				</div>
			)}
		</>
	);
};