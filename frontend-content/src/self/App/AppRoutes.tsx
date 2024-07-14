import {Route, Routes, useParams} from "react-router-dom";
import {ExerciseSheet} from "../ExerciseSheet/ExerciseSheet";

function ExerciseSheetWrapper() {
    let {courseId, unitIndex} = useParams();
    return <ExerciseSheet key={courseId} courseId={parseInt(courseId!, 10)} unitIndex={parseInt(unitIndex!, 10)} />;
}

export function AppRoutes() {
    return <Routes>
        <Route path={"/:courseId/:unitIndex"} element={<ExerciseSheetWrapper />} />;
    </Routes>;
}
