import './sources.css';
import { SourceItem } from '../../../types/types';
import { getSafeElement } from '../../../helpers/helpers';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getSafeElement('#sourceItemTemp');

        data.forEach((item: SourceItem) => {
            if (sourceItemTemp instanceof HTMLTemplateElement) {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (!(sourceClone instanceof DocumentFragment)) {
                    throw new Error();
                }
                getSafeElement('.source__item-name').textContent = item.name;
                getSafeElement('.source__item').setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });
        const sourcesElement: HTMLDivElement = getSafeElement('.sources');
        sourcesElement.replaceChildren();
        sourcesElement.append(fragment);
    }
}

export default Sources;
