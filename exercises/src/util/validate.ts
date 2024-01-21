import {getErrorMessage} from "../common/util/getErrorMessage";
import {SchemaWithOutput} from "../common/util/zod/SchemaWithOutput";

export function validate<T>(schema: SchemaWithOutput<T>, data: unknown, description: string): T {
    try {
        return schema.parse(data);
    } catch (error) {
        console.error("invalid " + description, error, data);
        throw new Error("invalid " + description + ": " + getErrorMessage(error));
    }
}
