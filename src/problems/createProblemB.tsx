import {createProblemShuffler, ProblemFactory} from "./createProblemShuffler";
import {createImmediateFeedbackChoiceProblemShuffled} from "../components/Choice/createImmediateFeedbackChoiceProblem";
import {mathSpan} from "../components/Math/Math";

const problemFactories: ProblemFactory[] = [];

for (let x of [2, 5]) {
    for (let y of [3, 4]) {
        problemFactories.push(feedback => {
            const problem = createImmediateFeedbackChoiceProblemShuffled(
                mathSpan(x + " #cdot " + y),
                x * y,
                [x * y - 1, x * y + 1],
                { onSelect: feedback }
            );
            return {
                name: x + " * " + y,
                problem,
            };
        });
    }
}

export const createProblemB = createProblemShuffler(problemFactories);
