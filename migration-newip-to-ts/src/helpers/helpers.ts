export function getSafeElement<T extends HTMLElement>(selector: string): T {
    const elem = document.querySelector<T>(selector);
    if (!elem) {
        throw new Error('Element not found');
    }
    return elem;
}
