// A small remark plugin that disables math parsing/rendering unless the
// document frontmatter contains `latex: true`.

type Frontmatter = { latex?: boolean } & Record<string, unknown>;

type VFileData = {
	astro?: { frontmatter?: Frontmatter };
	frontmatter?: Frontmatter;
};

type VFileLike = { data?: VFileData };

type BaseNode = { type: string };
type ParentNode = BaseNode & { children: AstNode[] };
type MathNode = BaseNode & { type: "math" | "inlineMath"; value: string };
type TextNode = BaseNode & { type: "text"; value: string };
type AstNode = ParentNode | MathNode | TextNode | BaseNode;

function isParentNode(node: AstNode): node is ParentNode {
	return Array.isArray((node as ParentNode).children);
}

function isMathNode(node: AstNode): node is MathNode {
	if (node.type !== "math" && node.type !== "inlineMath") return false;
	return typeof (node as { value?: unknown }).value === "string";
}

function replaceMathNodes(node: AstNode) {
	if (!isParentNode(node)) return;
	for (let i = 0; i < node.children.length; i += 1) {
		const child = node.children[i];
		if (isMathNode(child)) {
			const delim = child.type === "inlineMath" ? "$" : "$$";
			node.children[i] = {
				type: "text",
				value: `${delim}${child.value}${delim}`,
			};
			continue;
		}
		replaceMathNodes(child);
	}
}

export default function remarkOnlyIfLatex() {
	return (tree: AstNode, vfile: VFileLike) => {
		const fm = vfile.data?.astro?.frontmatter ?? vfile.data?.frontmatter;
		if (fm && fm.latex) return; // keep math nodes for latex-enabled files
		replaceMathNodes(tree);
	};
}
