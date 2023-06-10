export function getSafeElement<T extends HTMLElement>(selector: string, parentElement: DocumentFragment | Document): T {
    const elem = parentElement.querySelector<T>(selector);
    if (!elem) {
        throw new Error(selector);
    }
    return elem;
}
