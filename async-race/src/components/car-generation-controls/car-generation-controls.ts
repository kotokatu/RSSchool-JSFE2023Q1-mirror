import { BaseComponent } from '../base-component';
import Input from '../input/input';
import ErrorMessage from './invalid-input-message/invalid-input-message';
import { Button } from '../button/button';
import { generateRandomCarName, generateRandomColor } from '../../utils/utils';
import { createCar, CarParams } from '../../utils/api-utils';

export const garageUpdateEvent = new CustomEvent('garage-update', { bubbles: true });

export default class CarGenerationControls extends BaseComponent {
    nameInput!: Input;
    colorInput!: Input;
    invalidInputMessage!: ErrorMessage;

    constructor() {
        super({ classNames: ['add-car-wrapper'] });
        this.render();
    }

    private render() {
        this.colorInput = new Input(this, { type: 'color' });
        this.nameInput = new Input(this, {
            type: 'text',
            placeholder: 'Please enter a car name',
            required: 'true',
            pattern: '.*\\S.*',
        });
        this.nameInput.addListener('input', () => this.invalidInputMessage.hide());
        const createCarBtn = new Button({
            classNames: ['add-car-button'],
            parent: this,
            content: 'create car',
            onClick: () => this.addCars(this.getUserDefinedCarParams()),
        });
        this.invalidInputMessage = new ErrorMessage('Please enter a valid name');
        const generateCarsBtn = new Button({
            classNames: ['generate-cars-button'],
            parent: this,
            content: 'generate cars',
            onClick: () => this.addCars(this.createRandomCarParams()),
        });
    }

    private async addCars(carParamsData: CarParams[] | null): Promise<void> {
        if (carParamsData) {
            await Promise.allSettled(carParamsData.map((carParams) => createCar(carParams)));
            this.node.dispatchEvent(garageUpdateEvent);
        }
    }

    private getUserDefinedCarParams(): CarParams[] | null {
        if (this.nameInput.getNode().checkValidity()) {
            const name = this.nameInput.getValue();
            const color = this.colorInput.getValue();
            this.nameInput.clearInput();
            return [{ name, color }];
        }
        this.invalidInputMessage.show();
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
}
