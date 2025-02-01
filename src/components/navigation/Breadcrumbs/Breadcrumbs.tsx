import {Link} from "react-router-dom";
import {Fragment} from "react";

export interface BreadcrumbsElement {
    text: string;
    to: string;
}

export interface BreadcrumbsProps {
    elements: BreadcrumbsElement[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
    return <div style={{fontSize: "1.5em"}}>
        {props.elements.map((element, index) => <Fragment key={index}>
            {index > 0 ? " > " : ""}
            <Link to={element.to}>{element.text}</Link>
        </Fragment>)}
        &nbsp;
    </div>
}
