import { BaseComponent } from '../base-component';
import Input from '../input/input';
import { Button } from '../button/button';
import { generateRandomCarName, generateRandomColor } from '../../utils/utils';
import { createCar, CarParams } from '../../utils/api-utils';

export default class CarGenerationControls extends BaseComponent {
    textInput = new Input({
        type: 'text',
        required: '',
        pattern: '.*\\S.*',
        placeholder: 'Please enter a car name',
    });
    colorInput = new Input({ type: 'color' });
    errorMessage = new BaseComponent({
        tag: 'p',
        classNames: ['input-error'],
        content: 'Please enter a valid name',
    });
    garageUpdateEvent = new CustomEvent('garage-update', { bubbles: true });
    constructor() {
        super({ classNames: ['add-car-wrapper'] });
        this.textInput.addListener('input', () => this.hideErrorMessage());
        this.createView();
    }

    private createView() {
        const createCarBtn = new Button({
            classNames: ['add-car-button'],
            parent: this,
            content: 'create car',
            onClick: () => this.addCarsToView(this.getUserDefinedCarParams()),
        });
        const generateCarsBtn = new Button({
            classNames: ['generate-cars-button'],
            parent: this,
            content: 'generate cars',
            onClick: () => this.addCarsToView(this.createRandomCarParams()),
        });
        this.insertChildren([
            this.textInput,
            this.colorInput,
            createCarBtn,
            this.errorMessage,
            generateCarsBtn,
        ]);
    }

    private async addCarsToView(carParamsData: CarParams[] | null): Promise<void> {
        if (carParamsData) {
            await Promise.all(
                carParamsData.map(async (carParams) => {
                    await createCar(carParams);
                })
            );
            this.node.dispatchEvent(this.garageUpdateEvent);
        }
    }

    private getUserDefinedCarParams(): CarParams[] | null {
        if (this.textInput.getNode().checkValidity()) {
            const name = this.textInput.getValue();
            const color = this.colorInput.getValue();
            this.textInput.clearInput();
            return [{ name, color }];
        }
        this.showErrorMessage();
        return null;
    }

    private createRandomCarParams(): CarParams[] {
        const carParamsArray: CarParams[] = [];
        let i = 0;
        while (i < 100) {
            const name = generateRandomCarName();
            const color = generateRandomColor();
            carParamsArray.push({ name, color });
            i += 1;
        }
        return carParamsArray;
    }

    private showErrorMessage() {
        this.errorMessage.setCssClasses(['visible']);
    }

    private hideErrorMessage() {
        this.errorMessage.removeClasses(['visible']);
    }
}
