import { BaseComponent } from '../base-component';
import { CarConfig } from '../../utils/api-utils';
import carSVG from '../../assets/car_icon.svg';
import { createSVG } from '../../utils/utils';
import './car.css';

export default class Car extends BaseComponent {
    private color: string;
    private svg: SVGSVGElement = createSVG(`${carSVG}#car_icon`);
    constructor(params: CarConfig) {
        super({ classNames: ['car'] });
        this.color = params.color;
        this.createCarView();
    }

    createCarView() {
        this.node.append(this.svg);
        this.setColor(this.color);
    }

    setColor(color: string) {
        this.svg.style.fill = color;
    }
}
