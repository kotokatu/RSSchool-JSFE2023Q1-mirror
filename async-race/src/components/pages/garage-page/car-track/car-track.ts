import { BaseComponent } from '../../../base-component';
import Car from '../car/car';
import {
    GetCarApiResponse,
    CarRaceData,
    updateCar,
    deleteCar,
    startEngine,
    stopEngine,
    setDriveMode,
    deleteWinner,
} from '../../../../utils/api-utils';
import { ColorInput } from '../../../input/color-input/color-input';
import TextInput from '../../../input/text-input/text-input';
import { Button } from '../../../button/button';
import AnimationControls from '../animation-controls/animation-controls';
import CarAnimation from '../car-animation/car-animation';
import { formatTime } from '../../../../utils/utils';
import Modal from '../modal/modal';
import { emitter, UpdateEvent } from '../../../../utils/event-emitter';
import './car-track.scss';

export default class CarTrack extends BaseComponent {
    private isCarStarted = false;

    private car: Car;

    public carId: number;

    private carName: string;

    private carColor: string;

    private animation: CarAnimation;

    private carAnimationControls!: AnimationControls;

    private carNameInput!: TextInput;

    private carColorInput!: ColorInput;

    private time!: number;

    private modal!: Modal;

    private deleteCarBtn!: Button;

    private trackWidth!: number;

    private finishLine!: BaseComponent;

    constructor(params: GetCarApiResponse) {
        super({ classNames: ['car-track-container'] });
        this.car = new Car(params.color);
        this.carId = params.id;
        this.carName = params.name;
        this.carColor = params.color;
        this.animation = new CarAnimation(this.car);
        this.render();
    }

    private render(): void {
        const header = new BaseComponent({ parent: this, classNames: ['car-track-header'] });
        this.carNameInput = new TextInput({
            parent: header,
            attributes: { required: '', pattern: '.*\\S.*' },
            value: this.carName,
        });
        this.carNameInput.addListener('change', () => {
            if (!this.carNameInput.getNode().checkValidity()) {
                this.carNameInput.setValue(this.carName);
            }
        });
        this.carColorInput = new ColorInput({ parent: header, value: this.carColor });
        const updateCarBtn = new Button({
            classNames: ['button-save'],
            parent: header,
            content: 'save',
            onClick: () => this.updateCarView(),
        });
        this.deleteCarBtn = new Button({
            classNames: ['button-remove'],
            parent: header,
            content: 'remove',
            onClick: () => this.removeCar(),
        });
        const carTrack = new BaseComponent({ parent: this, classNames: ['car-track'] });
        const carTrackWay = new BaseComponent({ parent: carTrack, classNames: ['car-track-way'] });
        this.finishLine = new BaseComponent({
            parent: carTrackWay,
            classNames: ['car-track-finish'],
        });
        this.carAnimationControls = new AnimationControls({
            class: 'car-track',
            startButtonContent: 'A',
            stopButtonContent: 'B',
            onStart: () => this.createSingleCarRace(),
            onStop: () => this.resetCar(),
        });
        carTrack.insertChildren([this.carAnimationControls, this.car]);
        this.carAnimationControls.stopBtn.disable();
    }

    private async updateCarView() {
        this.getCarViewParams();
        await updateCar(this.carId, { name: this.carName, color: this.carColor });
        this.car.setColor(this.carColor);
        this.carNameInput.setValue(this.carName);
        emitter.emit(UpdateEvent.WinnersUpdate);
    }

    private getCarViewParams(): void {
        this.carName = this.carNameInput.getValue();
        this.carColor = this.carColorInput.getValue();
    }

    private async removeCar(): Promise<void> {
        await deleteCar(this.carId);
        await deleteWinner(this.carId);
        emitter.emit(UpdateEvent.GarageUpdate);
        emitter.emit(UpdateEvent.WinnersUpdate);
    }

    public async startCar(isRaceMode?: boolean): Promise<void> {
        this.isCarStarted = true;
        this.getTrackWidth();
        this.carAnimationControls.startBtn.disable();
        if (!isRaceMode) {
            this.carAnimationControls.stopBtn.enable();
        }
        this.deleteCarBtn.disable();
        const { velocity, distance } = await startEngine(this.carId);
        this.time = distance / velocity;
    }

    public async animateCar(): Promise<CarRaceData | never> {
        this.animation.addAnimation(this.trackWidth, this.time);
        const res = await setDriveMode(this.carId);
        if (res.success) {
            return Promise.resolve({ id: this.carId, time: Number(formatTime(this.time)) });
        }
        this.animation.removeAnimation();
        return Promise.reject();
    }

    private createSingleCarRace(): void {
        this.startCar()
            .then(() => this.animateCar())
            .catch(() => {});
    }

    public async resetCar(): Promise<void> {
        if (!this.isCarStarted) return;

        this.isCarStarted = false;
        this.carAnimationControls.stopBtn.disable();
        await stopEngine(this.carId);
        this.animation.removeAnimation();
        this.car.resetPosition();
        this.carAnimationControls.startBtn.enable();
        this.deleteCarBtn.enable();
        this.modal?.destroy();
    }

    public createWinModal(): void {
        this.modal = new Modal(this, this.carName, formatTime(this.time));
    }

    private getTrackWidth = (): void => {
        this.trackWidth =
            this.node.clientWidth -
            this.finishLine.getNode().clientWidth -
            this.car.getNode().clientWidth;
    };
}
