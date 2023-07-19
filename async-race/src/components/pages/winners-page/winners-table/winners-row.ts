import { BaseComponent } from '../../../base-component';
import { GetWinnerApiResponse, getCar, CarParams } from '../../../../utils/api-utils';
import carSVG from '../../../../assets/car_icon.svg';
import { createSVG } from '../../../../utils/utils';

export default class WinnersRow extends BaseComponent {
    id: number;
    time: number;
    wins: number;
    index: number;
    carViewParams!: CarParams;
    constructor(parent: BaseComponent, winnerData: GetWinnerApiResponse, index: number) {
        super({ tag: 'tr', parent, classNames: ['winners-table-row'] });
        this.id = winnerData.id;
        this.time = winnerData.time;
        this.wins = winnerData.wins;
        this.index = index;
        this.render();
    }

    async render() {
        this.carViewParams = await getCar(this.id);
        const indexCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'index-cell'],
            content: this.index.toString(),
        });
        const imageCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'image-cell'],
        });
        const carIcon = createSVG(`${carSVG}#car_icon`);
        carIcon.style.fill = this.carViewParams.color;
        imageCell.insertChild(carIcon);
        const nameCell = new BaseComponent({
            tag: 'td',
            parent: this,
            classNames: ['winners-table-cell', 'name-cell'],
            content: this.carViewParams.name,
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
            classNames: ['winners-table-cell', 'wins-cell'],
            content: this.time.toString(),
        });
    }
}
