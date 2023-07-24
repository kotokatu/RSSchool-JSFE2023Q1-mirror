import BaseComponent from '../../../base-component';
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
import Button from '../../../button/button';
import AnimationControls from '../animation-controls/animation-controls';
import CarAnimation from '../car-animation/car-animation';
import { formatTime } from '../../../../utils/utils';
import Modal from '../modal/modal';
import { emitter, UpdateEvent } from '../../../../utils/event-emitter';
import './car-track.scss';

export default class CarTrack extends BaseComponent {
    private isCarStarted = false;

    public carId: number;

    private carName: string;

    private carColor: string;

    private animation!: CarAnimation;

    private car!: Car;

    private carAnimationControls!: AnimationControls;

    private carNameInput!: TextInput;

    private carColorInput!: ColorInput;

    private time!: number;

    private modal!: Modal;

    private deleteCarBtn!: Button;

    updateCarBtn!: Button;

    private trackWidth!: number;

    private finishLine!: BaseComponent;

    constructor(params: GetCarApiResponse) {
        super('div', ['car-track-container']);
        this.carId = params.id;
        this.carName = params.name;
        this.carColor = params.color;
        this.render();
    }

    private render(): void {
        this.renderCarTrackHeader();
        const carTrack = new BaseComponent('div', ['car-track'], this);
        const carTrackWay = new BaseComponent('div', ['car-track-way'], carTrack);
        this.finishLine = new BaseComponent('div', ['car-track-finish'], carTrackWay);
        this.carAnimationControls = new AnimationControls({
            class: 'car-track',
            startButtonContent: 'A',
            stopButtonContent: 'B',
            onStart: () => this.createSingleCarRace(),
            onStop: () => this.resetCar(),
            parent: carTrack,
        });
        this.carAnimationControls.stopBtn.disable();
        this.car = new Car(this.carColor, carTrack);
        this.animation = new CarAnimation(this.car);
    }

    private renderCarTrackHeader() {
        const header = new BaseComponent('div', ['car-track-header'], this);
        this.carNameInput = new TextInput({
            parent: header,
            classNames: ['car-tract-name-input'],
            attributes: { required: '', pattern: '.*\\S.*' },
            value: this.carName,
            onChange: () => {
                if (!this.carNameInput.getNode().checkValidity()) {
                    this.carNameInput.setValue(this.carName);
                    return;
                }
                this.updateCarBtn.setCssClasses(['blink']);
            },
        });
        this.carColorInput = new ColorInput({
            parent: header,
            classNames: ['carTrack-color-input'],
            onChange: () => this.updateCarBtn.setCssClasses(['blink']),
            value: this.carColor,
        });
        this.updateCarBtn = new Button(() => this.updateCarView(), header, ['button-save'], 'save');
        this.updateCarBtn.addListener('animationend', () =>
            this.updateCarBtn.removeCssClasses(['blink'])
        );
        this.deleteCarBtn = new Button(() => this.removeCar(), header, ['button-delete']);
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
        if (!isRaceMode) {
            this.carAnimationControls.stopBtn.enable();
        }
        this.carAnimationControls.startBtn.disable();
        this.deleteCarBtn.disable();
        this.getTrackWidth();
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
