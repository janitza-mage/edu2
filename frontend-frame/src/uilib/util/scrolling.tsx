export function scrollToTop(container: Element) {
    scrollTo(container, 0);
}

export function scrollToBottom(container: Element) {
    scrollTo(container, container.scrollHeight);
}

export function scrollTo(container: Element, position: number) {
    container.scrollTo({top: position, left: 0, behavior: "smooth"});
}

export function scrollToTopDelayed(container: Element, delay = 10) {
    setTimeout(() => scrollToTop(container), delay);
}

export function scrollToBottomDelayed(container: Element, delay = 10) {
    setTimeout(() => scrollToBottom(container), delay);
}

export function scrollToDelayed(container: Element, position: number, delay = 10) {
    setTimeout(() => scrollTo(container, position), delay);
}

