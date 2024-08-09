import {
    createInitialUnit,
    createUnitAfter,
    createUnitBefore,
    deleteUnit,
    getBackendCourseAndUnits
} from "../../logic/backend/backend";
import {GetBackendCourseListResponseElement} from "../../../common/author-api/GetBackendCourseListResponse";
import React, {ReactNode} from "react";
import {GetBackendCourseAndUnitsResponse} from "../../../common/author-api/GetBackendCourseAndUnitsResponse";
import {InlineMarkdownButtonList} from "../../components/InlineMarkdownButtonList";
import {background} from "../../../common/util/background";
import {Button} from "@mui/material";
import {CourseSubpageSelector} from "./CourseSubpageSelector";
import {Loader} from "../../../uilib/util/useLoader";
import {useNavigate} from "react-router-dom";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";
import {PageFrame} from "./PageFrame";

// --------------------------------------------------------------------------------------------------------------------
// the sidebar itself
// --------------------------------------------------------------------------------------------------------------------

export interface CourseSidebarProps {
    courseId: number,
    response: GetBackendCourseAndUnitsResponse;
    subpageSelector: CourseSubpageSelector;
    
    selectSubpage: (subpageSelector: CourseSubpageSelector) => void;
    reload: () => void;
    closeCourse: () => void;
}

export function CourseSidebar(props: CourseSidebarProps) {
    return <>

        {/* course "list" */}
        <h1>Selected Course</h1>
        <InlineMarkdownButtonList<GetBackendCourseListResponseElement>
            elements={[{ courseId: props.courseId, title: props.response.title }]}
            courseIdForImages={null}
            keyMapper={course => course.courseId}
            labelMapper={course => course.title}
            onClick={props.closeCourse}
            selectedMapper={() => true}
        />
        <div>
            <Button onClick={() => props.selectSubpage("header")}>Kopfdaten</Button>
        </div>
        <div>
            <Button onClick={() => props.selectSubpage("images")}>Bildverwaltung</Button>
        </div>
        
        {/* unit list */}
        <h1>Units</h1>
        {props.response.units.length === 0 && <Button
            variant={"contained"}
            onClick={() => background(async () => {
                await createInitialUnit(props.courseId);
                props.reload();
            })}
        >Create initial unit</Button>}
        <InlineMarkdownButtonList
            elements={props.response.units}
            courseIdForImages={null}
            keyMapper={unit => unit.unitId}
            labelMapper={unit => unit.title}
            onClick={(unit) => props.selectSubpage(unit.unitId)}
            selectedMapper={unit => props.subpageSelector === unit.unitId}
            menu={[
                {
                  label: "Insert Before",
                  onClick: (unit) => {
                      background(async () => {
                          await createUnitBefore(unit.unitId);
                          props.reload();
                      });
                  },
                },
                {
                  label: "Insert After",
                    onClick: (unit) => {
                        background(async () => {
                            await createUnitAfter(unit.unitId);
                            props.reload();
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
                                props.reload();
                            }
                        });
                    },
                },
            ]}
        />
    </>;
}

// --------------------------------------------------------------------------------------------------------------------
// helper for the common case how sidebar gets used
// --------------------------------------------------------------------------------------------------------------------

export interface CourseSidebarHelperProps {
    courseId: number,
    loader: Loader<GetBackendCourseAndUnitsResponse>,
    subpageSelector: CourseSubpageSelector;
    children: ReactNode;
}

export function CourseSidebarHelper(props: CourseSidebarHelperProps) {
    const navigate = useNavigate();

    function selectSubpage(subpageSelector: CourseSubpageSelector) {
        navigate(`/courses/${props.courseId}/${subpageSelector}`);
    }

    function reload() {
        props.loader.reload(() => getBackendCourseAndUnits(props.courseId));
    }

    function closeCourse() {
        navigate("/");
    }

    return <FullWidthLoadingIndicator loader={props.loader}>
        {loaderResult => {
            const sidebar = <CourseSidebar
                courseId={props.courseId}
                response={loaderResult}
                subpageSelector={props.subpageSelector}
                selectSubpage={selectSubpage}
                reload={reload}
                closeCourse={closeCourse}
            />;
            return <PageFrame sidebar={sidebar} children={props.children} />;
        }}
    </FullWidthLoadingIndicator>;
    
}
