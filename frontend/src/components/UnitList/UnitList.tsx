import styles from "./UnitList.module.scss";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {UnitCompletionStatusIcon} from "./UnitCompletionStatusIcon";
import {CourseDetailState} from "../../logic/state/StateStore";
import {GetUnitListPageResponseElement} from "../../common/frontend-api/GetUnitListPageResponse";
import {MarkdownInline} from "../util/Markdown";

export interface UnitListProps {
    units: GetUnitListPageResponseElement[];
    courseState: CourseDetailState;
    onClickUnit: (unit: GetUnitListPageResponseElement, index: number) => void;
}

export function UnitList(props: UnitListProps) {
    const completedUnits = props.courseState.completionStatus === "new" ? 0
        : props.courseState.completionStatus === "active" ? props.courseState.completedUnits
        : props.units.length + 1;
    const unitsIncludingFinish: GetUnitListPageResponseElement[] = [...props.units, {title: "Finish Course"}];
    return <List className={styles.UnitList}>
        {unitsIncludingFinish.map((unit, index) =>
            <ListItem
                key={index}
                disablePadding
                secondaryAction={<UnitCompletionStatusIcon unitIndex={index} completedUnits={completedUnits}/>}
            >
                <ListItemButton onClick={() => props.onClickUnit(unit, index)}>
                    <ListItemText primary={<MarkdownInline renderConfiguration={{authorIdForImages: null}}>{unit.title}</MarkdownInline>}/>
                </ListItemButton>
            </ListItem>)
        }
    </List>
}
