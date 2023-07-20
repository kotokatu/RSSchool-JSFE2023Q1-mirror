import { BaseComponent } from '../../../../base-component';
import { GetWinnerApiResponse, getCar } from '../../../../../utils/api-utils';
import carSVG from '../../../../../assets/car_icon.svg';
import { createSVG } from '../../../../../utils/utils';

export default class WinnersTableRow extends BaseComponent {
    id: number;

    time: number;

    wins: number;

    index: string;

    constructor(parent: BaseComponent, winnerData: GetWinnerApiResponse, index: string) {
        super({ tag: 'tr', parent, classNames: ['winners-table-row'] });
        this.id = winnerData.id;
        this.time = winnerData.time;
        this.wins = winnerData.wins;
        this.index = index;
        this.render();
    }

    async render() {
        const carViewParams = await getCar(this.id);
        const indexCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'index-cell'],
            content: this.index,
        });
        const imageCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'image-cell'],
        });
        const carIcon = createSVG(`${carSVG}#car_icon`, 'car-icon');
        carIcon.style.fill = carViewParams.color;
        imageCell.insertChild(carIcon);
        const nameCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'name-cell'],
            content: carViewParams.name,
        });
        const winsCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'wins-cell'],
            content: this.wins.toString(),
        });
        const timeCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'time-cell'],
            content: this.time.toString(),
        });
    }
}
