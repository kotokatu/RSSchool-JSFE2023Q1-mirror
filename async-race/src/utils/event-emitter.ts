export enum UpdateEvent {
    GarageUpdate = 'garage-update',
    WinnersUpdate = 'winners-update',
}

class EventEmitter {
    listeners: Record<UpdateEvent, (() => Promise<void>)[]> = {
        [UpdateEvent.GarageUpdate]: [],
        [UpdateEvent.WinnersUpdate]: [],
    };

    listen(name: UpdateEvent, callback: () => Promise<void>) {
        this.listeners[name].push(callback);
    }

    emit(name: UpdateEvent) {
        this.listeners[name].forEach((callback) => callback());
    }
}

export const emitter = new EventEmitter();
