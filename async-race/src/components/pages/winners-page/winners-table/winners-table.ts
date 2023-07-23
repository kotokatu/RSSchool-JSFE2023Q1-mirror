import { BaseComponent } from '../../../base-component';
import { GetWinnerApiResponse, SortBase } from '../../../../utils/api-utils';
import WinnersTableRow from './table-row/table-row';
import TableHeaderCell from './table-header-cell/table-header-cell';
import './winners-table.scss';

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
        const numberCell = new TableHeaderCell(tableHead, 'number-cell', '№');
        const imageCell = new TableHeaderCell(tableHead, 'image-cell', 'Image');
        const nameCell = new TableHeaderCell(tableHead, 'name-cell', 'Name');
        this.winsCell = new TableHeaderCell(tableHead, 'wins-cell', 'Wins', () => {
            this.sortWinners(SortBase.Wins);
            this.timeCell.hideMarker();
        });
        this.timeCell = new TableHeaderCell(tableHead, 'time-cell', 'Time', () => {
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
