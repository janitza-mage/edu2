import {AppFrame} from "./AppFrame";
import {MainPage} from "../../pages/MainPage";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {ImagePage} from "../../pages/ImagePage";

function ImagePageWrapper() {
    const {courseId} = useParams();
    return <ImagePage courseId={parseInt(courseId!, 10)} />;
}

export function App() {
    return <BrowserRouter basename="/">
        <AppFrame>
            <Routes>
                <Route path={"/images/:courseId"} element={<ImagePageWrapper />} />;
                <Route path={"/"} element={<MainPage />} />;
            </Routes>
        </AppFrame>
    </BrowserRouter>;
}
