import './select.css';

export default class Select {
    public draw(optionsConfig: Record<string, string>, selectElement: HTMLSelectElement): void {
        const optionsArray: readonly [string, string][] = Object.entries(optionsConfig);
        optionsArray.forEach((optionsItem: [string, string]) => this.addOptions(optionsItem, selectElement));
    }

    private addOptions(optionsItem: [string, string], selectElement: HTMLSelectElement): void {
        const option: HTMLOptionElement = document.createElement('option');
        option.innerText = optionsItem[0];
        option.value = optionsItem[1];
        selectElement.append(option);
    }
}
