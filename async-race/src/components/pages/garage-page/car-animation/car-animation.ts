import Car from '../car/car';

export default class CarAnimation {
    car: HTMLElement;
    start!: number;
    numberOfPixels!: number;
    duration!: number;
    requestId!: number;
    constructor(car: Car) {
        this.car = car.getNode();
    }

    public addAnimation(numberOfPixels: number, duration: number) {
        this.start = 0;
        this.numberOfPixels = numberOfPixels - this.car.clientWidth;
        this.duration = duration;
        this.requestId = requestAnimationFrame(this.animate.bind(this));
    }

    private animate(timestamp: number) {
        this.start = this.start || timestamp;
        const elapsed = timestamp - this.start;
        const progress = elapsed / this.duration;
        const pos = this.numberOfPixels * progress;
        this.car.style.transform = `translateX(${pos}px)`;
        if (elapsed < this.duration) {
            this.requestId = requestAnimationFrame(this.animate.bind(this));
        }
    }

    public removeAnimation() {
        cancelAnimationFrame(this.requestId);
    }
}
