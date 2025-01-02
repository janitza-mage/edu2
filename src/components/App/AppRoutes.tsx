import {Route, Routes, useParams} from "react-router-dom";
import {ContentPathPage} from "../../pages/content/ContentPathPage";

function ContentPathPageWrapper() {
    const { "*": splat } = useParams();
    const contentPath = (!splat || splat === "") ? [] : splat.split("/");
    return <ContentPathPage key={splat} contentPath={contentPath} />;
}

export function AppRoutes() {
    return <Routes>
        <Route path={"*"} element={<ContentPathPageWrapper />} />;
    </Routes>;
}
