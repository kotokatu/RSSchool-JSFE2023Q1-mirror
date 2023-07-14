import { BaseComponent } from '../../../base-component';
import carSVG from '../../../../assets/car_icon.svg';
import { createSVG } from '../../../../utils/utils';
import './car.css';

export default class Car extends BaseComponent {
    private svg!: SVGSVGElement;
    constructor(color: string) {
        super({ classNames: ['car'] });
        this.createCarView(color);
    }

    private createCarView(color: string) {
        this.svg = createSVG(`${carSVG}#car_icon`);
        this.node.append(this.svg);
        this.setColor(color);
    }

    public setColor(color: string) {
        this.svg.style.fill = color;
    }

    public resetPosition() {
        this.node.style.transform = 'translateX(0)';
    }
}
