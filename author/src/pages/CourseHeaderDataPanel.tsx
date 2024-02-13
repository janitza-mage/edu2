import {Form} from "../Form/Form";
import {z} from "zod";
import {updateBackendCourseHeaderData} from "../logic/backend/backend";
import {TextField} from "../Form/TextField";
import {FormCodeMirrorMarkdown} from "../Form/CodeMirror/FormCodeMirrorMarkdown";

const formSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    description: z.string(),
}).strict();
type FormData = z.infer<typeof formSchema>;

export interface CourseHeaderDataPanelProps {
    courseId: number;
    title: string;
    description: string;
    onDataUpdatedInBackend: () => void;
}

export function CourseHeaderDataPanel(props: CourseHeaderDataPanelProps) {
    const defaultValues: FormData = {
        title: props.title,
        description: props.description,
    };
    async function onSubmit(data: FormData) {
        await updateBackendCourseHeaderData(props.courseId, {
            title: data.title,
            description: data.description,
        });
        props.onDataUpdatedInBackend();
    }
    return <Form schema={formSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
        <TextField name="title" label="Title" muiTextFieldProps={{inputProps: {style: {fontFamily: "monospace"}}}} />
        <br /><br />
        <FormCodeMirrorMarkdown name="description" label="Description" />
    </Form>;
}
