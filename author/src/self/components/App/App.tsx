import {AppFrame} from "./AppFrame";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {CourseListPage} from "../../pages/CourseListPage/CourseListPage";
import {CourseStartPage} from "../../pages/CourseStartPage/CourseStartPage";
import {CourseImagesPage} from "../../pages/CourseImagesPage/CourseImagesPage";
import {CourseHeaderPage} from "../../pages/CourseHeaderPage/CourseHeaderPage";
import {UnitPage} from "../../pages/UnitPage/UnitPage";

function CourseStartPageWrapper() {
    const {courseId} = useParams();
    return <CourseStartPage key={courseId} courseId={parseInt(courseId!, 10)} />;
}

function CourseHeaderPageWrapper() {
    const {courseId} = useParams();
    return <CourseHeaderPage key={courseId} courseId={parseInt(courseId!, 10)} />;
}

function CourseImagesPageWrapper() {
    const {courseId} = useParams();
    return <CourseImagesPage key={courseId} courseId={parseInt(courseId!, 10)} />;
}

function UnitPageWrapper() {
    const {courseId, unitId} = useParams();
    return <UnitPage key={courseId + "/" + unitId} courseId={parseInt(courseId!, 10)} unitId={parseInt(unitId!, 10)} />;
}

export function App() {
    return <BrowserRouter basename="/">
        <AppFrame>
            <Routes>
                <Route path={"/courses/:courseId"} element={<CourseStartPageWrapper />} />;
                <Route path={"/courses/:courseId/header"} element={<CourseHeaderPageWrapper />} />;
                <Route path={"/courses/:courseId/images"} element={<CourseImagesPageWrapper />} />;
                <Route path={"/courses/:courseId/:unitId"} element={<UnitPageWrapper />} />;
                <Route path={"/"} element={<CourseListPage />} />;
            </Routes>
        </AppFrame>
    </BrowserRouter>;
}
