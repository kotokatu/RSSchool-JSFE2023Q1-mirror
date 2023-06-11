import './select.css';

export default class Select {
    public draw(optionsList: Record<string, string>, selectElement: HTMLSelectElement): void {
        const optionsArray: readonly [string, string][] = Object.entries(optionsList);
        optionsArray.forEach((optionItem: [string, string]) => this.addOptions(optionItem, selectElement));
    }

    private addOptions(optionItem: [string, string], selectElement: HTMLSelectElement): void {
        const option: HTMLOptionElement = document.createElement('option');
        option.innerText = optionItem[0];
        option.value = optionItem[1];
        selectElement.append(option);
    }
}
