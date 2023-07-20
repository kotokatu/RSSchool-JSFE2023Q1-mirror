export interface ComponentParams {
    tag?: keyof HTMLElementTagNameMap;
    parent?: BaseComponent | HTMLElement;
    classNames?: string[];
    content?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
    protected node: T;

    constructor({ tag = 'div', parent, classNames, content }: ComponentParams = {}) {
        this.node = document.createElement(tag) as T;

        if (parent instanceof BaseComponent) {
            parent.getNode().append(this.node);
        }

        if (parent instanceof HTMLElement) {
            parent.append(this.node);
        }

        if (classNames) {
            this.setCssClasses(classNames);
        }

        if (content) {
            this.setTextContent(content);
        }
    }

    public getNode(): T {
        return this.node;
    }

    public insertChild(child: BaseComponent | Element) {
        if (child instanceof BaseComponent) {
            this.node.append(child.getNode());
        } else {
            this.node.append(child);
        }
    }

    public prependChild(child: BaseComponent) {
        if (child instanceof BaseComponent) {
            this.node.prepend(child.getNode());
        }
    }

    public prependChildren(children: BaseComponent[]) {
        children.forEach((child: BaseComponent) => this.prependChild(child));
    }

    public insertChildren(children: BaseComponent[]) {
        children.forEach((child: BaseComponent) => this.insertChild(child));
    }

    public setHtmlContent(markup: string): void {
        this.node.innerHTML = markup;
    }

    public setTextContent(text: string): void {
        this.node.textContent = text;
    }

    public setAttributes(attributes: Record<string, string>): void {
        Object.entries(attributes).forEach(([attr, value]) => this.node.setAttribute(attr, value));
    }

    public removeAttr(attr: string): void {
        this.node.removeAttribute(attr);
    }

    public setCssClasses(classNames: string[]) {
        classNames.forEach((className: string) => this.node.classList.add(className));
    }

    public removeCssClasses(classNames: string[]) {
        classNames.forEach((className: string) => this.node.classList.remove(className));
    }

    public clearNode() {
        this.node.replaceChildren();
    }

    public destroy(): void {
        this.node.remove();
    }

    public addListener(
        event: keyof HTMLElementEventMap | string,
        callback: (e: Event) => void
    ): void {
        if (typeof callback === 'function') {
            this.node.addEventListener(event, callback);
        }
    }

    public disable() {
        this.setAttributes({ disabled: '' });
    }

    public enable() {
        this.removeAttr('disabled');
    }
}
