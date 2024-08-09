import {AppFrame} from "./AppFrame";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {ImagePage} from "../../pages/ImagePage";
import {OldMainPage} from "../../pages/OldMainPage";
import {CourseListPage} from "../../pages/new/CourseListPage";
import {CourseStartPage} from "../../pages/new/CourseStartPage";

function ImagePageWrapper() {
    const {courseId} = useParams();
    return <ImagePage courseId={parseInt(courseId!, 10)} />;
}

function CourseStartPageWrapper() {
    const {courseId} = useParams();
    return <CourseStartPage courseId={parseInt(courseId!, 10)} />;
}

export function App() {
    return <BrowserRouter basename="/">
        <AppFrame>
            <Routes>
                <Route path={"/images/:courseId"} element={<ImagePageWrapper />} />;
                <Route path={"/old"} element={<OldMainPage />} />;
                <Route path={"/courses/:courseId"} element={<CourseStartPageWrapper />} />;
                <Route path={"/"} element={<CourseListPage />} />;
            </Routes>
        </AppFrame>
    </BrowserRouter>;
}
