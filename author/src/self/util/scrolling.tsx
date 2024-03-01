export function scrollToTop(container: Element) {
    container.scrollTo(0, 0);
}

export function scrollToBottom(container: Element) {
    container.scrollTo(0, container.scrollHeight);
}

export function scrollToBottomDelayed(container: Element, delay = 10) {
    setTimeout(() => scrollToBottom(container), delay);
}

