import {Route, Routes, useParams} from "react-router-dom";
import {GeneratorListPage} from "../../pages/list/GeneratorListPage";
import {ExercisePage} from "../../pages/exercise/ExercisePage";

function ExercisePageWrapper() {
    let {generatorId} = useParams();
    return <ExercisePage key={generatorId} generatorId={generatorId!} />;
}

export function AppRoutes() {
    return <Routes>
        <Route path={"/:generatorId"} element={<ExercisePageWrapper />} />;
        <Route path={"/"} element={<GeneratorListPage />} />;
    </Routes>;
}
