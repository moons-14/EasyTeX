"use client";
import { Tldraw, exportToBlob } from "tldraw";
import "tldraw/tldraw.css";
import { useLaTeXStore } from "@/store/LaTeXStore";
import { components } from "./TLComponents";

export const Draw = () => {
	const setExportPNG = useLaTeXStore((state) => state.setExportPNG);
	return (
		<div className="h-full w-full">
			<Tldraw
				options={{ maxPages: 1 }}
				components={components}
				onMount={(editor) => {
					const exportPNG = async () => {
						const shapeIds = editor.getCurrentPageShapeIds();
						if (shapeIds.size === 0) throw new Error("No shapes to export");
						const blob = await exportToBlob({
							editor,
							ids: [...shapeIds],
							format: "png",
							opts: { background: true },
						});

						return blob;
					};
					setExportPNG(exportPNG);
				}}
			/>
		</div>
	);
};
