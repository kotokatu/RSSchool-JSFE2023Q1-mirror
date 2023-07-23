import { BaseComponent } from '../../../base-component';
import { ColorInput, DEFAULT_COLOR } from '../../../input/color-input/color-input';
import TextInput from '../../../input/text-input/text-input';
import InvalidInputMessage from '../../../input/invalid-input-message/invalid-input-message';
import { Button } from '../../../button/button';
import { CarViewParams } from '../../../../utils/api-utils';
import { emitter, UpdateEvent } from '../../../../utils/event-emitter';
import { generateCars, createRandomCarsParams } from '../../../../utils/cars-utils';
import './car-generation-controls.scss';
import Car from '../car/car';

export default class CarGenerationControls extends BaseComponent {
    private nameInput!: TextInput;

    private colorInput!: ColorInput;

    private invalidInputMessage!: InvalidInputMessage;

    private createCarBtn!: Button;

    private generateCarsBtn!: Button;

    private car!: Car;

    constructor() {
        super({ classNames: ['generate-cars-wrapper'] });
        this.render();
    }

    private render(): void {
        const createCarWrapper = new BaseComponent({
            parent: this,
            classNames: ['create-car-wrapper'],
        });
        const inputsWrapper = new BaseComponent({
            parent: createCarWrapper,
            classNames: ['create-car-inputs-wrapper'],
        });
        this.colorInput = new ColorInput({
            parent: inputsWrapper,
            onInput: () => this.changeCarIconColor(this.colorInput.getValue()),
        });
        this.colorInput.addId('car-color');
        this.nameInput = new TextInput({
            parent: inputsWrapper,
            attributes: {
                placeholder: 'Please enter a car name',
                required: '',
                pattern: '.*\\S.*',
            },
        });
        this.nameInput.addListener('animationend', () =>
            this.nameInput.removeCssClasses(['invalid'])
        );
        this.invalidInputMessage = new InvalidInputMessage(
            createCarWrapper,
            'Name should not be empty'
        );
        const buttonsWrapper = new BaseComponent({
            parent: createCarWrapper,
            classNames: ['create-car-buttons-wrapper'],
        });
        this.createCarBtn = new Button({
            classNames: ['create-car-button'],
            parent: buttonsWrapper,
            content: 'create car',
            onClick: async () => {
                await generateCars(this.getUserDefinedCarParams());
                emitter.emit(UpdateEvent.GarageUpdate);
            },
        });
        this.generateCarsBtn = new Button({
            classNames: ['generate-cars-button'],
            parent: buttonsWrapper,
            content: 'generate cars',
            onClick: async () => {
                await generateCars(createRandomCarsParams());
                emitter.emit(UpdateEvent.GarageUpdate);
            },
        });
        this.car = new Car(DEFAULT_COLOR);
        const label = new BaseComponent({ tag: 'label', parent: this });
        label.setAttributes({ for: 'car-color' });
        label.insertChild(this.car);
    }

    private getUserDefinedCarParams(): CarViewParams[] | null {
        if (this.nameInput.getNode().checkValidity()) {
            const name = this.nameInput.getValue();
            const color = this.colorInput.getValue();
            this.nameInput.clearInput();
            this.colorInput.clearInput();
            return [{ name, color }];
        }
        this.nameInput.setCssClasses(['invalid']);
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

    private changeCarIconColor(color: string) {
        this.car.setColor(color);
    }
}
