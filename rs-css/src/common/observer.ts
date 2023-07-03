import { UpdateStateParams } from '../app';

class Observer {
    observers: ((params: UpdateStateParams) => void)[];
    constructor() {
        this.observers = [];
    }

    public subscribe(fn: (params: UpdateStateParams) => void) {
        this.observers.push(fn);
    }

    public notify(params: UpdateStateParams) {
        this.observers.forEach((subscriber: (params: UpdateStateParams) => void) => subscriber(params));
    }
}

export const observer = new Observer();
