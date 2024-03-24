import {useLoader} from "../../uilib/util/useLoader";
import {deleteImage, getImagePage, uploadImage} from "../logic/backend/backend";
import {commonSystemConfiguration} from "../../common/commonSystemConfiguration";
import {Button, Grid, IconButton} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {background} from "../../common/util/background";

export interface ImagePageProps {
    courseId: number;
}

async function base64Encode(data: Uint8Array): Promise<string> {
    const base64Url = await new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(new Blob([data]));
    });
    return base64Url.slice(base64Url.indexOf(',') + 1);
}

export function ImagePage(props: ImagePageProps) {
    const loader = useLoader(async () => getImagePage(props.courseId));
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
            loader.reload(async () => getImagePage(props.courseId));
        }
        fileReader.readAsArrayBuffer(file);
    }

    function onDeleteImage(id: number) {
        background(async () => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("really delete image?")) {
                await deleteImage(id);
                loader.reload(async () => getImagePage(props.courseId));
            }
        });
    }

    return <>
        {loader.status === "success" && <>
            <h1>Images for {loader.result.courseName}</h1>
            <Grid container spacing={2}>
                {loader.result.imageIds.map(id => <>
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
                        <div><Button variant={"text"} onClick={() => onDeleteImage(id)}>Delete</Button></div>
                    </Grid>
                </>)}
            </Grid>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload image
                <input type="file" hidden onChange={onImageUpload} />
            </Button>
        </>}
    </>;
}
