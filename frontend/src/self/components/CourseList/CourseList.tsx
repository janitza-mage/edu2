import styles from "./CourseList.module.scss";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {CourseOverviewState} from "../../logic/state/StateStore";
import {CourseCompletionStatusIcon} from "./CourseCompletionStatusIcon";
import {GetCourseListPageResponseElement} from "../../../common/frontend-api/GetCourseListPageResponse";
import {MarkdownInline} from "../util/Markdown";

export interface CourseListEntry {
    course: GetCourseListPageResponseElement;
    state: CourseOverviewState;
}

export interface CourseListProps {
    entries: CourseListEntry[];
    onClickEntry: (entry: CourseListEntry) => void;
}

export function CourseList({entries, onClickEntry}: CourseListProps) {
    return <List className={styles.CourseList}>
        {entries.map(entry => <ListItem
            key={entry.course.courseId}
            disablePadding
            secondaryAction={<CourseCompletionStatusIcon status={entry.state.completionStatus}/>}
        >
            <ListItemButton onClick={() => onClickEntry(entry)}>
                <ListItemText primary={<MarkdownInline renderConfiguration={{authorIdForImages: null}}>{entry.course.title}</MarkdownInline>}/>
            </ListItemButton>
        </ListItem>)}
    </List>
}
