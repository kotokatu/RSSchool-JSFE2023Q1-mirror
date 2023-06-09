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
        categories.forEach((category: readonly [string, Category]) => {
            const option: HTMLOptionElement = document.createElement('option');
            option.innerText = category[0];
            option.value = category[1];
            categorySelectElement.append(option);
        });
        languages.forEach((language: readonly [string, Language]) => {
            const option: HTMLOptionElement = document.createElement('option');
            option.innerText = language[0];
            option.value = language[1];
            languageSelectElement.append(option);
        });
    }
}
