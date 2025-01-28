import {ReactNode} from "react";

// TODO CenteredContent is mostly used to apply a padding because it is used by default everywhere, but not needed.
// better add a padding and use CenteredContent only in the few places where it is actually needed. Probably
// near to nowhere because it is only useful when using a pixel-width or em-width, not a percentage width (% width
// can be equally achieved with padding).

export interface CenteredContentProps {
    widthPercent: number;
    children: ReactNode;
}

/**
 * A horizontally and vertically centered DIV, to be used as the root element for unit content.
 */
export function CenteredContent(props: CenteredContentProps) {
    // TODO handle content that is too large
    return <div style={{width: (props.widthPercent ?? 50) + "%", height: "100%", marginLeft: "auto", marginRight: "auto", position: "relative"}}>
        <div style={{width: "100%", position: "absolute", top: "50%", transform: "translateY(-50%)"}}>
            {props.children}
        </div>
    </div>
}
