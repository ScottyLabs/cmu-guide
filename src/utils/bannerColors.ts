import { mostReadable } from "@ctrl/tinycolor";

export function bannerColors(color?: string) {
	const background = color && /^#[\da-f]{6}$/i.test(color) ? color : "#3b82f6";
	const foreground = mostReadable(background, ["black", "white"])!.toHexString();

	return { background, foreground };
}
