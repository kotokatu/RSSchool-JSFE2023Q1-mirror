import './sources.css';
import { SourceItem } from '../../../types/types';
import { getSafeElement } from '../../../helpers/helpers';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getSafeElement<HTMLTemplateElement>('#sourceItemTemp', document);

        data.forEach((item: SourceItem) => {
            if (sourceItemTemp instanceof HTMLTemplateElement) {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (!(sourceClone instanceof DocumentFragment)) {
                    throw new Error();
                }
                getSafeElement<HTMLSpanElement>('.source__item-name', sourceClone).textContent = item.name;
                getSafeElement<HTMLDivElement>('.source__item', sourceClone).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });
        const sourcesElement: HTMLDivElement = getSafeElement<HTMLDivElement>('.sources', document);
        sourcesElement.replaceChildren();
        sourcesElement.append(fragment);
    }
}

export default Sources;
