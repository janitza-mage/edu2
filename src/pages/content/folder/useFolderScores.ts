import {useLoader} from "../../../components/util/useLoader";
import {FolderScoreView, getFolderScoreView} from "../../../state/state";

const fallbackView: FolderScoreView = {
    getChildScore(_id: string): number | null {
        return null;
    }
};

export function useFolderScores(path: string[]): FolderScoreView {
    const loader = useLoader(async () => getFolderScoreView(path));
    return loader.status === "success" ? loader.result : fallbackView;
}
