import {Link} from "react-router-dom";

export interface BreadcrumbsElement {
    text: string;
    to: string;
}

export interface BreadcrumbsProps {
    elements: BreadcrumbsElement[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
    return <div>
        {props.elements.map((element, index) => <>
            {index > 0 ? ">" : ""}
            <Link to={element.to}>{element.text}</Link>
        </>)}
    </div>
}
