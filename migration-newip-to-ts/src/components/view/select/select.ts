import './select.css';
import { Category, Language } from '../../../types/types';

export default class Select {
    public draw(): void {
        const categories: readonly [string, Category][] = Object.entries(Category);
        const languages: readonly [string, Language][] = Object.entries(Language);
        const categorySelectElement: HTMLSelectElement = document.querySelector(
            '.category__select'
        ) as HTMLSelectElement;
        const languageSelectElement: HTMLSelectElement = document.querySelector(
            '.language__select'
        ) as HTMLSelectElement;
        categories.forEach((category: readonly [string, Category]) => this.addOptions(category, categorySelectElement));
        languages.forEach((language: readonly [string, Language]) => this.addOptions(language, languageSelectElement));
    }

    private addOptions(
        optionType: readonly [string, Category] | readonly [string, Language],
        selectElement: HTMLSelectElement
    ): void {
        const option: HTMLOptionElement = document.createElement('option');
        option.innerText = optionType[0];
        option.value = optionType[1];
        selectElement.append(option);
    }
}
