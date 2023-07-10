import { BaseComponent } from '../base-component';
import { CarConfig } from '../../utils/api-utils';
import carSVG from '../../assets/car__inline.svg';
import './car.css';

export default class Car extends BaseComponent {
    public id: number;
    private name: string;
    private color: string;
    constructor(params: CarConfig) {
        super({ classNames: ['car'] });
        this.id = params.id;
        this.name = params.name;
        this.color = params.color;
        this.createCarView();
    }

    createCarView() {
        this.setHtmlContent(carSVG);
        this.setColor(this.color);
    }

    setColor(color: string) {
        this.node.style.fill = color;
    }
}
