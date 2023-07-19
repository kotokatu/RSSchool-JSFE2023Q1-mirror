import { BaseComponent } from '../../../base-component';
import { GetWinnerApiResponse, SortBase, SortOrder } from '../../../../utils/api-utils';
import WinnersRow from './winners-row';
import TableHeaderCell from '../../../table/table-header-cell';

export default class WinnersTable extends BaseComponent {
    sortWinners: (sortBy: SortBase) => void;
    tableBody!: BaseComponent;
    timeCell!: TableHeaderCell;
    winsCell!: TableHeaderCell;
    constructor(parent: BaseComponent, sortWinners: (sortBy: SortBase) => void) {
        super({ tag: 'table', parent, classNames: ['winners-table'] });
        this.sortWinners = sortWinners;
        this.render();
    }

    private render() {
        const tableHead = new BaseComponent({
            tag: 'thead',
            parent: this,
            classNames: ['winners-table-head'],
        });
        const numberCell = new TableHeaderCell(tableHead, '№');
        const imageCell = new TableHeaderCell(tableHead, 'Image');
        const nameCell = new TableHeaderCell(tableHead, 'Name');
        this.winsCell = new TableHeaderCell(tableHead, 'Wins', () => {
            this.sortWinners(SortBase.Wins);
            this.timeCell.hideMarker();
        });
        this.timeCell = new TableHeaderCell(tableHead, 'Time', () => {
            this.sortWinners(SortBase.Time);
            this.winsCell.hideMarker();
        });
        this.tableBody = new BaseComponent({ tag: 'tbody', parent: this });
    }

    public renderRows(winnersData: GetWinnerApiResponse[]) {
        this.tableBody.clearNode();
        winnersData.forEach(
            (winnerData: GetWinnerApiResponse, index: number) =>
                new WinnersRow(this.tableBody, winnerData, index + 1)
        );
    }
}
