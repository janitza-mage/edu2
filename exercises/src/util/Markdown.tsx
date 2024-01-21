import {renderMarkdown, renderMarkdownInline} from "./renderMarkdown";

export interface MarkdownProps {
    children: string;
}

export function Markdown(props: MarkdownProps) {
    return <span dangerouslySetInnerHTML={{__html: renderMarkdown(props.children)}} />;
}

export function MarkdownInline(props: MarkdownProps) {
    return <span dangerouslySetInnerHTML={{__html: renderMarkdownInline(props.children)}} />;
}
