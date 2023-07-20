const BASE_URL = 'http://127.0.0.1:3000';

enum Endpoint {
    Garage = 'garage',
    Winners = 'winners',
    Engine = 'engine',
}

enum CarStatus {
    Started = 'started',
    Stopped = 'stopped',
    Drive = 'drive',
}

export enum SortOrder {
    Ascending = 'ASC',
    Descending = 'DESC',
}

export enum SortBase {
    Id = 'id',
    Wins = 'wins',
    Time = 'time',
}

export interface GetCarApiResponse {
    name: string;
    color: string;
    id: number;
}

export type CarViewParams = Omit<GetCarApiResponse, 'id'>;

export type CarRaceData = { id: number; time: number };

export interface GetCarsApiResponse {
    carsCount: number;
    cars: GetCarApiResponse[];
}

export interface StartEngineApiResponse {
    velocity: number;
    distance: number;
}

export interface SetDriveModeApiResponse {
    success: boolean;
}

export interface GetWinnerApiResponse {
    id: number;
    wins: number;
    time: number;
}

export interface GetWinnersApiResponse {
    winnersCount: number;
    winners: GetWinnerApiResponse[];
}

const controllers = new Map();

const abort = (id: number): void => {
    const controller: AbortController = controllers.get(id);
    controller?.abort();
    controllers.delete(id);
};

export const getCar = async (id: number): Promise<GetCarApiResponse> => {
    const url = `${BASE_URL}/${Endpoint.Garage}/${id}`;
    const res = await fetch(url);
    return res.json();
};

export const getCars = async (pageNum: number, limit: number): Promise<GetCarsApiResponse> => {
    const url = `${BASE_URL}/${Endpoint.Garage}?_page=${pageNum}&_limit=${limit}`;
    const res = await fetch(url);
    const cars = await res.json();
    const carsCount = Number(res.headers.get('X-Total-Count'));
    return { carsCount, cars };
};

export const getCarsCount = async (): Promise<number> => {
    const url = `${BASE_URL}/${Endpoint.Garage}?_limit=0`;
    const res = await fetch(url);
    return Number(res.headers.get('X-Total-Count'));
};

export const getWinners = async (
    pageNum: number,
    limit: number,
    sort: SortBase = SortBase.Id,
    order: SortOrder = SortOrder.Ascending
): Promise<GetWinnersApiResponse> => {
    const url = `${BASE_URL}/${Endpoint.Winners}?_page=${pageNum}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const res = await fetch(url);
    const winners = await res.json();
    const winnersCount = Number(res.headers.get('X-Total-Count'));
    return { winnersCount, winners };
};

export const getWinnersCount = async (): Promise<number> => {
    const url = `${BASE_URL}/${Endpoint.Winners}?_limit=0`;
    const res = await fetch(url);
    return Number(res.headers.get('X-Total-Count'));
};

export const getWinner = async (id: number): Promise<GetWinnerApiResponse> => {
    const url = `${BASE_URL}/${Endpoint.Winners}/${id}`;
    const res = await fetch(url);
    return res.json();
};

export const createWinner = async (winnerData: GetWinnerApiResponse): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Winners}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(winnerData),
    };
    await fetch(url, fetchOptions);
};

export const deleteWinner = async (id: number): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Winners}/${id}`;
    const fetchOptions = {
        method: 'DELETE',
    };
    await fetch(url, fetchOptions);
};

export const updateWinner = async (winnerData: GetWinnerApiResponse): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Winners}/${winnerData.id}`;
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ wins: winnerData.wins, time: winnerData.time }),
    };
    await fetch(url, fetchOptions);
};

export const createCar = async (data: CarViewParams): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Garage}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };
    await fetch(url, fetchOptions);
};

export const updateCar = async (id: number, data: CarViewParams): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Garage}/${id}`;
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };
    await fetch(url, fetchOptions);
};

export const deleteCar = async (id: number): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Garage}/${id}`;
    const fetchOptions = {
        method: 'DELETE',
    };
    await fetch(url, fetchOptions);
};

export const startEngine = async (id: number): Promise<StartEngineApiResponse> => {
    const controller = new AbortController();
    controllers.set(id, controller);
    const url = `${BASE_URL}/${Endpoint.Engine}?id=${id}&status=${CarStatus.Started}`;
    const fetchOptions = {
        method: 'PATCH',
        signal: controller.signal,
    };
    const res = await fetch(url, fetchOptions);
    return res.json();
};

export const stopEngine = async (id: number): Promise<void> => {
    abort(id);
    const url = `${BASE_URL}/${Endpoint.Engine}?id=${id}&status=${CarStatus.Stopped}`;
    const fetchOptions = {
        method: 'PATCH',
    };
    await fetch(url, fetchOptions);
};

export const setDriveMode = async (id: number): Promise<SetDriveModeApiResponse | void> => {
    const controller = new AbortController();
    controllers.set(id, controller);
    const url = `${BASE_URL}/${Endpoint.Engine}?id=${id}&status=${CarStatus.Drive}`;
    const fetchOptions = {
        method: 'PATCH',
        signal: controller.signal,
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        return Promise.reject();
    }
    return res.json();
};
