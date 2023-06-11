export function handleElement<T extends HTMLElement>(
    selector: string,
    parentElement: DocumentFragment | Document,
    changeElementHandler: (elem: T) => void
): void {
    const elem: T | null = parentElement.querySelector(selector);
    elem ? changeElementHandler(elem) : console.error(`Element ${selector} not found`);
}
