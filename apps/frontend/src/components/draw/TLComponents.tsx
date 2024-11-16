import {
	DefaultToolbar,
	type TLComponents,
	TldrawUiMenuItem,
	useEditor,
	useIsToolSelected,
	useTools,
} from "tldraw";
import { Button } from "../ui/button";

// reference: https://github.com/tldraw/tldraw/blob/main/apps/examples/src/examples/custom-menus/CustomMenusExample.tsx

//[11]
function CustomToolbar() {
	const editor = useEditor();
	const tools = useTools();
	const isSelectToolSelected = useIsToolSelected(tools.select);
	const isHandToolSelected = useIsToolSelected(tools.hand);
	const isDrawToolSelected = useIsToolSelected(tools.draw);
	const isTextToolSelected = useIsToolSelected(tools.text);
	const isEraserToolSelected = useIsToolSelected(tools.eraser);

	return (
		<div>
			<DefaultToolbar>
				<TldrawUiMenuItem {...tools.select} isSelected={isSelectToolSelected} />
				<TldrawUiMenuItem {...tools.hand} isSelected={isHandToolSelected} />
				<TldrawUiMenuItem {...tools.draw} isSelected={isDrawToolSelected} />
				<TldrawUiMenuItem {...tools.text} isSelected={isTextToolSelected} />
				<TldrawUiMenuItem {...tools.eraser} isSelected={isEraserToolSelected} />
				
				{/* <div className="border-l border h-6" />
				<TldrawUiMenuItem {...tools.hand} isSelected={isHandToolSelected} /> */}
			</DefaultToolbar>
		</div>
	);
}

export const components: TLComponents = {
	PageMenu: null,
	Toolbar: CustomToolbar,
};
