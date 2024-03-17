import {IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import styles from "./InlineMarkdownButtonList.module.scss";
import {MarkdownInline} from "../../uilib/markdown/Markdown";
import React from "react";
import {MarkdownRenderConfiguration} from "../../uilib/markdown/renderMarkdown";
import DeleteIcon from '@mui/icons-material/Delete';

export interface InlineMarkdownButtonListMenuItem<T> {
    label: string;
    onClick: (element: T) => void;
}

export interface InlineMarkdownButtonListProps<T> {
    elements: T[],
    authorIdForImages: number | null;
    keyMapper: (element: T) => string | number;
    labelMapper: (element: T) => string;
    selectedMapper?: (element: T) => boolean;
    onClick: (element: T) => void;
    menu?: InlineMarkdownButtonListMenuItem<T>[] | undefined | null;
}

export function InlineMarkdownButtonList<T>(props: InlineMarkdownButtonListProps<T>) {
    const markdownRenderConfiguration: MarkdownRenderConfiguration = {
        authorIdForImages: props.authorIdForImages,
    };
    return <List className={styles.InlineMarkdownButtonList}>
        {props.elements.map(element =>
            <ListItem
                key={props.keyMapper(element)}
                disablePadding
                className={styles.Entry + ((props.selectedMapper && props.selectedMapper(element)) ? " " + styles.selected : "")}
                secondaryAction={<IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>}
            >
                <ListItemButton onClick={() => props.onClick(element)}>
                    <ListItemText primary={<Typography noWrap={true}>
                        <MarkdownInline renderConfiguration={markdownRenderConfiguration}>
                            {props.labelMapper(element)}
                        </MarkdownInline>
                    </Typography>} />
                </ListItemButton>
            </ListItem>
        )}
    </List>;
}
