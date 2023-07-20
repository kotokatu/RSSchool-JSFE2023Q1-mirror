import { Store } from '../../../store/store';
import { Page, PageName } from '../page';
import { getCars, GetCarApiResponse, CarRaceData } from '../../../utils/api-utils';
import addCarToWinners from '../../../utils/winners-utils';
import CarGenerationControls from './car-generation-controls/car-generation-controls';
import AnimationControls from './animation-controls/animation-controls';
import CarTrack from './car-track/car-track';
import { emitter, UpdateEvent } from '../../../utils/event-emitter';

export default class GaragePage extends Page {
    carTracks: CarTrack[] = [];

    carGenerationControls!: CarGenerationControls;

    raceAnimationControls!: AnimationControls;

    isRaceOn = false;

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
            onStop: () => this.cancelRace(),
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

    protected addCarTracksToView(): void {
        this.mainContainer.clearNode();
        this.carTracks.forEach((carTrack) => this.mainContainer.insertChild(carTrack));
    }

    async createRace(): Promise<void> {
        if (!this.carTracks.length) return;
        await this.resetCars();
        this.isRaceOn = true;
        this.raceAnimationControls.startBtn.disable();
        this.carGenerationControls.disableControls();
        Promise.any(
            this.carTracks.map((carTrack) =>
                carTrack.startCar(true).then(() => carTrack.animateCar())
            )
        )
            .then((carDriveData: CarRaceData) => {
                this.handleRaceEnd(carDriveData);
            })
            .catch(() => {});
    }

    async resetCars(): Promise<void[]> {
        return Promise.all(this.carTracks.map((carTrack: CarTrack) => carTrack.resetCar()));
    }

    async cancelRace() {
        this.isRaceOn = false;
        await this.resetCars();
        this.raceAnimationControls.startBtn.enable();
        this.carGenerationControls.enableControls();
    }

    private async handleRaceEnd(carRaceData: CarRaceData) {
        this.showWinModal(carRaceData.id);
        await addCarToWinners(carRaceData);
        emitter.emit(UpdateEvent.WinnersUpdate);
    }

    showWinModal(id: number) {
        const winnerCarTrack = this.carTracks.find((carTrack) => carTrack.carId === id);
        winnerCarTrack?.createWinModal();
    }
}
