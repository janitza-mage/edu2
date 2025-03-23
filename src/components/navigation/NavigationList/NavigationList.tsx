import styles from "./NavigationList.module.scss";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ReactElement} from "react";

export interface NavigationListElement {
    icon: ReactElement;
    label: string;
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
                className={styles.NavigationListElement}
            >
                <ListItemButton onClick={element.onClick}>
                    <ListItemIcon>{element.icon}</ListItemIcon>
                    <ListItemText primary={element.label} />
                </ListItemButton>
            </ListItem>)
        }
    </List>
}
