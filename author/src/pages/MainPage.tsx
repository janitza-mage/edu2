import {useLoader} from "../util/useLoader";
import {getBackendCourseAndUnits, getBackendCourseList} from "../logic/backend/backend";
import {MarkdownInline} from "../components/util/Markdown";
import {GetBackendCourseListResponseElement} from "../common/author-api/GetBackendCourseListResponse";
import {useState} from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import styles from "./MainPage.module.scss";
import {
    GetBackendCourseAndUnitsResponse,
    GetBackendCourseAndUnitsResponseUnit
} from "../common/author-api/GetBackendCourseAndUnitsResponse";
import {CourseHeaderDataPanel} from "./CourseHeaderDataPanel";

export function MainPage() {
    const courseListLoader = useLoader(getBackendCourseList);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const courseLoader = useLoader<GetBackendCourseAndUnitsResponse | null>(async () => null);
    const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

    const selectedCourse =
        selectedCourseId === null ? null :
        courseListLoader.status !== "success" ? null :
        courseListLoader.result.courses.find(c => c.courseId === selectedCourseId) ?? null;

    function selectCourse(course: GetBackendCourseListResponseElement) {
        setSelectedCourseId(course.courseId);
        setSelectedUnitId(null);
        courseLoader.reload(() => getBackendCourseAndUnits(course.courseId));
    }

    function closeCourse() {
        setSelectedCourseId(null);
        setSelectedUnitId(null);
        courseLoader.reload(async () => null);
    }

    function selectUnit(unit: GetBackendCourseAndUnitsResponseUnit) {
        if (selectedUnitId === unit.unitId) {
            setSelectedUnitId(null);
        } else {
            setSelectedUnitId(unit.unitId);
        }
    }

    return <div style={{display: "flex", flexDirection: "row"}}>

        {/* left sidebar */}
        <div style={{width: "400px"}}>

            <h1>Course</h1>
            <List className={styles.EntityList}>

                {/* course list (no course selected) */}
                {selectedCourse === null && <>
                    {courseListLoader.status === "success" && courseListLoader.result.courses.map(course =>
                        <ListItem key={course.courseId} disablePadding className={styles.EntityListEntry}>
                            <ListItemButton onClick={() => selectCourse(course)}>
                                <ListItemText primary={<MarkdownInline>{course.title}</MarkdownInline>}/>
                            </ListItemButton>
                        </ListItem>
                    )}
                </>}

                {/* course "list" containing only the selected course */}
                {selectedCourse !== null &&
                    <ListItem disablePadding className={styles.EntityListEntry + " " + styles.selected}>
                        <ListItemButton onClick={closeCourse}>
                            <ListItemText
                                primary={<MarkdownInline>{selectedCourse.title}</MarkdownInline>}
                                secondary="click to close"
                            />
                        </ListItemButton>
                    </ListItem>
                }

            </List>

            {/* unit list */}
            {courseLoader.status === "success" && courseLoader.result !== null && <>
                <h1>Unit</h1>
                {courseLoader.result.units.map(unit => {
                    const selected = selectedUnitId !== null && selectedUnitId === unit.unitId;
                    return <ListItem key={unit.unitId} disablePadding className={styles.EntityListEntry + (selected ? " " + styles.selected : "")}>
                        <ListItemButton onClick={() => selectUnit(unit)}>
                            <ListItemText primary={<MarkdownInline>{unit.title}</MarkdownInline>}/>
                        </ListItemButton>
                    </ListItem>;
                })}
            </>}

        </div>

        {/* main area */}
        <div style={{flexGrow: 1, marginLeft: "10px"}}>
            {selectedCourse !== null && courseLoader.status === "success" && courseLoader.result !== null && selectedUnitId === null && <>
                <h1>Course</h1>
                <CourseHeaderDataPanel
                    courseId={selectedCourse.courseId}
                    title={selectedCourse.title}
                    description={courseLoader.result.description}
                    onDataUpdatedInBackend={() => {
                        courseListLoader.reload(getBackendCourseList);
                        courseLoader.reload(() => getBackendCourseAndUnits(selectedCourse.courseId));
                    }}
                />
            </>}
        </div>
    </div>;
}
