import {useBackend} from "../../logic/content/useBackend";
import {Footer} from "./Footer";
import {useStateStore} from "../../logic/state/useStateStore";
import {CourseDetailState} from "../../logic/state/StateStore";
import {useNavigate} from "react-router-dom";
import {WithFooter} from "../../components/Footer/WithFooter";
import {GetCourseInfoPageResponse} from "../../../common/frontend-api/GetCourseInfoPageResponse";
import {Alert, Button} from "@mui/material";
import {Loader, useLoader} from "../../../uilib/util/useLoader";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";
import {Markdown, MarkdownInline} from "../../../uilib/markdown/Markdown";

type Data = [GetCourseInfoPageResponse, CourseDetailState];

function useData(courseId: number): Loader<Data> {
    const backend = useBackend();
    const stateStore = useStateStore();
    return useLoader(async (): Promise<Data> => {
        const contentResponse = await backend.getCourseInfoPage(courseId);
        const courseState = await stateStore.getCourseDetailState(courseId);
        return [contentResponse, courseState];
    });
}

export interface CourseInfoPageProps {
    courseId: number;
}

export function CourseInfoPage({courseId}: CourseInfoPageProps) {
    const navigate = useNavigate();
    const loader = useData(courseId);
    return <WithFooter footer={<Footer/>}>
        <FullWidthLoadingIndicator<Data> loader={loader}>
            {([content, courseState]) => <>
                <h1><MarkdownInline renderConfiguration={{courseIdForImages: null, allowDangerousProtocol: false}}>{content.title}</MarkdownInline></h1>
                <Markdown renderConfiguration={{courseIdForImages: courseId, allowDangerousProtocol: false}}>{content.description}</Markdown>
                <div>
                    {courseState.completionStatus === "new" &&
                        <Button
                            variant={"contained"}
                            onClick={() => navigate(`/courses/${courseId}/units/0`)}
                        >Start this course</Button>
                    }
                    {courseState.completionStatus === "active" &&
                        <Button
                            variant={"contained"}
                            onClick={() => navigate(`/courses/${courseId}/units/current`)}
                        >Continue this course</Button>
                    }
                    {courseState.completionStatus === "completed" &&
                        <Alert severity={"success"}>You have completed this course.</Alert>
                    }
                </div>
            </>}
        </FullWidthLoadingIndicator>
    </WithFooter>;
}
