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
import { garageUpdateEvent, raceStartEvent } from '../../../../events';
import AnimationControls from '../animation-controls/animation-controls';
import CarAnimation from '../car-animation/car-animation';
import { formatTime } from '../../../../utils/utils';
import Modal from '../modal/modal';
import './car-track.css';

export type CarRaceData = { id: number; time: number };

export class CarTrack extends BaseComponent {
    car: Car;
    carId: number;
    carName: string;
    carColor: string;
    animation: CarAnimation;
    isCarStarted = false;
    carAnimationControls!: AnimationControls;
    nameInput!: Input;
    colorInput!: Input;
    time!: number;
    modal!: Modal;
    updateCarBtn!: Button;
    deleteCarBtn!: Button;
    constructor(params: GetCarApiResponse) {
        super({ classNames: ['car-track-container'] });
        this.car = new Car(params.color);
        this.carId = params.id;
        this.carName = params.name;
        this.carColor = params.color;
        this.animation = new CarAnimation(this.car);
        this.render();
    }

    private render() {
        const header = new BaseComponent({ parent: this, classNames: ['car-track-header'] });
        this.nameInput = new Input(header, { type: 'text' }, this.carName);
        this.colorInput = new Input(header, { type: 'color' }, this.carColor);
        this.updateCarBtn = new Button({
            classNames: ['button-save'],
            parent: header,
            content: 'save changes',
            onClick: () => this.updateCarViewParams(),
        });
        this.deleteCarBtn = new Button({
            classNames: ['button-remove'],
            parent: header,
            content: 'remove',
            onClick: () => this.removeCar(),
        });
        const track = new BaseComponent({ parent: this, classNames: ['car-track'] });
        this.carAnimationControls = new AnimationControls({
            startButtonContent: 'A',
            stopButtonContent: 'B',
            onStart: () => this.createSingleCarRace(),
            onStop: () => this.resetCar(),
        });
        track.insertChildren([this.carAnimationControls, this.car]);
        this.carAnimationControls.stopBtn.disable();
    }

    private getCarViewParams(): CarParams {
        const name = this.nameInput.getValue();
        const color = this.colorInput.getValue();
        return { name, color };
    }

    private async updateCarViewParams(): Promise<void> {
        await updateCar(this.carId, this.getCarViewParams());
        this.node.dispatchEvent(garageUpdateEvent);
    }

    private async removeCar(): Promise<void> {
        await deleteCar(this.carId);
        await deleteWinner(this.carId);
        this.node.dispatchEvent(garageUpdateEvent);
    }

    public async startCar(isRaceMode?: boolean): Promise<void> {
        this.carAnimationControls.startBtn.disable();
        if (!isRaceMode) {
            this.carAnimationControls.stopBtn.enable();
        }
        this.updateCarBtn.disable();
        this.deleteCarBtn.disable();
        const { velocity, distance } = await startEngine(this.carId);
        this.time = distance / velocity;
        this.isCarStarted = true;
    }

    public async animateCar(): Promise<CarRaceData> {
        this.animation.addAnimation(this.getTrackWidth(), this.time);
        return setDriveMode(this.carId)
            .then((): CarRaceData => ({ id: this.carId, time: Number(formatTime(this.time)) }))
            .finally(() => this.animation.removeAnimation());
    }

    private createSingleCarRace(): void {
        this.startCar()
            .then(() => this.animateCar())
            .catch((err: Error) => {
                if (err.name === 'AbortError') {
                    console.log('User aborted the request.');
                } else {
                    console.log(err);
                }
            });
    }

    public async resetCar(): Promise<void> {
        if (this.isCarStarted) {
            await stopEngine(this.carId);
            this.animation.removeAnimation();
            this.carAnimationControls.startBtn.enable();
            this.carAnimationControls.stopBtn.disable();
            this.updateCarBtn.enable();
            this.deleteCarBtn.enable();
            this.car.resetPosition();
            this.modal?.destroy();
        }
        this.isCarStarted = false;
        return Promise.resolve();
    }

    private getTrackWidth(): number {
        return this.node.clientWidth;
    }

    public createModal(): void {
        this.modal = new Modal(this, this.carName, formatTime(this.time));
    }
}
