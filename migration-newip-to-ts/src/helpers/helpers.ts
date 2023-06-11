export function handleElement<T extends HTMLElement>(
    selector: string,
    parentElement: DocumentFragment | Document,
    changeElementHandler: (elem: T) => void
): void {
    const elem: T | null = parentElement.querySelector(selector);
    if (elem) {
        changeElementHandler(elem);
    }
}
