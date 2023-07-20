import { BaseComponent } from '../../../base-component';
import ColorInput from '../../../input/color-input/color-input';
import TextInput from '../../../input/text-input/text-input';
import InvalidInputMessage from '../../../input/invalid-input-message/invalid-input-message';
import { Button } from '../../../button/button';
import { CarViewParams } from '../../../../utils/api-utils';
import { emitter, UpdateEvent } from '../../../../utils/event-emitter';
import { generateCars, createRandomCarsParams } from '../../../../utils/cars-utils';

export default class CarGenerationControls extends BaseComponent {
    private nameInput!: TextInput;

    private colorInput!: ColorInput;

    private invalidInputMessage!: InvalidInputMessage;

    private createCarBtn!: Button;

    private generateCarsBtn!: Button;

    constructor() {
        super({ classNames: ['add-car-wrapper'] });
        this.render();
    }

    private render(): void {
        this.colorInput = new ColorInput(this);
        this.nameInput = new TextInput(this, {
            placeholder: 'Please enter a car name',
            required: '',
            pattern: '.*\\S.*',
        });
        this.nameInput.addListener('input', () => this.invalidInputMessage.hide());
        this.createCarBtn = new Button({
            classNames: ['add-car-button'],
            parent: this,
            content: 'create car',
            onClick: async () => {
                await generateCars(this.getUserDefinedCarParams());
                emitter.emit(UpdateEvent.GarageUpdate);
            },
        });
        this.invalidInputMessage = new InvalidInputMessage(this, 'Please enter a valid name');
        this.generateCarsBtn = new Button({
            classNames: ['generate-cars-button'],
            parent: this,
            content: 'generate cars',
            onClick: async () => {
                await generateCars(createRandomCarsParams());
                emitter.emit(UpdateEvent.GarageUpdate);
            },
        });
    }

    private getUserDefinedCarParams(): CarViewParams[] | null {
        if (this.nameInput.getNode().checkValidity()) {
            const name = this.nameInput.getValue();
            const color = this.colorInput.getValue();
            this.nameInput.clearInput();
            this.colorInput.clearInput();
            return [{ name, color }];
        }
        this.invalidInputMessage.show();
        return null;
    }

    public disableControls(): void {
        this.createCarBtn.disable();
        this.generateCarsBtn.disable();
        this.nameInput.disable();
        this.colorInput.disable();
    }

    public enableControls(): void {
        this.createCarBtn.enable();
        this.generateCarsBtn.enable();
        this.nameInput.enable();
        this.colorInput.enable();
    }
}
