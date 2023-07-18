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
    deleteWinner,
} from '../../../../utils/api-utils';
import Input from '../../../input/input';
import { Button } from '../../../button/button';
import { garageUpdateEvent } from '../../../car-generation-controls/car-generation-controls';
import AnimationControls from '../animation-controls/animation-controls';
import CarAnimation from '../car-animation/car-animation';
import { formatTime } from '../../../../utils/utils';
import Modal from '../modal/modal';
import './car-track.css';

export type CarDriveData = { id: number; time: number };

export class CarTrack extends BaseComponent {
    car: Car;
    carId: number;
    carName: string;
    carColor: string;
    animation: CarAnimation;
    carAnimationControls!: AnimationControls;
    nameInput!: Input;
    colorInput!: Input;
    time!: number;
    modal!: Modal;
    constructor(params: GetCarApiResponse) {
        super({ classNames: ['car-track-container'] });
        this.car = new Car(params.color);
        this.carId = params.id;
        this.carName = params.name;
        this.carColor = params.color;
        this.animation = new CarAnimation(this.car);
        this.render();
    }

    render() {
        const header = new BaseComponent({ parent: this, classNames: ['car-track-header'] });
        this.nameInput = new Input(header, { type: 'text' }, this.carName);
        this.colorInput = new Input(header, { type: 'color' }, this.carColor);
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
        this.carAnimationControls = new AnimationControls({
            startButtonContent: 'A',
            stopButtonContent: 'B',
            onStart: () => this.startCar(),
            onStop: () => this.resetCar(),
        });
        track.insertChildren([this.carAnimationControls, this.car]);
    }

    getCarViewParams(): CarParams {
        const name = this.nameInput.getValue();
        const color = this.colorInput.getValue();
        return { name, color };
    }

    async updateCarView() {
        await updateCar(this.carId, this.getCarViewParams());
        this.node.dispatchEvent(garageUpdateEvent);
    }

    async removeCar() {
        await deleteCar(this.carId);
        await deleteWinner(this.carId);
        this.node.dispatchEvent(garageUpdateEvent);
    }

    public async calculateTime(isRaceMode?: boolean): Promise<void> {
        this.carAnimationControls.startBtn.disable();
        if (!isRaceMode) this.carAnimationControls.stopBtn.enable();
        const { velocity, distance } = await startEngine(this.carId);
        this.time = distance / velocity;
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

    public async animateCar(): Promise<CarDriveData> {
        this.animation.addAnimation(this.getTrackWidth(), this.time);
        return setDriveMode(this.carId)
            .then((): CarDriveData => ({ id: this.carId, time: Number(formatTime(this.time)) }))
            .finally(() => this.animation.removeAnimation());
    }

    public async resetCar(): Promise<void> {
        this.carAnimationControls.startBtn.enable();
        this.carAnimationControls.stopBtn.disable();
        this.animation.removeAnimation();
        this.car.resetPosition();
        if (this.modal) this.modal.destroy();
        await stopEngine(this.carId);
    }

    private getTrackWidth() {
        return this.node.clientWidth;
    }

    createModal() {
        this.modal = new Modal(this, this.carName, formatTime(this.time));
    }
}
