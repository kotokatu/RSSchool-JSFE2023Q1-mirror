import './sources.css';
import { SourceItem } from '../../../types/types';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: SourceItem) => {
            if (sourceItemTemp instanceof HTMLTemplateElement) {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (!(sourceClone instanceof DocumentFragment)) {
                    throw new Error();
                }
                (sourceClone.querySelector('.source__item-name') as HTMLDivElement).textContent = item.name;
                (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });
        const sourcesElement: HTMLDivElement = document.querySelector('.sources') as HTMLDivElement;
        sourcesElement.replaceChildren();
        sourcesElement.append(fragment);
    }
}

export default Sources;
