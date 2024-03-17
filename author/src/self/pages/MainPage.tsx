import {
    createUnitAfter,
    createUnitBefore, deleteUnit,
    getBackendCourseAndUnits,
    getBackendCourseList,
    getBackendUnit
} from "../logic/backend/backend";
import {GetBackendCourseListResponseElement} from "../../common/author-api/GetBackendCourseListResponse";
import React, {useState} from "react";
import {
    GetBackendCourseAndUnitsResponse,
    GetBackendCourseAndUnitsResponseUnit
} from "../../common/author-api/GetBackendCourseAndUnitsResponse";
import {CourseHeaderDataPanel} from "./CourseHeaderDataPanel";
import {GetBackendUnitResponse} from "../../common/author-api/GetBackendUnitResponse";
import {UnitDataPanel} from "./UnitDataPanel";
import {useLoader} from "../../uilib/util/useLoader";
import {InlineMarkdownButtonList} from "../components/InlineMarkdownButtonList";
import {background} from "../../common/util/background";

export function MainPage() {
    const courseListLoader = useLoader(getBackendCourseList);

    // ----------------------------------------------------------------------------------------------------------------
    // selected course
    // ----------------------------------------------------------------------------------------------------------------

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const courseLoader = useLoader<GetBackendCourseAndUnitsResponse | null>(async () => null);

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

    const selectedCourse =
        selectedCourseId === null ? null :
            courseListLoader.status !== "success" ? null :
                courseListLoader.result.courses.find(c => c.courseId === selectedCourseId) ?? null;

    // ----------------------------------------------------------------------------------------------------------------
    // selected unit
    // ----------------------------------------------------------------------------------------------------------------

    const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
    const unitLoader = useLoader<GetBackendUnitResponse | null>(async () => null);

    function selectUnit(unit: GetBackendCourseAndUnitsResponseUnit) {
        if (selectedUnitId === unit.unitId) {
            setSelectedUnitId(null);
            unitLoader.reload(async () => null);
        } else {
            setSelectedUnitId(unit.unitId);
            unitLoader.reload(async () => getBackendUnit(unit.unitId));
        }
    }

    const selectedUnit =
        selectedUnitId === null ? null :
            unitLoader.status !== "success" ? null :
                unitLoader.result;

    // ----------------------------------------------------------------------------------------------------------------
    // JSX
    // ----------------------------------------------------------------------------------------------------------------

    return <div style={{display: "flex", flexDirection: "row", width: "100%"}}>

        {/* left sidebar */}
        <div style={{flexGrow: 0, flexShrink: 0, width: "400px"}}>

            <h1>Course</h1>
            {/* course list (no course selected) */}
            {selectedCourse === null && courseListLoader.status === "success" && <InlineMarkdownButtonList
                elements={courseListLoader.result.courses}
                courseIdForImages={null}
                keyMapper={course => course.courseId}
                labelMapper={course => course.title}
                onClick={selectCourse}
            />}
            {/* course "list" containing only the selected course */}
            {selectedCourse !== null && <InlineMarkdownButtonList
                elements={[selectedCourse]}
                courseIdForImages={null}
                keyMapper={course => course.courseId}
                labelMapper={course => course.title}
                onClick={closeCourse}
                selectedMapper={() => true}
            />}

            {/* unit list */}
            {courseLoader.status === "success" && courseLoader.result !== null && <>
                <h1>Unit</h1>
                <InlineMarkdownButtonList
                    elements={courseLoader.result.units}
                    courseIdForImages={null}
                    keyMapper={unit => unit.unitId}
                    labelMapper={unit => unit.title}
                    onClick={selectUnit}
                    selectedMapper={unit => selectedUnitId !== null && selectedUnitId === unit.unitId}
                    menu={[
                        {
                          label: "Insert Before",
                          onClick: (unit) => {
                              background(async () => {
                                  await createUnitBefore(unit.unitId);
                                  courseLoader.reload(async () => selectedCourseId === null ? null : getBackendCourseAndUnits(selectedCourseId));
                              });
                          },
                        },
                        {
                          label: "Insert After",
                            onClick: (unit) => {
                                background(async () => {
                                    await createUnitAfter(unit.unitId);
                                    courseLoader.reload(async () => selectedCourseId === null ? null : getBackendCourseAndUnits(selectedCourseId));
                                });
                            },
                        },
                        "divider",
                        {
                          label: "Delete",
                            onClick: (unit) => {
                                background(async () => {
                                    // eslint-disable-next-line no-restricted-globals
                                    if (confirm("really delete " + unit.title + "?")) {
                                        await deleteUnit(unit.unitId);
                                        courseLoader.reload(async () => selectedCourseId === null ? null : getBackendCourseAndUnits(selectedCourseId));
                                    }
                                });
                            },
                        },
                    ]}
                />
            </>}

        </div>

        {/* main area */}
        <div style={{width: "1px", flexGrow: 1, flexShrink: 1, marginLeft: "10px"}}>

            {/* course header */}
            {selectedCourse !== null && courseLoader.status === "success" && courseLoader.result !== null && selectedUnitId === null && <>
                <h1>Course</h1>
                <CourseHeaderDataPanel
                    courseId={selectedCourse.courseId}
                    title={selectedCourse.title}
                    description={courseLoader.result.description}
                    scriptLibrary={courseLoader.result.scriptLibrary}
                    onDataUpdatedInBackend={() => {
                        courseListLoader.reload(getBackendCourseList);
                        courseLoader.reload(() => getBackendCourseAndUnits(selectedCourse.courseId));
                    }}
                />
            </>}

            {/* unit */}
            {selectedUnitId !== null && selectedUnit !== null && <>
                <h1>Unit</h1>
                <UnitDataPanel
                    unitId={selectedUnitId}
                    dataResponse={selectedUnit}
                    onDataUpdatedInBackend={() => {
                        if (selectedCourse !== null) {
                            courseLoader.reload(() => getBackendCourseAndUnits(selectedCourse.courseId));
                        }
                    }}
                />
            </>}

        </div>
    </div>;
}
