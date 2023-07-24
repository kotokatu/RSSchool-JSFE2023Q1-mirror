import BaseComponent from '../../../../base-component';
import { GetWinnerApiResponse, getCar } from '../../../../../utils/api-utils';
import Car from '../../../garage-page/car/car';
import './table-row.scss';

export default class WinnersTableRow extends BaseComponent {
    private id: number;

    private time: number;

    private wins: number;

    private index: string;

    constructor(parent: BaseComponent, winnerData: GetWinnerApiResponse, index: string) {
        super('tr', ['table-row'], parent);
        this.id = winnerData.id;
        this.time = winnerData.time;
        this.wins = winnerData.wins;
        this.index = index;
        this.render();
    }

    private async render(): Promise<void> {
        const carViewParams = await getCar(this.id);
        const indexCell = new BaseComponent('td', ['table-cell', 'index-cell'], this, this.index);
        const imageCell = new BaseComponent('td', ['table-cell', 'image-cell'], this);
        const car = new Car(carViewParams.color, imageCell);
        const nameCell = new BaseComponent(
            'td',
            ['table-cell', 'name-cell'],
            this,
            carViewParams.name
        );
        const winsCell = new BaseComponent(
            'td',
            ['table-cell', 'wins-cell'],
            this,
            this.wins.toString()
        );
        const timeCell = new BaseComponent(
            'td',
            ['table-cell', 'time-cell'],
            this,
            this.time.toString()
        );
    }
}
