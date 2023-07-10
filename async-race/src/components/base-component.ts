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
        } else if (parent instanceof HTMLElement) {
            parent.append(this.node);
        }

        if (classNames) {
            this.setClasses(classNames);
        }

        if (content) {
            this.setTextContent(content);
        }
    }

    public getNode(): T {
        return this.node;
    }

    public insertChild(child: BaseComponent) {
        if (child instanceof BaseComponent) {
            this.node.append(child.getNode());
        }
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

    public setAttr(attr: string, value: string): void {
        this.node.setAttribute(attr, value);
    }

    public removeAttr(attr: string): void {
        this.node.removeAttribute(attr);
    }

    public setClasses(classNames: string[]) {
        classNames.forEach((className: string) => this.node.classList.add(className));
    }

    public removeClasses(classNames: string[]) {
        classNames.forEach((className: string) => this.node.classList.remove(className));
    }

    public removeChildren() {
        this.node.replaceChildren();
    }

    public destroy(): void {
        this.node.remove();
    }

    public addListener(event: keyof HTMLElementEventMap, callback: (e: Event) => void): void {
        if (typeof callback === 'function') {
            this.node.addEventListener(event, callback);
        }
    }
}
