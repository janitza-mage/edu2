export async function base64Encode(data: Uint8Array): Promise<string> {
    const base64Url = await new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(new Blob([data]));
    });
    return base64Url.slice(base64Url.indexOf(',') + 1);
}
