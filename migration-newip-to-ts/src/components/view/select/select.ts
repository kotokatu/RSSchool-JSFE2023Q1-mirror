import { Category } from "../../../types/types";

export default class Select {
  public draw(): void {
    const categories: readonly [string, Category][] = Object.entries(Category);
    const select: HTMLSelectElement = document.getElementById('category') as HTMLSelectElement;
    categories.forEach((category: readonly [string, Category]) => {
      const option: HTMLOptionElement = document.createElement('option');
      option.innerText = category[0];
      option.value = category[1];
      select.append(option);
    })
  }
}