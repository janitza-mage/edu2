import {CourseDetailState} from "../../../logic/state/StateStore";
import {Button} from "@mui/material";
import {useStateStore} from "../../../logic/state/useStateStore";
import {useNavigate} from "react-router-dom";
import {background} from "../../../common/util/background";

export interface FinishCoursePageProps {
    courseId: number;
    unitIndex: number;
    courseDetailState: CourseDetailState;
}

export function FinishCoursePage(props: FinishCoursePageProps) {
    const stateStore = useStateStore();
    const navigate = useNavigate();

    // course state
    if (props.courseDetailState.completionStatus === "completed") {
        return <>You have already finished this course.</>;
    }
    if (props.courseDetailState.completionStatus === "new" || props.courseDetailState.completedUnits < props.unitIndex) {
        return <>You must finish all units before you can finish this course.</>;
    }

    function onFinish() {
        background(async () => {
            await stateStore.completeCourse(props.courseId);
            navigate("/courses");
        });
    }
    return <>
        <h1>Congratulations!</h1>
        <div>You have completed all units and can now finsh this course.</div>
        <div>
            <Button onClick={onFinish}>Finish course!</Button>
        </div>
    </>;
}
