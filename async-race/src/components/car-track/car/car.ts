import { BaseComponent } from '../../base-component';
import carSVG from '../../../assets/car_icon.svg';
import { createSVG } from '../../../utils/utils';
import './car.css';

export default class Car extends BaseComponent {
    private svg!: SVGSVGElement;
    constructor(color: string) {
        super({ classNames: ['car'] });
        this.createCarView(color);
    }

    createCarView(color: string) {
        this.svg = createSVG(`${carSVG}#car_icon`);
        this.node.append(this.svg);
        this.setColor(color);
    }

    setColor(color: string) {
        this.svg.style.fill = color;
    }
}
