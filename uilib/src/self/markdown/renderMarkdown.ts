import {compile, parse, postprocess, preprocess} from "micromark";
import {math, mathHtml} from "micromark-extension-math";
import {commonSystemConfiguration} from "../../common/commonSystemConfiguration";

export interface MarkdownRenderConfiguration {
    courseIdForImages: number | null;
}

/*
This is how an image looks in Micromark events (indices are relative to the image start):

0:"enter:image"
    1:"enter:label"
        2:"enter:labelImageMarker"
        3:"exit:labelImageMarker"
        4:"enter:labelMarker"
        5:"exit:labelMarker"
        6:"enter:labelText"
            7:"enter:data"
            8:"exit:data"
        9:"exit:labelText"
        10:"enter:labelMarker"
        11:"exit:labelMarker"
    12:"exit:label"
    13:"enter:resource"
        14:"enter:resourceMarker"
        15:"exit:resourceMarker"
        16:"enter:resourceDestination"
            17:"enter:resourceDestinationRaw"
                18:"enter:resourceDestinationString"
                    19:"enter:data"
                    20:"exit:data"
                21:"exit:resourceDestinationString"
            22:"exit:resourceDestinationRaw"
        23:"exit:resourceDestination"
        24:"enter:resourceMarker"
        25:"exit:resourceMarker"
    26:"exit:resource"
27:"exit:image"

From the third element of each event, only sliceSerialize ever gets called in HTML compilation.
NOTE that sliceSerialize MUST be called from the same event it is acting on -- different parts of the document have
different underlying chunks used for serialization!

As tokens (still marked with event index):

0-27:"image"                        ![myAltText](https://upload.wikimedia.org/wikipedia/commons/a/a0/Diamond-dimd15a.jpg)
    1-12:"label"                    ![myAltText]
        2-3:"labelImageMarker"      !
        4-5:"labelMarker"           [
        6-9:"labelText"             myAltText
            7-8:"data"              myAltText
        10-11:"labelMarker"         ]
    13-26:"resource"                (https://upload.wikimedia.org/wikipedia/commons/a/a0/Diamond-dimd15a.jpg)
        14-15:"resourceMarker"      (
        16-23:"resourceDestination"                 https://upload.wikimedia.org/wikipedia/commons/a/a0/Diamond-dimd15a.jpg
            17-22:"resourceDestinationRaw"          https://upload.wikimedia.org/wikipedia/commons/a/a0/Diamond-dimd15a.jpg
                18-21:"resourceDestinationString"   https://upload.wikimedia.org/wikipedia/commons/a/a0/Diamond-dimd15a.jpg
                    19-20:"data"                    ![myAltText](https://upload.wikimedia.org/wikipedia/commons/a/a0/Diamond-dimd15a.jpg)
        24-25:"resourceMarker"      )

 */


export function renderMarkdown(markdownSource: string, configuration: MarkdownRenderConfiguration): string {
    const options = {
        allowDangerousHtml: true,
        extensions: [math()],
        htmlExtensions: [mathHtml()],
    };
    const events = postprocess(parse(options).document().write(preprocess()(markdownSource, undefined, true)));
    let insideImage = false, insideResourceDestination = false;
    if (configuration.courseIdForImages !== null) {
        for (const event of events) {
            const token = event[1];
            const tokenType = token.type;
            if (event[0] === "enter") {
                if (tokenType === "image") {
                    insideImage = true;
                }
                if (tokenType === "resourceDestination") {
                    insideResourceDestination = true;
                }
            }
            if (insideImage && insideResourceDestination) {
                let text = event[2].sliceSerialize(token);
                if (text.startsWith("course:")) {
                    text = text.substring(7);
                    const imageId = parseInt(text, 10);
                    if (!isNaN(imageId)) {
                        const replacement = commonSystemConfiguration.frontendBackendBaseUrl + "/getImage/" + configuration.courseIdForImages + "/" + imageId;
                        event[2] = {sliceSerialize: () => replacement} as any;
                    }
                }
            }
            if (event[0] === "exit") {
                if (tokenType === "image") {
                    insideImage = false;
                }
                if (tokenType === "resourceDestination") {
                    insideResourceDestination = false;
                }
            }
        }
    }
    return compile(options)(events);
}

export function renderMarkdownInline(markdownSource: string, configuration: MarkdownRenderConfiguration): string {
    let result = renderMarkdown(markdownSource, configuration).trim();
    if (result.startsWith("<p>") && result.endsWith("</p>")) {
        result = result.slice(3, -4);
    }
    return result;
}
