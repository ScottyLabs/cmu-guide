import type { APIRoute, GetStaticPaths } from "astro";
import { Resvg } from "@resvg/resvg-js";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { getNavigation, hrefForSlug, normalizeSlug } from "@/utils/navigation";

type PageFrontmatter = {
	title: string;
	description: string;
};

type PageModule = {
	frontmatter: PageFrontmatter;
};

const projectPath = (...segments: string[]) => resolve(process.cwd(), ...segments);
const backgroundImagePath = projectPath("public", "background.png");
const interFontPaths = [
	projectPath("src", "assets", "fonts", "inter", "Inter-Medium.ttf"),
	projectPath("src", "assets", "fonts", "inter", "Inter-SemiBold.ttf"),
	projectPath("src", "assets", "fonts", "inter", "Inter-Bold.ttf"),
	projectPath("src", "assets", "fonts", "inter", "Inter-ExtraBold.ttf"),
];

if (!existsSync(backgroundImagePath)) {
	throw new Error(`Missing OG background image: ${backgroundImagePath}`);
}

for (const fontPath of interFontPaths) {
	if (!existsSync(fontPath)) {
		throw new Error(`Missing OG font file: ${fontPath}`);
	}
}

const pages = import.meta.glob<PageModule>("../**/*.{md,mdx}", { eager: true });
const navigation = getNavigation();

const pageData = Object.entries(pages).map(([path, page]) => {
	const slug = path.replace(/^\.\.\//, "").replace(/\.(md|mdx)$/, "");
	const normalizedSlug = normalizeSlug(slug);
	const { frontmatter } = page;
	const navItem = navigation.bySlug.get(normalizedSlug);

	return {
		slug,
		props: {
			title: frontmatter.title,
			description: frontmatter.description,
			category: navItem?.sectionLabel ?? "cmu.guide",
			pathname: hrefForSlug(normalizedSlug),
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

const titleY = 244;
const titleLineHeight = 80;
const descriptionX = 76;
const descriptionLineHeight = 50;

const descriptionTextLines = (lines: string[], y: number) =>
	lines
		.map(
			(line, index) =>
				`<text x="${descriptionX}" y="${y + index * descriptionLineHeight}" class="description">${escapeXml(line)}</text>`,
		)
		.join("");

const buildOgSvg = ({ title, description, category, pathname }: OgProps) => {
	const titleLines = wrapText(title, 24, 2);
	const descriptionLines = wrapText(description, 47, 4);
	const descriptionY = titleY + (titleLines.length - 1) * titleLineHeight + 86;
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
					.text { font-family: "Inter", sans-serif; }
					.pill { font-family: "Inter", sans-serif; font-size: 22px; font-weight: 700; fill: rgba(255,255,255,0.94); letter-spacing: 0; }
					.title { font-family: "Inter", sans-serif; font-size: 78px; font-weight: 800; fill: #ffffff; letter-spacing: 0; }
					.description { font-family: "Inter", sans-serif; font-size: 44px; font-weight: 500; fill: rgba(255,255,255,0.86); letter-spacing: 0; }
					.footer { font-family: "Inter", sans-serif; font-size: 26px; font-weight: 700; fill: rgba(255,255,255,0.92); letter-spacing: 0; }
					.footer-subtle { font-family: "Inter", sans-serif; font-size: 26px; font-weight: 600; fill: rgba(255,255,255,0.74); letter-spacing: 0; }
				</style>
			</defs>
			<rect width="1200" height="630" fill="url(#shade)" />
			<g class="text">
				${pill("cmu.guide", 64, 182)}
				${pill(category, 264, categoryWidth)}
				${textLines(titleLines, 72, titleY, titleLineHeight, "title")}
				${descriptionTextLines(descriptionLines, descriptionY)}
				<rect x="64" y="520" width="1072" height="64" rx="24" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.26)" />
				<text x="92" y="561" class="footer">${escapeXml(footerText)}</text>
				<text x="1108" y="561" text-anchor="end" class="footer-subtle">ScottyLabs</text>
			</g>
		</svg>
	`;
};

export const GET: APIRoute<OgProps> = async ({ props }) => {
	const svg = buildOgSvg(props);
	const textOverlay = new Resvg(svg, {
		font: {
			fontFiles: interFontPaths,
			loadSystemFonts: false,
			defaultFontFamily: "Inter",
			sansSerifFamily: "Inter",
		},
	}).render().asPng();
	const png = await sharp(backgroundImagePath)
		.resize(1200, 630, { fit: "cover" })
		.composite([{ input: textOverlay }])
		.png()
		.toBuffer();

	return new Response(png as BodyInit, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
};
