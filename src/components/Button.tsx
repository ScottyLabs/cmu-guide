import type { ButtonHTMLAttributes } from "react";

const BASE_CLASSES = "p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 dark:bg-zinc-700 dark:border-zinc-500 dark:hover:bg-zinc-600 transition-colors";

export function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			className={`${className} ${BASE_CLASSES}`}
		>
			{children}
		</button>
	)
}

export function LinkButton({ className, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			{...props}
			className={`${className} ${BASE_CLASSES}`}
		>
			{children}
		</a>
	)
}
