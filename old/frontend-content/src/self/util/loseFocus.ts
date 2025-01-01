export function loseFocus() {
    if (document.activeElement) {
        // document.activeElement may be something strange instead of an element, so catch errors
        try {
            (document.activeElement as any).blur();
        } catch (_ignored) {
        }
    }
}
