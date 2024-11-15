import { Button } from "@/components/ui/button";
import { Bug, Twitter } from "lucide-react";

export const Header = () => {
	return (
		<header className="h-12 flex justify-between items-center px-8 border-b border-border/70">
			<div className="text-lg font-bold">EasyTeX</div>
			<div className="flex items-center gap-2">
				<a href="https://x.com/moons_dev" target="_blank" rel="noreferrer">
					<Button variant="ghost" size="icon">
						<Twitter />
					</Button>
				</a>
				<a
					href="https://github.com/moons-14/EasyTeX/issues"
					target="_blank"
					rel="noreferrer"
				>
					<Button variant="ghost" size="icon">
						<Bug />
					</Button>
				</a>
			</div>
		</header>
	);
};
