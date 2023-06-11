import './select.css';
import { SelectType } from '../../../types/types';

export default class Select {
    public draw(selectType: SelectType, selectElement: HTMLSelectElement): void {
        const optionsArray: readonly [string, string][] = Object.entries(selectType);
        optionsArray.forEach((optionType: [string, string]) => this.addOptions(optionType, selectElement));
    }

    private addOptions(optionType: [string, string], selectElement: HTMLSelectElement): void {
        const option: HTMLOptionElement = document.createElement('option');
        option.innerText = optionType[0];
        option.value = optionType[1];
        selectElement.append(option);
    }
}
