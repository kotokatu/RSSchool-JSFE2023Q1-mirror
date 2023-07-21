export enum UpdateEvent {
    GarageUpdate = 'garage-update',
    WinnersUpdate = 'winners-update',
}

class EventEmitter {
    private listeners: Record<UpdateEvent, (() => Promise<void>)[]> = {
        [UpdateEvent.GarageUpdate]: [],
        [UpdateEvent.WinnersUpdate]: [],
    };

    public listen(name: UpdateEvent, callback: () => Promise<void>) {
        this.listeners[name].push(callback);
    }

    public emit(name: UpdateEvent) {
        this.listeners[name].forEach((callback) => callback());
    }
}

export const emitter = new EventEmitter();
