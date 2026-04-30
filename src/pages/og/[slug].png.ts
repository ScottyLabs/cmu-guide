import type { APIRoute, GetStaticPaths } from "astro";
import sharp from "sharp";

type PageFrontmatter = {
	title?: string;
	description?: string;
	category?: string;
	sidebar?: {
		label?: string;
	};
};

type PageModule = {
	frontmatter?: PageFrontmatter;
};

const defaultTitle = "cmu.guide";
const defaultDescription =
	"Your go-to guide for navigating the Tartan life, academics, and beyond!";
const backgroundImagePath = "public/background.png";

const pages = {
	...import.meta.glob<PageModule>("../*.md", { eager: true }),
	...import.meta.glob<PageModule>("../*.mdx", { eager: true }),
};

const pageData = Object.entries(pages).map(([path, page]) => {
	const slug = path.replace(/^\.\.\//, "").replace(/\.(md|mdx)$/, "");
	const frontmatter = page.frontmatter ?? {};

	return {
		slug,
		props: {
			title: frontmatter.title?.trim() || defaultTitle,
			description: frontmatter.description?.trim() || defaultDescription,
			category:
				frontmatter.sidebar?.label?.trim() ||
				frontmatter.category?.trim() ||
				"Guide",
			pathname: slug === "index" ? "/" : `/${slug}`,
		},
	};
});

export const getStaticPaths: GetStaticPaths = () =>
	pageData.map(({ slug, props }) => ({
		params: { slug },
		props,
	}));

type OgProps = {
	title: string;
	description: string;
	category: string;
	pathname: string;
};

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

const wrapText = (value: string, maxChars: number, maxLines: number) => {
	const words = value.trim().replace(/\s+/g, " ").split(" ");
	const lines: string[] = [];
	let currentLine = "";

	for (const word of words) {
		const nextLine = currentLine ? `${currentLine} ${word}` : word;
		if (nextLine.length <= maxChars) {
			currentLine = nextLine;
			continue;
		}

		if (currentLine) {
			lines.push(currentLine);
		}
		currentLine = word;

		if (lines.length === maxLines) {
			break;
		}
	}

	if (currentLine && lines.length < maxLines) {
		lines.push(currentLine);
	}

	if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
		lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?]*$/, "")}...`;
	}

	return lines;
};

const pill = (label: string, x: number, width: number) => `
	<g>
		<rect x="${x}" y="54" width="${width}" height="48" rx="24" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.38)" />
		<text x="${x + width / 2}" y="85" class="pill" text-anchor="middle">${escapeXml(label)}</text>
	</g>
`;

const textLines = (
	lines: string[],
	x: number,
	y: number,
	lineHeight: number,
	className: string,
) =>
	lines
		.map(
			(line, index) =>
				`<text x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`,
		)
		.join("");

const buildOgSvg = ({ title, description, category, pathname }: OgProps) => {
	const titleLines = wrapText(title, 25, 2);
	const descriptionLines = wrapText(description, 50, 3);
	const footerText = pathname === "/" ? "cmu.guide" : `cmu.guide${pathname}`;
	const categoryWidth = Math.max(154, Math.min(360, category.length * 13 + 56));

	return `
		<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="shade" x1="0" x2="1">
					<stop offset="0" stop-color="#08111f" stop-opacity="0.2" />
					<stop offset="0.58" stop-color="#08111f" stop-opacity="0.38" />
					<stop offset="1" stop-color="#08111f" stop-opacity="0.2" />
				</linearGradient>
				<style>
					.text { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
					.pill { font: 700 22px Inter, ui-sans-serif, system-ui, sans-serif; fill: rgba(255,255,255,0.94); letter-spacing: 0; }
					.title { font: 800 78px Inter, ui-sans-serif, system-ui, sans-serif; fill: #ffffff; letter-spacing: 0; }
					.description { font: 500 45px Inter, ui-sans-serif, system-ui, sans-serif; fill: rgba(255,255,255,0.86); letter-spacing: 0; }
					.footer { font: 700 24px Inter, ui-sans-serif, system-ui, sans-serif; fill: rgba(255,255,255,0.92); letter-spacing: 0; }
					.footer-subtle { font: 600 22px Inter, ui-sans-serif, system-ui, sans-serif; fill: rgba(255,255,255,0.74); letter-spacing: 0; }
				</style>
			</defs>
			<rect width="1200" height="630" fill="url(#shade)" />
			<g class="text">
				${pill("cmu.guide", 64, 182)}
				${pill(category, 264, categoryWidth)}
				${textLines(titleLines, 72, 250, 88, "title")}
				${textLines(descriptionLines, 76, 414, 48, "description")}
				<rect x="64" y="520" width="1072" height="64" rx="24" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.26)" />
				<text x="92" y="561" class="footer">${escapeXml(footerText)}</text>
				<text x="1108" y="561" text-anchor="end" class="footer-subtle">ScottyLabs</text>
			</g>
		</svg>
	`;
};

export const GET: APIRoute<OgProps> = async ({ props }) => {
	const svg = buildOgSvg(props);
	const png = await sharp(backgroundImagePath)
		.resize(1200, 630, { fit: "cover" })
		.composite([{ input: new TextEncoder().encode(svg) }])
		.png()
		.toBuffer();

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
