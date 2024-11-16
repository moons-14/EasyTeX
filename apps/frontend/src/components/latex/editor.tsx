import { useLaTeXStore } from "@/store/LaTeXStore";
import Editor from "@monaco-editor/react";

export const LaTeXEditor = () => {
	const latex = useLaTeXStore((state) => state.latex);
	const setLaTeX = useLaTeXStore((state) => state.setLaTeX);
	return (
		<Editor
			height="30vh"
			defaultLanguage="plaintext"
			loading={"Loading LaTeX Editor..."}
			defaultValue={latex}
            value={latex}
			onChange={(value) => setLaTeX(value || "")}
			options={{
				minimap: { enabled: false },
				lineNumbers: "on",
				folding: false,
				contextmenu: true,
			}}
		/>
	);
};
