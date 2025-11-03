import { Button } from "@/components/Button";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
	const onClick = () => {
		const isDark = document.documentElement.classList.toggle("dark");
		localStorage.theme = isDark ? "dark" : "light";
	};

	return (
		<Button onClick={onClick} className="relative">
			<SunIcon className="size-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
			<MoonIcon className="size-5 stroke-white absolute inset-0 m-auto transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
