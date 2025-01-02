import styles from "./NavigationList.module.scss";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {ReactNode} from "react";

export interface NavigationListElement {
    label: string;
    decoration?: ReactNode | undefined | null;
    onClick: () => void;
}

export interface NavigationListProps {
    elements: NavigationListElement[];
}

export function NavigationList(props: NavigationListProps) {
    return <List className={styles.NavigationList}>
        {props.elements.map((element, index) =>
            <ListItem
                key={index}
                disablePadding
                {...(element.decoration ? {secondaryAction: element.decoration} : {})}
                className={styles.NavigationListElement}
            >
                <ListItemButton onClick={element.onClick}>
                    <ListItemText primary={element.label} />
                </ListItemButton>
            </ListItem>)
        }
    </List>
}
