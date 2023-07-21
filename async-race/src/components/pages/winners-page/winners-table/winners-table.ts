import { BaseComponent } from '../../../base-component';
import { GetWinnerApiResponse, SortBase } from '../../../../utils/api-utils';
import WinnersTableRow from './table-row/table-row';
import TableHeaderCell from './table-header-cell/table-header-cell';

export default class WinnersTable extends BaseComponent {
    private sortWinners: (sortBy: SortBase) => void;

    private tableBody!: BaseComponent;

    private timeCell!: TableHeaderCell;

    private winsCell!: TableHeaderCell;

    constructor(parent: BaseComponent, sortWinners: (sortBy: SortBase) => void) {
        super({ tag: 'table', parent, classNames: ['winners-table'] });
        this.sortWinners = sortWinners;
        this.render();
    }

    private render(): void {
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

    public renderRows(winnersData: GetWinnerApiResponse[], pageNum: number): void {
        this.tableBody.clearNode();
        winnersData.forEach(
            (winnerData: GetWinnerApiResponse, index: number) =>
                new WinnersTableRow(
                    this.tableBody,
                    winnerData,
                    pageNum - 1 ? `${pageNum - 1}${index + 1}` : `${index + 1}`
                )
        );
    }
}
