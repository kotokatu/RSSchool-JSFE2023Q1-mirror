import './sources.css';
import { SourceItem } from '../../../types/types';
import { handleElement } from '../../../helpers/helpers';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>(
            '#sourceItemTemp'
        );

        data.forEach((item: SourceItem) => {
            if (sourceItemTemp instanceof HTMLTemplateElement) {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

                if (sourceClone instanceof DocumentFragment) {
                    handleElement<HTMLSpanElement>(
                        '.source__item-name',
                        sourceClone,
                        (elem) => (elem.textContent = item.name)
                    );
                    handleElement<HTMLDivElement>('.source__item', sourceClone, (elem) =>
                        elem.setAttribute('data-source-id', item.id)
                    );
                    fragment.append(sourceClone);
                }
            }
        });
        handleElement<HTMLDivElement>('.sources', document, (elem) => {
            elem.replaceChildren();
            elem.append(fragment);
        });
    }
}

export default Sources;
