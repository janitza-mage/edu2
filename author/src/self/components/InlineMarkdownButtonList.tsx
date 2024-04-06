import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import styles from "./InlineMarkdownButtonList.module.scss";
import {MarkdownInline} from "../../uilib/markdown/Markdown";
import React from "react";
import {MarkdownRenderConfiguration} from "../../uilib/markdown/renderMarkdown";
import DotsMenuIcon from '@mui/icons-material/MoreVert';

export interface InlineMarkdownButtonListMenuItem<T> {
    label: string;
    onClick: (element: T) => void;
}

export interface InlineMarkdownButtonListProps<T> {
    elements: T[],
    courseIdForImages: number | null;
    keyMapper: (element: T) => string | number;
    labelMapper: (element: T) => string;
    selectedMapper?: (element: T) => boolean;
    onClick: (element: T) => void;
    menu?: (InlineMarkdownButtonListMenuItem<T> | "divider")[] | undefined | null;
}

export function InlineMarkdownButtonList<T>(props: InlineMarkdownButtonListProps<T>) {
    const markdownRenderConfiguration: MarkdownRenderConfiguration = {
        courseIdForImages: props.courseIdForImages,
        allowDangerousProtocol: false,
    };

    const [menuTargetElement, setMenuTargetElement] = React.useState<null | T>(null);
    const [menuAnchorElement, setMenuAnchorElement] = React.useState<null | HTMLElement>(null);
    function onClickMenuButton(event: React.MouseEvent<HTMLButtonElement>, element: T) {
        setMenuTargetElement(element);
        setMenuAnchorElement(event.currentTarget);
    }

    return <>
        <List className={styles.InlineMarkdownButtonList}>
            {props.elements.map(element =>
                <ListItem
                    key={props.keyMapper(element)}
                    disablePadding={false}
                    className={styles.Entry + ((props.selectedMapper && props.selectedMapper(element)) ? " " + styles.selected : "")}
                    secondaryAction={!props.menu ? undefined :
                        <IconButton
                            edge="end"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickMenuButton(event, element)}
                        >
                            <DotsMenuIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton id={"a"} onClick={() => props.onClick(element)}>
                        <ListItemText primary={<Typography noWrap={true}>
                            <MarkdownInline renderConfiguration={markdownRenderConfiguration}>
                                {props.labelMapper(element)}
                            </MarkdownInline>
                        </Typography>} />
                    </ListItemButton>
                </ListItem>
            )}
        </List>
        {props.menu && <Menu
            open={Boolean(menuAnchorElement)}
            anchorEl={menuAnchorElement}
            onClose={() => setMenuAnchorElement(null)}
        >
            {props.menu.map((menuItem, menuItemIndex) => {
                if (menuItem === "divider") {
                    return <Divider key={"divider-" + menuItemIndex} />;
                }
                return <MenuItem
                    key={menuItemIndex}
                    onClick={() => {
                        setMenuAnchorElement(null);
                        if (menuTargetElement) {
                            menuItem.onClick(menuTargetElement);
                        }
                }}>
                    {menuItem.label}
                </MenuItem>;
            })}
        </Menu>}
    </>;
}
