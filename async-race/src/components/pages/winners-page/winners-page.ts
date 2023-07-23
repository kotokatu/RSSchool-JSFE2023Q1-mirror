import { Store } from '../../../store/store';
import WinnersTable from './winners-table/winners-table';
import { getWinners, SortBase, SortOrder } from '../../../utils/api-utils';
import { Page, PageName } from '../page';
import { emitter, UpdateEvent } from '../../../utils/event-emitter';

export default class WinnersPage extends Page {
    private winnersTable!: WinnersTable;

    private sortBy: SortBase = SortBase.Id;

    private sortOrder: SortOrder = SortOrder.Ascending;

    constructor(store: Store) {
        super(PageName.Winners, store);
        emitter.listen(UpdateEvent.WinnersUpdate, this.renderMainView.bind(this));
        this.winnersTable = new WinnersTable(this.mainContainer, this.sortWinners.bind(this));
        this.renderMainView();
    }

    protected async renderMainView(): Promise<void> {
        const { winners, winnersCount } = await getWinners(
            this.store.page,
            this.store.limit,
            this.sortBy,
            this.sortOrder
        );
        this.updateCarsCount(winnersCount);
        this.winnersTable.renderRows(winners, this.store.page);
    }

    private sortWinners(sortBy: SortBase): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
            this.sortOrder = SortOrder.Ascending;
        } else {
            this.sortOrder =
                this.sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
        }
        this.renderMainView();
    }
}
