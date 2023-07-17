import { BaseComponent } from '../../../base-component';
import Car from '../car/car';
import {
    GetCarApiResponse,
    CarParams,
    updateCar,
    deleteCar,
    startEngine,
    stopEngine,
    setDriveMode,
} from '../../../../utils/api-utils';
import Input from '../../../input/input';
import { Button } from '../../../button/button';
import { garageUpdateEvent } from '../../../car-generation-controls/car-generation-controls';
import AnimationControls from '../animation-controls/animation-controls';
import CarAnimation from '../car-animation/car-animation';
import './car-track.css';

export default class CarTrack extends BaseComponent {
    id: number;
    car: Car;
    animation: CarAnimation;
    nameInput!: Input;
    colorInput!: Input;
    startBtn!: Button;
    stopBtn!: Button;
    time!: number;
    constructor(params: GetCarApiResponse) {
        super({ classNames: ['car-track-container'] });
        this.id = params.id;
        this.car = new Car(params.color);
        this.animation = new CarAnimation(this.car);
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
        const driveControls = new AnimationControls({
            startButtonContent: 'A',
            stopButtonContent: 'B',
            onStart: () => this.startCar(),
            onStop: () => this.stopCar(),
        });
        this.startBtn = driveControls.startBtn;
        this.stopBtn = driveControls.stopBtn;
        track.insertChildren([driveControls, this.car]);
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

    public async calculateTime(): Promise<void> {
        this.time = 0;
        const { velocity, distance } = await startEngine(this.id);
        this.time = distance / velocity;
    }

    public async animateCar(): Promise<number[]> {
        this.animation.addAnimation(this.getTrackWidth(), this.time);
        return setDriveMode(this.id)
            .then(() => [this.id, this.time])
            .finally(() => this.animation.removeAnimation());
    }

    public startCar(): void {
        this.calculateTime()
            .then(() => this.animateCar())
            .catch((err: Error) => {
                if (err.name === 'AbortError') {
                    console.log('User aborted request.');
                } else {
                    console.log(err);
                }
            });
    }

    public async stopCar() {
        this.animation.removeAnimation();
        this.car.resetPosition();
        await stopEngine(this.id);
    }

    private getTrackWidth() {
        return this.node.clientWidth;
    }
}
