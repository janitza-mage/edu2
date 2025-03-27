import {Problem} from "./Problem";
import {createProblem3001} from "./createProblem3001";
import {createProblem3002} from "./createProblem3002";

export function createProblem(): Problem {
    if (window.location.href.includes(":3001/")) {
        return createProblem3001();
    }
    if (window.location.href.includes(":3002/")) {
        return createProblem3002();
    }
    return _props => <div>incorrect port</div>;
}
