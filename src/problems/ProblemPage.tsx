import {useFeedbackControl} from "../components/effects/useFeedbackControl";
import {useState} from "react";
import {createProblem} from "./createProblem";

export function ProblemPage() {
    const feedbackControl = useFeedbackControl();
    const [problem, setProblem] = useState(() => createProblem());
    const [problemIndex, setProblemIndex] = useState(0);
    
    function onFinishProblem() {
        setProblem(() => createProblem());
        setProblemIndex(problemIndex + 1);
    }
    
    const ProblemComponent = problem;
    return <div style={{ backgroundColor: feedbackControl.color, position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}>
        <ProblemComponent onFinish={onFinishProblem} />
    </div>;
}
