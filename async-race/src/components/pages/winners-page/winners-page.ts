import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import WinnersTable from './winners-table/winners-table';
import { getWinners, SortBase, SortOrder } from '../../../utils/api-utils';
import Page from '../page';

export default class WinnersPage extends Page {
    winnersTable: WinnersTable;
    sortBy: SortBase = SortBase.Id;
    sortOrder: SortOrder = SortOrder.Ascending;

    constructor(store: Store) {
        super(PageName.Winners, store);
        this.winnersTable = new WinnersTable(this.mainContainer, this.renderMainView.bind(this));
    }

    public async renderMainView(sortBy?: SortBase): Promise<void> {
        if (sortBy) {
            this.setSortParams(sortBy);
        }
        const { winners, winnersCount } = await getWinners(
            this.store.page,
            this.store.limit,
            this.sortBy,
            this.sortOrder
        );
        this.updateCarsCount(winnersCount);
        this.winnersTable.renderRows(winners);
    }

    private setSortParams(sortBy: SortBase): void {
        if (sortBy !== this.sortBy) {
            this.sortBy = sortBy;
            this.sortOrder = SortOrder.Ascending;
        } else {
            this.sortOrder =
                this.sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
        }
    }
}
