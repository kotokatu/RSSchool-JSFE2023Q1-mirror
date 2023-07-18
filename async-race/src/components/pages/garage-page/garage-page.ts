import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import Page from '../page';
import {
    getCars,
    GetCarApiResponse,
    getWinner,
    GetWinnerApiResponse,
    createWinner,
    updateWinner,
} from '../../../utils/api-utils';
import CarGenerationControls from '../../car-generation-controls/car-generation-controls';
import AnimationControls from './animation-controls/animation-controls';
import { CarTrack, CarDriveData } from './car-track/car-track';

export default class GaragePage extends Page {
    carTracks: CarTrack[] = [];
    carGenerationControls!: CarGenerationControls;
    raceAnimationControls!: AnimationControls;
    isRaceOn = false;
    constructor(store: Store) {
        super(PageName.Garage, store);
        this.addListener('garage-update', () => this.renderMainView());
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

    public async renderMainView(): Promise<void> {
        if (this.isRaceOn) {
            this.isRaceOn = false;
            this.resetCars();
            this.raceAnimationControls.switchButtonsState();
            this.carGenerationControls.enableControls();
        }

        const { cars, carsCount } = await getCars(this.store.page, this.store.limit);
        this.createCarTracks(cars);
        this.updateCarsCount(carsCount);
        this.addCarTracksToView();
    }

    private createCarTracks(carsData: GetCarApiResponse[]): void {
        this.carTracks = [];
        carsData.forEach((data: GetCarApiResponse) => this.carTracks.push(new CarTrack(data)));
    }

    protected addCarTracksToView(): void {
        this.mainContainer.clearNode();
        this.carTracks.forEach((carTrack) => this.mainContainer.insertChild(carTrack));
    }

    async createRace(): Promise<void> {
        this.resetCars();
        this.isRaceOn = true;
        this.raceAnimationControls.switchButtonsState();
        this.carGenerationControls.disableControls();
        Promise.any(
            this.carTracks.map((carTrack) =>
                carTrack.calculateTime(true).then(() => carTrack.animateCar())
            )
        )
            .then((carDriveData: CarDriveData) => {
                this.addCarToWinners(carDriveData);
                this.showWinnerModal(carDriveData.id);
            })
            .catch((err: Error) => {
                if (err.name === 'AggregateError') {
                    console.log('User aborted all requests.');
                } else {
                    console.log(err);
                }
            });
    }

    async resetCars(): Promise<void> {
        Promise.all(this.carTracks.map((carTrack: CarTrack) => carTrack.resetCar()));
    }

    async cancelRace() {
        this.isRaceOn = false;
        await this.resetCars();
        this.raceAnimationControls.switchButtonsState();
        this.carGenerationControls.enableControls();
    }

    async addCarToWinners(carDriveData: CarDriveData): Promise<void> {
        const winner: GetWinnerApiResponse = await getWinner(carDriveData.id);
        if (!winner.id) {
            const winnerData = { id: carDriveData.id, wins: 1, time: carDriveData.time };
            await createWinner(winnerData);
        } else {
            const winnerData = {
                id: carDriveData.id,
                wins: winner.wins + 1,
                time: winner.time > carDriveData.time ? carDriveData.time : winner.time,
            };
            await updateWinner(winnerData);
        }
    }

    showWinnerModal(id: number) {
        const winnerCarTrack = this.carTracks.find((carTrack) => carTrack.carId === id);
        winnerCarTrack?.createModal();
    }
}
