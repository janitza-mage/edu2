import React, {ReactElement, useMemo} from 'react';
import KaTeX, {KatexOptions} from "katex";

// --------------------------------------------------------------------------------------------------------------------
// helpers
// --------------------------------------------------------------------------------------------------------------------

function render(source: string, displayMode: boolean): string {
    const translatedSource = source
        .replaceAll("§cursor", "#kern -0.01em #textcolor{red}{#rule{0.02em}{0.7em}} #kern -0.01em#relax ")
        .replaceAll("#", "\\");
    const options: KatexOptions = {
        displayMode,
        throwOnError: false,
        errorColor: "red",
        output: "html",
    };
    return KaTeX.renderToString(translatedSource, options);
}

function useRendered(source: string, displayMode: boolean): string {
    return useMemo(() => render(source, displayMode), [source, displayMode]);
}

// --------------------------------------------------------------------------------------------------------------------
// base props
// --------------------------------------------------------------------------------------------------------------------

export interface MathProps {
    source: string;
}

// --------------------------------------------------------------------------------------------------------------------
// div props and component
// --------------------------------------------------------------------------------------------------------------------

export interface MathDivProps extends MathProps {
}

export function MathDiv(props: MathDivProps) {
    const html = useRendered(props.source, true);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function mathDiv(source: string): ReactElement {
    return <MathDiv source={source} />;
}

// --------------------------------------------------------------------------------------------------------------------
// span props and component
// --------------------------------------------------------------------------------------------------------------------

export interface MathSpanProps extends MathProps {
}

export function MathSpan(props: MathSpanProps) {
    const html = useRendered(props.source, false);
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function mathSpan(source: string): ReactElement {
    return <MathSpan source={source} />;
}

// --------------------------------------------------------------------------------------------------------------------
// inline-block span props and component
// --------------------------------------------------------------------------------------------------------------------

export interface MathInlineBlockProps extends MathProps {
    widthEm: number;
}

export function MathInlineBlock(props: MathInlineBlockProps) {
    const html = useRendered(props.source, true);
    return <span style={{display: "inline-block", width: props.widthEm + "em"}} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function mathInlineBlock(source: string, widthEm: number): ReactElement {
    return <MathInlineBlock source={source} widthEm={widthEm} />;
}
