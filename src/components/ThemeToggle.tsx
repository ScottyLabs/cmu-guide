import { Sun, Moon01 } from '@untitledui/icons';

export default function ThemeToggle() {
	const onClick = () => {
		const isDark = document.documentElement.classList.toggle("dark");
		localStorage.theme = isDark ? "dark" : "light";
	};

	return (
		<button
			onClick={onClick}
			className="relative p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 dark:bg-zinc-700 dark:border-zinc-500 dark:hover:bg-zinc-600 transition-colors"
		>
			<Sun className="size-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
			<Moon01 className="size-4.5 stroke-white absolute inset-0 m-auto transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
