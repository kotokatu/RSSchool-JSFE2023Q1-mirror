import BaseComponent from '../../../base-component';
import { ColorInput, DEFAULT_COLOR } from '../../../input/color-input/color-input';
import TextInput from '../../../input/text-input/text-input';
import InvalidInputMessage from '../../../input/invalid-input-message/invalid-input-message';
import Button from '../../../button/button';
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
        super('div', ['generate-cars-wrapper']);
        this.render();
    }

    private render(): void {
        const createCarWrapper = new BaseComponent('div', ['create-car-wrapper'], this);
        const inputsWrapper = new BaseComponent(
            'div',
            ['create-car-inputs-wrapper'],
            createCarWrapper
        );
        this.colorInput = new ColorInput({
            parent: inputsWrapper,
            classNames: ['car-color-input'],
            onInput: () => this.changeCarIconColor(this.colorInput.getValue()),
        });
        this.colorInput.addId('car-color');
        this.nameInput = new TextInput({
            parent: inputsWrapper,
            classNames: ['car-name-input'],
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
        const buttonsWrapper = new BaseComponent(
            'div',
            ['create-car-buttons-wrapper'],
            createCarWrapper
        );
        this.createCarBtn = new Button(
            async () => {
                const carViewParams = this.getUserDefinedCarParams();
                if (carViewParams) {
                    await generateCars(carViewParams);
                    emitter.emit(UpdateEvent.GarageUpdate);
                }
            },
            buttonsWrapper,
            ['create-car-button'],
            'create car'
        );
        this.generateCarsBtn = new Button(
            async () => {
                const randomCarParams = createRandomCarsParams();
                await generateCars(randomCarParams);
                emitter.emit(UpdateEvent.GarageUpdate);
            },
            buttonsWrapper,
            ['generate-cars-button'],
            'generate cars'
        );
        const label = new BaseComponent('label', ['label-car-color'], this);
        label.setAttributes({ for: 'car-color' });
        this.car = new Car(DEFAULT_COLOR, label);
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
