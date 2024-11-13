import {WithFooter} from "../../components/Footer/WithFooter";
import {Footer} from "./Footer";
import {useState} from "react";
import {Exercise, generatorMap} from "../../database/database";

export interface ExercisePageProps {
    generatorId: string;
}

export function ExercisePage({generatorId}: ExercisePageProps) {
    const generator = generatorMap.get(generatorId);
    if (!generator) {
        throw new Error("Generator not found");
    }
    
    const [score, setScore] = useState<number>(0);
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercise, setExercise] = useState<Exercise>(() => generator.body());
    
    function onFinish(success: boolean) {
        if (success) {
            setScore(score + 1);
        } else {
            setScore(score < 3 ? 0 : score - 3);
        }
        const newExerciseIndex = exerciseIndex + 1;
        setExerciseIndex(newExerciseIndex);
        setExercise(() => generator!.body());
    }
    
    const CurrentExercise = exercise;
    return <WithFooter footer={<Footer score={score} />}>
        <CurrentExercise key={exerciseIndex} onFinish={onFinish} />
    </WithFooter>;
}
