import {Route, Routes, useParams} from "react-router-dom";
import {ActiveCoursesPage} from "../../pages/CourseSelection/ActiveCoursesPage";
import {AllCoursesPage} from "../../pages/CourseSelection/AllCoursesPage";
import {StartPage} from "../../pages/StartPage";
import {FinishedCoursesPage} from "../../pages/CourseSelection/FinishedCoursesPage";
import {UnitListPage} from "../../pages/Course/UnitListPage";
import {UnitPage} from "../../pages/Course/UnitPage/UnitPage";
import {CurrentUnitPageRedirect} from "../../pages/Course/CurrentUnitPageRedirect";
import {DebugPage} from "../../pages/DebugPage";
import {CourseInfoPage} from "../../pages/Course/CourseInfoPage";

function CourseInfoPageWrapper() {
    let {courseId} = useParams();
    return <CourseInfoPage key={courseId} courseId={parseInt(courseId!, 10)} />;
}

function UnitListPageWrapper() {
    let {courseId} = useParams();
    return <UnitListPage key={courseId} courseId={parseInt(courseId!, 10)} />;
}

function CurrentUnitPageRedirectWrapper() {
    const {courseId} = useParams();
    return <CurrentUnitPageRedirect key={courseId} courseId={parseInt(courseId!, 10)} />;
}

function UnitPageWrapper() {
    const {courseId, unitIndex} = useParams();
    return <UnitPage key={courseId + "/" + unitIndex} courseId={parseInt(courseId!, 10)} unitIndex={parseInt(unitIndex!, 10)} />;
}

export function AppRoutes() {
    return <Routes>
        <Route path={"/courses/:courseId/info"} element={<CourseInfoPageWrapper />} />;
        <Route path={"/courses/:courseId/units"} element={<UnitListPageWrapper />} />;
        <Route path={"/courses/:courseId/units/current"} element={<CurrentUnitPageRedirectWrapper />} />;
        <Route path={"/courses/:courseId/units/:unitIndex"} element={<UnitPageWrapper />} />;
        <Route path={"/courses/active"} element={<ActiveCoursesPage />} />;
        <Route path={"/courses/finished"} element={<FinishedCoursesPage />} />;
        <Route path={"/courses"} element={<AllCoursesPage />} />;
        <Route path={"/debug"} element={<DebugPage />} />;
        <Route path={"/"} element={<StartPage />} />;
    </Routes>;
}
