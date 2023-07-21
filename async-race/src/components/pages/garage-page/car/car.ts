import { BaseComponent } from '../../../base-component';
import carSVG from '../../../../assets/svg/car_icon2.svg';
import { createSVG } from '../../../../utils/utils';
import './car.scss';

export default class Car extends BaseComponent {
    private svg!: SVGSVGElement;

    constructor(color: string) {
        super({ classNames: ['car'] });
        this.render(color);
    }

    private render(color: string): void {
        this.svg = createSVG(`${carSVG}#car_icon2`, 'car-icon');
        this.insertChild(this.svg);
        this.setColor(color);
    }

    public setColor(color: string): void {
        this.svg.style.fill = color;
        this.svg.style.filter = `drop-shadow(0 0 2px ${color})`;
    }

    public resetPosition(): void {
        this.node.style.transform = 'translateX(0)';
    }
}
