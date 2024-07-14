import {Route, Routes, useParams} from "react-router-dom";
import {UnitPageContent} from "../ExerciseSheet/UnitPageContent";

function UnitPageContentWrapper() {
    let {courseId, unitIndex} = useParams();
    return <UnitPageContent key={courseId} courseId={parseInt(courseId!, 10)} unitIndex={parseInt(unitIndex!, 10)} />;
}

export function AppRoutes() {
    return <Routes>
        <Route path={"/:courseId/:unitIndex"} element={<UnitPageContentWrapper />} />;
    </Routes>;
}
