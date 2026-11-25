import { mostReadable } from "@ctrl/tinycolor";

export function bannerColors(color: string) {
	const foreground = mostReadable(color, ["black", "white"])!.toHexString();

	return { background: color, foreground };
}
