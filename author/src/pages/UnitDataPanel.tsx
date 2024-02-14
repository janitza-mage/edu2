import {Form, FormMethods} from "../Form/Form";
import {z} from "zod";
import {TextField} from "../Form/TextField";
import {GetBackendUnitResponse} from "../common/author-api/GetBackendUnitResponse";
import {FormCodeMirrorMarkdown} from "../Form/CodeMirror/FormCodeMirrorMarkdown";
import {FormCodeMirrorJson} from "../Form/CodeMirror/FormCodeMirrorJson";
import {FormCodeMirrorJavascript} from "../Form/CodeMirror/FormCodeMirrorJavascript";
import {updateBackendUnitData} from "../logic/backend/backend";
import {UseFormReturn} from "react-hook-form/dist/types";

const formSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    description: z.string(),
    exerciseUrl: z.string().nullable(),
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
    async function onSubmit(data: FormData, methods: FormMethods<FormData>) {
        try {
            JSON.parse(data.exerciseDefinition);
        } catch (error) {
            methods.setError("exerciseDefinition", {message: "Invalid JSON"});
            return;
        }
        await updateBackendUnitData(props.unitId, {
            title: data.title,
            description: data.description,
            exerciseUrl: data.exerciseUrl ?? "",
            exerciseDefinition: data.exerciseDefinition,
            exerciseScript: data.exerciseScript,
        });
        props.onDataUpdatedInBackend();
    }
    return <Form schema={formSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
        <TextField name="title" label="Title" muiTextFieldProps={{inputProps: {style: {fontFamily: "monospace"}}}} />
        <br /><br />
        <FormCodeMirrorMarkdown name="description" label="Description" />
        <TextField name="exerciseUrl" label="Override Exercise URL" muiTextFieldProps={{inputProps: {style: {fontFamily: "monospace"}}}} />
        <br /><br />
        <FormCodeMirrorJson name="exerciseDefinition" label="Exercise Definition" />
        <br /><br />
        <FormCodeMirrorJavascript name="exerciseScript" label="Exercise Script" />
    </Form>;
}
