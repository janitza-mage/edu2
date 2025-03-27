import {ProblemPage} from "../problems/ProblemPage";
import styles from "./App.module.scss";

export function App() {
    return <div className={styles.AppFrame}>
        <ProblemPage />
    </div>;
}
