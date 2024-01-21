import {micromark} from "micromark";
import {math, mathHtml} from "micromark-extension-math";

export function renderMarkdown(markdownSource: string): string {
    return micromark(markdownSource, {
        allowDangerousHtml: true,
        extensions: [math()],
        htmlExtensions: [mathHtml()],
    });
}

// TODO this should probably be a bit more robust
export function renderMarkdownInline(markdownSource: string): string {
    let result = renderMarkdown(markdownSource).trim();
    if (result.startsWith("<p>") && result.endsWith("</p>")) {
        result = result.slice(3, -4);
    }
    return result;
}
