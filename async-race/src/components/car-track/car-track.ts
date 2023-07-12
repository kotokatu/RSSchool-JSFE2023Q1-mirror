import { BaseComponent } from '../base-component';
import Car from './car/car';
import { GetCarApiResponse } from '../../utils/api-utils';
import CarControls from './car-controls/car-controls';

export default class CarTrack extends BaseComponent {
    id: number;
    color: string;
    name: string;
    car: Car;
    carControls: CarControls;
    constructor(params: GetCarApiResponse) {
        super({ classNames: ['car-track'] });
        this.id = params.id;
        this.color = params.color;
        this.name = params.name;
        this.car = new Car(this.color);
        this.carControls = new CarControls(this.car, params);
        this.render();
    }

    render() {
        this.insertChildren([this.carControls, this.car]);
    }
}
