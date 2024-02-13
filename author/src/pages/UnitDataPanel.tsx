import {Form} from "../Form/Form";
import {z} from "zod";
import {TextField} from "../Form/TextField";
import {GetBackendUnitResponse} from "../common/author-api/GetBackendUnitResponse";
import {FormCodeMirrorMarkdown} from "../Form/CodeMirror/FormCodeMirrorMarkdown";

const formSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    description: z.string(),
    exerciseUrl: z.string(),
    exerciseDefinition: z.string(),
    exerciseScript: z.string(),
}).strict();
type FormData = z.infer<typeof formSchema>;

export interface UnitDataPanelProps {
    unitId: number;
    dataResponse: GetBackendUnitResponse;
    onDataUpdatedInBackend: () => void;
}

export function UnitDataPanel(props: UnitDataPanelProps) {
    const defaultValues: FormData = {
        ...props.dataResponse,
        exerciseDefinition: JSON.stringify(props.dataResponse.exerciseDefinition, null, 4),
    };
    async function onSubmit(data: FormData) {
        // await updateBackendCourseHeaderData(props.courseId, {
        //     title: data.title,
        //     description: data.description,
        // });
        props.onDataUpdatedInBackend();
    }
    return <Form schema={formSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
        <TextField name="title" label="Title" muiTextFieldProps={{inputProps: {style: {fontFamily: "monospace"}}}} />
        <br /><br />
        <FormCodeMirrorMarkdown name="description" label="Description" />
        <TextField name="exerciseUrl" label="Override Exercise URL" muiTextFieldProps={{inputProps: {style: {fontFamily: "monospace"}}}} />
        <br /><br />
        <FormCodeMirrorMarkdown name="exerciseDefinition" label="Exercise Definition" />
        <br /><br />
        <FormCodeMirrorMarkdown name="exerciseScript" label="Exercise Script" />
    </Form>;
}
