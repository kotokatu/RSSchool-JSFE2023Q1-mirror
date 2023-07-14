import { BaseComponent } from '../base-component';

export default class CarAnimation {
    element: HTMLElement;
    start!: number;
    numberOfPixels!: number;
    duration!: number;
    id!: number;
    constructor(element: HTMLElement) {
        this.element = element;
    }

    public addAnimation(numberOfPixels: number, duration: number) {
        this.start = 0;
        this.numberOfPixels = numberOfPixels - this.element.clientWidth;
        this.duration = duration;
        requestAnimationFrame(this.animate.bind(this));
    }

    private animate(timestamp: number) {
        this.start = this.start || timestamp;
        const elapsed = timestamp - this.start;
        const progress = elapsed / this.duration;
        const pos = this.numberOfPixels * progress;
        this.element.style.transform = `translateX(${pos}px)`;
        this.id = requestAnimationFrame(this.animate.bind(this));
    }

    public removeAnimation() {
        cancelAnimationFrame(this.id);
    }
}
