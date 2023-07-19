import { BaseComponent } from '../../../base-component';
import { GetWinnerApiResponse, SortBase } from '../../../../utils/api-utils';
import WinnersTableRow from './table-row/table-row';
import TableHeaderCell from './table-header-cell/table-header-cell';

export default class WinnersTable extends BaseComponent {
    sortWinners: (sortBy: SortBase) => void;
    tableBody!: BaseComponent;
    timeCell!: TableHeaderCell;
    winsCell!: TableHeaderCell;
    itemsLimit: number;
    constructor(
        parent: BaseComponent,
        sortWinners: (sortBy: SortBase) => void,
        itemsLimit: number
    ) {
        super({ tag: 'table', parent, classNames: ['winners-table'] });
        this.itemsLimit = itemsLimit;
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

    public renderRows(winnersData: GetWinnerApiResponse[], pageNum: number) {
        this.tableBody.clearNode();
        winnersData.forEach(
            (winnerData: GetWinnerApiResponse, index: number) =>
                new WinnersTableRow(
                    this.tableBody,
                    winnerData,
                    (pageNum - 1) * this.itemsLimit + index + 1
                )
        );
    }
}
