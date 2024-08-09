import {
    deleteImage,
    getBackendCourseAndUnits,
    getImagePage,
    updateImage,
    uploadImage
} from "../../logic/backend/backend";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {CourseSidebarHelper} from "./CourseSidebar";
import {commonSystemConfiguration} from "../../../common/commonSystemConfiguration";
import {base64Encode} from "../../util/base64Encode";
import {background} from "../../../common/util/background";
import {Button, Grid, IconButton} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";

interface CourseImagesPageProps {
    courseId: number;
}

export function CourseImagesPage(props: CourseImagesPageProps) {
    const courseAndUnitsLoader = useLoader(() => getBackendCourseAndUnits(props.courseId));
    const imageLoader = useLoader(async () => getImagePage(props.courseId));
    const imageBaseUrl = commonSystemConfiguration.frontendBackendBaseUrl + "/getImage/" + props.courseId + "/";

    function onImageUpload(event: any) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
            const data = new Uint8Array(fileReader.result as ArrayBuffer);
            const dataBase64 = await base64Encode(data);
            await uploadImage(props.courseId, { contentType: file.type, dataBase64 });
            imageLoader.reload(async () => getImagePage(props.courseId));
        }
        fileReader.readAsArrayBuffer(file);
    }

    function makeOnReplaceImage(id: number) {
        return (event: any) => {
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            const fileReader = new FileReader();
            fileReader.onloadend = async () => {
                const data = new Uint8Array(fileReader.result as ArrayBuffer);
                const dataBase64 = await base64Encode(data);
                await updateImage(id, { contentType: file.type, dataBase64 });
                imageLoader.reload(async () => getImagePage(props.courseId));
            }
            fileReader.readAsArrayBuffer(file);
        }
    }

    function onDeleteImage(id: number) {
        background(async () => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("really delete image?")) {
                await deleteImage(id);
                imageLoader.reload(async () => getImagePage(props.courseId));
            }
        });
    }

    return <CourseSidebarHelper courseId={props.courseId} loader={courseAndUnitsLoader} subpageSelector={null}>
        <FullWidthLoadingIndicator loader={imageLoader}>
            {loaderResult => <>
                <h1>Images for {loaderResult.courseName}</h1>
                <Grid container spacing={2}>
                    {loaderResult.imageIds.map(id => <>
                        <Grid item xs={6} sx={{borderBottom: "1px solid #aaa"}}>
                            <img key={id} src={imageBaseUrl + id} alt={"image with ID " + id} />
                        </Grid>
                        <Grid item xs={6} sx={{borderBottom: "1px solid #aaa"}}>
                            <div>ID: {id}</div>
                            <div>
                                usage: <span style={{fontFamily: "monospace"}}>![image](course:{id})</span>
                                <IconButton aria-label="copy" onClick={() => navigator.clipboard.writeText(`![image](course:${id})`)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </div>
                            <br />
                            <br />
                            <div>
                                <Button component="label" variant="text" startIcon={<CloudUploadIcon />}>
                                    Replace
                                    <input type="file" hidden onChange={makeOnReplaceImage(id)} />
                                </Button>
                            </div>
                            <div>
                                <Button variant={"text"} startIcon={<DeleteIcon />} onClick={() => onDeleteImage(id)}>Delete</Button>
                            </div>
                        </Grid>
                    </>)}
                </Grid>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload image
                    <input type="file" hidden onChange={onImageUpload} />
                </Button>
            </>}
        </FullWidthLoadingIndicator>
    </CourseSidebarHelper>;
}
