import { BaseComponent } from '../../base-component';
import Car from '../car/car';
import { GetCarApiResponse } from '../../../utils/api-utils';
import Input from '../../input/input';
import { Button } from '../../button/button';
import './car-controls.css';

export default class CarControls extends BaseComponent {
    nameInput!: Input;
    colorInput!: Input;
    editBtn!: Button;
    updateBtn!: Button;
    deleteBtn!: Button;
    id: number;
    car: Car;
    color: string;
    name: string;
    constructor(car: Car, carParams: GetCarApiResponse) {
        super({ classNames: ['car-controls'] });
        this.id = carParams.id;
        this.color = carParams.color;
        this.name = carParams.name;
        this.car = car;
        this.render();
    }

    render() {
        this.colorInput = new Input(this, { type: 'color' });
        this.colorInput.setValue(this.color);
        this.nameInput = new Input(this, { type: 'text' });
        this.nameInput.setValue(this.name);
    }
}
