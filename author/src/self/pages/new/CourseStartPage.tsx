import {getBackendCourseAndUnits} from "../../logic/backend/backend";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {CourseSidebarHelper} from "./CourseSidebar";

interface CourseStartPageProps {
    courseId: number;
}

export function CourseStartPage(props: CourseStartPageProps) {
    const loader = useLoader(() => getBackendCourseAndUnits(props.courseId));
    return <CourseSidebarHelper courseId={props.courseId} loader={loader} subpageSelector={null} children={""} />;
    
    
/*

    // ----------------------------------------------------------------------------------------------------------------
    // JSX
    // ----------------------------------------------------------------------------------------------------------------


            {/* unit }
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

*/

}
