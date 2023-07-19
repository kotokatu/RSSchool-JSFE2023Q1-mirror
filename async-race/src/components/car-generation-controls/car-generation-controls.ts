import { BaseComponent } from '../base-component';
import Input from '../input/input';
import InvaliInputMessage from './invalid-input-message/invalid-input-message';
import { Button } from '../button/button';
import { generateRandomCarName, generateRandomColor } from '../../utils/utils';
import { createCar, CarParams } from '../../utils/api-utils';
import { emitter, UpdateEvent } from '../../utils/event-emitter';

export default class CarGenerationControls extends BaseComponent {
    nameInput!: Input;
    colorInput!: Input;
    invalidInputMessage!: InvaliInputMessage;
    createCarBtn!: Button;
    generateCarsBtn!: Button;
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
        this.createCarBtn = new Button({
            classNames: ['add-car-button'],
            parent: this,
            content: 'create car',
            onClick: () => this.generateCars(this.getUserDefinedCarParams()),
        });
        this.invalidInputMessage = new InvaliInputMessage(this, 'Please enter a valid name');
        this.generateCarsBtn = new Button({
            classNames: ['generate-cars-button'],
            parent: this,
            content: 'generate cars',
            onClick: () => this.generateCars(this.createRandomCarParams()),
        });
    }

    private async generateCars(carParamsData: CarParams[] | null): Promise<void> {
        if (carParamsData) {
            await Promise.allSettled(carParamsData.map((carParams) => createCar(carParams)));
            emitter.emit(UpdateEvent.GarageUpdate);
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

    disableControls() {
        this.createCarBtn.disable();
        this.generateCarsBtn.disable();
        this.nameInput.disable();
        this.colorInput.disable();
    }

    enableControls() {
        this.createCarBtn.enable();
        this.generateCarsBtn.enable();
        this.nameInput.enable();
        this.colorInput.enable();
    }
}
