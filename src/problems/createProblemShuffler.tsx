import {Problem} from "./Problem";
import {randomInt} from "../util/random/randomInt";

export interface ProblemFactoryResult {
    name: string,
    problem: Problem,
}
export type ProblemFactory = (feedback: (correct: boolean) => void) => ProblemFactoryResult;

export function createProblemShuffler(
    problemFactories: ProblemFactory[],
    positiveLimit: number = 3,
    negativeLimit: number = 3
): () => Problem {
    problemFactories = [...problemFactories];
    const problemNames: string[] = problemFactories.map(() => "(unnamed)");
    const positiveScore: number[] = problemFactories.map(() => 0);
    const negativeScore: number[] = problemFactories.map(() => 0);
    const remainingIndices: number[] = problemFactories.map((_element, index) => index);
    return () => {
        if (remainingIndices.length === 0) {
            return _props => <div>
                {problemFactories.map((_problem, index) => <div key={index}>
                    {problemNames[index]}: +{positiveScore[index]} / -{negativeScore[index]}
                </div>)}
            </div>;
        }
        const metaIndex = randomInt(remainingIndices.length);
        const index = remainingIndices[metaIndex];
        const problemFactory = problemFactories[index];
        let firstFeedback = true;
        function feedback(correct: boolean) {
            if (firstFeedback) {
                firstFeedback = false;
                let remove: boolean;
                if (correct) {
                    positiveScore[index]++;
                    remove = positiveScore[index] >= positiveLimit;
                } else {
                    negativeScore[index]++;
                    remove = negativeScore[index] >= negativeLimit;
                }
                if (remove) {
                    remainingIndices[metaIndex] = remainingIndices[remainingIndices.length - 1];
                    remainingIndices.pop();
                }
            }
        }
        const factoryResult = problemFactory(feedback);
        problemNames[index] = factoryResult.name;
        return factoryResult.problem;
    };
}
