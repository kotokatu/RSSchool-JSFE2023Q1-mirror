import { BaseComponent } from '../base-component';
import Car from './car/car';
import {
    GetCarApiResponse,
    CarParams,
    updateCar,
    deleteCar,
    startEngine,
    stopEngine,
    setDriveMode,
} from '../../utils/api-utils';
import Input from '../input/input';
import { Button } from '../button/button';
import { garageUpdateEvent } from '../car-generation-controls/car-generation-controls';
import CarAnimationControls from '../car-animation-controls/car-animation-controls';
import CarAnimation from '../animation/animation';
import './car-track.css';

export default class CarTrack extends BaseComponent {
    id: number;
    car: Car;
    animation: CarAnimation;
    nameInput!: Input;
    colorInput!: Input;
    startBtn!: Button;
    stopBtn!: Button;
    constructor(params: GetCarApiResponse) {
        super({ classNames: ['car-track-container'] });
        this.id = params.id;
        this.car = new Car(params.color);
        this.animation = new CarAnimation(this.car.getNode());
        this.render(params.name, params.color);
    }

    render(name: string, color: string) {
        const header = new BaseComponent({ parent: this, classNames: ['car-track-header'] });
        this.nameInput = new Input(header, { type: 'text' }, name);
        this.colorInput = new Input(header, { type: 'color' }, color);
        const updateCarBtn = new Button({
            classNames: ['button-save'],
            parent: header,
            content: 'save changes',
            onClick: () => this.updateCarView(),
        });
        const deleteCarBtn = new Button({
            classNames: ['button-remove'],
            parent: header,
            content: 'remove',
            onClick: () => this.removeCar(),
        });
        const track = new BaseComponent({ parent: this, classNames: ['car-track'] });
        const driveControls = new CarAnimationControls({
            parent: track,
            startButtonContent: 'A',
            stopButtonContent: 'B',
            onStart: async () => this.startCar(),
            onStop: () => this.stopCar(),
        });
        track.insertChild(this.car);
    }

    getCarParams(): CarParams {
        const name = this.nameInput.getValue();
        const color = this.colorInput.getValue();
        return { name, color };
    }

    async updateCarView() {
        await updateCar(this.id, this.getCarParams());
        this.node.dispatchEvent(garageUpdateEvent);
    }

    async removeCar() {
        await deleteCar(this.id);
        this.node.dispatchEvent(garageUpdateEvent);
    }

    async startCar() {
        const { velocity, distance } = await startEngine(this.id);
        const animationDuration = distance / velocity;
        this.animation.addAnimation(this.getTrackWidth(), animationDuration);
        await setDriveMode(this.id);
        this.animation.removeAnimation();
    }

    async stopCar() {
        this.animation.removeAnimation();
        this.car.resetPosition();
        await stopEngine(this.id);
    }

    private getTrackWidth() {
        return this.node.clientWidth;
    }
}
