import {MarkdownRenderConfiguration, renderMarkdown, renderMarkdownInline} from "./renderMarkdown";

export interface MarkdownProps {
    children: string;
    renderConfiguration: MarkdownRenderConfiguration
}

export function Markdown(props: MarkdownProps) {
    return <span dangerouslySetInnerHTML={{__html: renderMarkdown(props.children, props.renderConfiguration)}} />;
}

export function MarkdownInline(props: MarkdownProps) {
    return <span dangerouslySetInnerHTML={{__html: renderMarkdownInline(props.children, props.renderConfiguration)}} />;
}
