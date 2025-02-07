
export interface InlineSpacerProps {
    size: number;
}

export function InlineSpacer(props: InlineSpacerProps) {
    return <span style={{display: "inline-block", width: props.size + "em"}} />
}
