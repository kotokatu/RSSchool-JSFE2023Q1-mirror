import { Store } from '../../../store/store';
import { Page, PageName } from '../page';
import { getCars, GetCarApiResponse, CarRaceData } from '../../../utils/api-utils';
import addCarToWinners from '../../../utils/winners-utils';
import CarGenerationControls from './car-generation-controls/car-generation-controls';
import AnimationControls from './animation-controls/animation-controls';
import CarTrack from './car-track/car-track';
import { emitter, UpdateEvent } from '../../../utils/event-emitter';

export default class GaragePage extends Page {
    private carTracks: CarTrack[] = [];

    private carGenerationControls!: CarGenerationControls;

    private raceAnimationControls!: AnimationControls;

    private isRaceOn = false;

    constructor(store: Store) {
        super(PageName.Garage, store);
        emitter.listen(UpdateEvent.GarageUpdate, this.renderMainView.bind(this));
        this.renderPageControls();
        this.renderMainView();
    }

    private renderPageControls(): void {
        this.carGenerationControls = new CarGenerationControls();
        this.raceAnimationControls = new AnimationControls({
            startButtonContent: 'race',
            stopButtonContent: 'reset',
            onStart: () => this.createRace(),
            onStop: () => this.resetRace(),
        });
        this.prependChildren([this.raceAnimationControls, this.carGenerationControls]);
    }

    protected async renderMainView(): Promise<void> {
        if (this.isRaceOn) {
            this.isRaceOn = false;
            this.resetCars();
            this.raceAnimationControls.startBtn.enable();
            this.carGenerationControls.enableControls();
        }

        const { cars, carsCount } = await getCars(this.store.page, this.store.limit);
        this.createCarTracks(cars);
        this.updateCarsCount(carsCount);
        this.addCarTracksToView();
    }

    private createCarTracks(carsData: GetCarApiResponse[]): void {
        this.carTracks = carsData.map((data: GetCarApiResponse) => new CarTrack(data));
    }

    private addCarTracksToView(): void {
        this.mainContainer.clearNode();
        this.carTracks.forEach((carTrack) => this.mainContainer.insertChild(carTrack));
    }

    private async createRace(): Promise<void> {
        if (!this.carTracks.length) return;
        await this.resetCars();
        this.isRaceOn = true;
        this.raceAnimationControls.startBtn.disable();
        this.raceAnimationControls.stopBtn.disable();
        this.carGenerationControls.disableControls();
        const promises = this.carTracks.map((carTrack) =>
            carTrack.startCar(true).then(() => carTrack.animateCar())
        );
        Promise.any(promises)
            .then((carDriveData: CarRaceData) => {
                this.handleRaceEnd(carDriveData);
            })
            .catch(() => {});
        Promise.allSettled(promises)
            .catch(() => {})
            .finally(() => {
                this.raceAnimationControls.stopBtn.enable();
                this.carGenerationControls.enableControls();
            });
    }

    private async resetCars(): Promise<void[]> {
        return Promise.all(this.carTracks.map((carTrack: CarTrack) => carTrack.resetCar()));
    }

    private async resetRace(): Promise<void> {
        this.isRaceOn = false;
        await this.resetCars();
        this.raceAnimationControls.startBtn.enable();
    }

    private async handleRaceEnd(carRaceData: CarRaceData): Promise<void> {
        this.showWinModal(carRaceData.id);
        await addCarToWinners(carRaceData);
        emitter.emit(UpdateEvent.WinnersUpdate);
    }

    private showWinModal(id: number): void {
        const winnerCarTrack = this.carTracks.find((carTrack) => carTrack.carId === id);
        winnerCarTrack?.createWinModal();
    }
}
