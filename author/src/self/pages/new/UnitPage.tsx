import {getBackendCourseAndUnits, getBackendUnit} from "../../logic/backend/backend";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {CourseSidebarHelper} from "./CourseSidebar";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";
import {UnitDataPanel} from "../panels/UnitDataPanel";

interface UnitPageProps {
    courseId: number;
    unitId: number;
}

export function UnitPage(props: UnitPageProps) {
    const courseLoader = useLoader(() => getBackendCourseAndUnits(props.courseId));
    const unitLoader = useLoader(() => getBackendUnit(props.unitId));
    return <CourseSidebarHelper courseId={props.courseId} loader={courseLoader} subpageSelector={null}>
        <FullWidthLoadingIndicator loader={courseLoader}>
            {_courseResult => <FullWidthLoadingIndicator loader={unitLoader}>
                {unitResult => <>
                    <h1>Unit</h1>
                    <UnitDataPanel
                        unitId={props.unitId}
                        dataResponse={unitResult}
                        onDataUpdatedInBackend={() => {
                            courseLoader.reload(() => getBackendCourseAndUnits(props.courseId));
                            unitLoader.reload(() => getBackendUnit(props.unitId));
                        }}
                    />
                </>}
            </FullWidthLoadingIndicator>}
        </FullWidthLoadingIndicator>
    </CourseSidebarHelper>;
}
