import {useBackend} from "../../logic/content/useBackend";
import {Footer} from "./Footer";
import {useStateStore} from "../../logic/state/useStateStore";
import {CourseDetailState} from "../../logic/state/StateStore";
import {UnitList} from "../../components/UnitList/UnitList";
import {useNavigate} from "react-router-dom";
import {WithFooter} from "../../components/Footer/WithFooter";
import {GetUnitListPageResponseElement} from "../../../common/frontend-api/GetUnitListPageResponse";
import {Loader, useLoader} from "../../../uilib/util/useLoader";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";

type Data = [GetUnitListPageResponseElement[], CourseDetailState];

function useData(courseId: number): Loader<Data> {
    const backend = useBackend();
    const stateStore = useStateStore();
    return useLoader(async (): Promise<Data> => {
        const contentResponse = await backend.getUnitListPage(courseId);
        const courseState = await stateStore.getCourseDetailState(courseId);
        return [contentResponse.units, courseState];
    });
}

export interface UnitListPageProps {
    courseId: number;
}

export function UnitListPage({courseId}: UnitListPageProps) {
    const navigate = useNavigate();
    const loader = useData(courseId);
    return <WithFooter footer={<Footer/>}>
        <h1>Units</h1>
        <FullWidthLoadingIndicator<Data> loader={loader}>
            {([units, courseState]) => <UnitList
                units={units}
                courseState={courseState}
                onClickUnit={(_unit, index) => navigate(`/courses/${courseId}/units/${index}`)}
            />}
        </FullWidthLoadingIndicator>
    </WithFooter>;
}
