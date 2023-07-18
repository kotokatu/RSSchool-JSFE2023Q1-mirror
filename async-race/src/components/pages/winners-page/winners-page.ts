import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import { Button } from '../../button/button';
import { GetWinnerApiResponse, getWinners } from '../../../utils/api-utils';
import Page from '../page';

export default class WinnersPage extends Page {
    constructor(store: Store) {
        super(PageName.Winners, store);
        this.renderMainView();
    }

    public async renderMainView(): Promise<void> {
        const { cars, carsCount } = await getWinners(this.store.page, this.store.limit);
        this.updateCarsCount(carsCount);
        this.addCarsToView(cars);
    }

    protected addCarsToView(winnersData: GetWinnerApiResponse[]): void {
        this.mainContainer.clearNode();
        winnersData.forEach((winnerData: GetWinnerApiResponse) =>
            this.mainContainer.insertChild(
                new BaseComponent({
                    content: `${winnerData.id} ${winnerData.wins} ${winnerData.time}`,
                })
            )
        );
    }
}
