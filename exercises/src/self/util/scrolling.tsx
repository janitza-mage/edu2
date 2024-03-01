export function scrollToTop(container: Element) {
    container.scrollTo({top: 0, left: 0, behavior: "smooth"});
}

export function scrollToBottom(container: Element) {
    container.scrollTo({top: container.scrollHeight, left: 0, behavior: "smooth"});
}

export function scrollToBottomDelayed(container: Element, delay = 10) {
    setTimeout(() => scrollToBottom(container), delay);
}

