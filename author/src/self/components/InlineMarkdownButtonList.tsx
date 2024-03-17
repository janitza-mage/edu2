import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import styles from "./InlineMarkdownButtonList.module.scss";
import {MarkdownInline} from "../../uilib/markdown/Markdown";
import React from "react";
import {MarkdownRenderConfiguration} from "../../uilib/markdown/renderMarkdown";

export interface InlineMarkdownButtonListEntry {
    key: string | number;
    selected?: boolean;
    onClick: () => void;
    content: string;
}

export interface InlineMarkdownButtonListProps {
    authorIdForImages: number | null;
    entries: InlineMarkdownButtonListEntry[];
}

export function InlineMarkdownButtonList(props: InlineMarkdownButtonListProps) {
    const markdownRenderConfiguration: MarkdownRenderConfiguration = {
        authorIdForImages: props.authorIdForImages,
    };
    return <List className={styles.InlineMarkdownButtonList}>
        {props.entries.map(entry =>
            <ListItem key={entry.key} disablePadding className={styles.Entry + (entry.selected ? " " + styles.selected : "")}>
                <ListItemButton onClick={entry.onClick}>
                    <ListItemText primary={
                        <Typography noWrap={true}>
                            <MarkdownInline renderConfiguration={markdownRenderConfiguration}>
                                {entry.content}
                            </MarkdownInline>
                        </Typography>
                    }/>
                </ListItemButton>
            </ListItem>
        )}
    </List>;
}
