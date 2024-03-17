import {useEffect, useRef} from "react";
import {Button} from "@mui/material";
import IconDangerous from '@mui/icons-material/Dangerous';
import IconCheck from '@mui/icons-material/Check';
import {MarkdownInline} from "../../../uilib/markdown/Markdown";

export interface TaggedAnswer {
    content: string;
    correct: boolean;
}

export interface ChooseOneHelperProps {
    authorId: number,
    courseId: number,
    answers: TaggedAnswer[];
    answered: boolean;
    reportResult: (correct: boolean) => void;
}

export function ChooseOneHelper(props: ChooseOneHelperProps) {

    const arrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        let width = 0, height = 0;
        for (const element of arrayRef.current) {
            if (element) {
                const rect = element.getBoundingClientRect();
                width = Math.max(width, rect.width);
                height = Math.max(height, rect.height);
            }
        }
        for (const element of arrayRef.current) {
            if (element) {
                element.style.display = "inline-block";
                element.style.width = `${width}px`;
                element.style.height = `${height}px`;
            }
        }
    });

    return <div>
        {props.answers.map((answer, index) =>
            <Button
                key={index}
                variant={"contained"}
                disabled={props.answered}
                onClick={() => props.reportResult(answer.correct)}
                sx={{marginRight: "10px", marginTop: "10px", display: "inline-block", textTransform: "none"}}
                ref={element => arrayRef.current[index] = element}
            >
                {props.answered && <div style={{color: "#888", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    {answer.correct ? <IconCheck /> : <IconDangerous />}
                </div>}
                <MarkdownInline renderConfiguration={{ courseIdForImages: props.courseId }}>
                    {answer.content}
                </MarkdownInline>
            </Button>
        )}
    </div>;
}
