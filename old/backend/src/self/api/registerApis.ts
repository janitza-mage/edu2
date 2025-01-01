import * as core from "express-serve-static-core";
import {registerFrontendApis} from "./frontend/registerFrontendApis";
import {registerAuthorApis} from "./author/registerAuthorApis";

export function registerApis(expressApp: core.Express) {
    registerFrontendApis(expressApp);
    registerAuthorApis(expressApp);
}
