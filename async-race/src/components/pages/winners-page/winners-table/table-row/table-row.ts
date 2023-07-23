import { BaseComponent } from '../../../../base-component';
import { GetWinnerApiResponse, getCar } from '../../../../../utils/api-utils';
import Car from '../../../garage-page/car/car';
import './table-row.scss';

export default class WinnersTableRow extends BaseComponent {
    private id: number;

    private time: number;

    private wins: number;

    private index: string;

    constructor(parent: BaseComponent, winnerData: GetWinnerApiResponse, index: string) {
        super({ tag: 'tr', parent, classNames: ['table-row'] });
        this.id = winnerData.id;
        this.time = winnerData.time;
        this.wins = winnerData.wins;
        this.index = index;
        this.render();
    }

    private async render(): Promise<void> {
        const carViewParams = await getCar(this.id);
        const indexCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['table-cell', 'index-cell'],
            content: this.index,
        });
        const imageCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['table-cell', 'image-cell'],
        });
        imageCell.insertChild(new Car(carViewParams.color));
        const nameCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['table-cell', 'name-cell'],
            content: carViewParams.name,
        });
        const winsCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['table-cell', 'wins-cell'],
            content: this.wins.toString(),
        });
        const timeCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['table-cell', 'time-cell'],
            content: this.time.toString(),
        });
    }
}
