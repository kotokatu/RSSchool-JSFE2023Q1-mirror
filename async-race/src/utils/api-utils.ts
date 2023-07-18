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

export interface GetCarApiResponse {
    name: string;
    color: string;
    id: number;
}

export type CarParams = Omit<GetCarApiResponse, 'id'>;

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
    carsCount: number;
    cars: GetWinnerApiResponse[];
}

const controllers = new Map();

const abort = (id: number): void => {
    const controller: AbortController = controllers.get(id);
    controller?.abort();
    controllers.delete(id);
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
    limit: number
): Promise<GetWinnersApiResponse> => {
    const url = `${BASE_URL}/${Endpoint.Winners}?_page=${pageNum}&_limit=${limit}`;
    const res = await fetch(url);
    const cars = await res.json();
    const carsCount = Number(res.headers.get('X-Total-Count'));
    return { carsCount, cars };
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
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
    }
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
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
    }
};

export const createCar = async (data: CarParams): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Garage}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
    }
};

export const updateCar = async (id: number, data: CarParams): Promise<void> => {
    const url = `${BASE_URL}/${Endpoint.Garage}/${id}`;
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
    }
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
    if (!res.ok) {
        const errorMessage = await res.text();
        return Promise.reject(errorMessage);
    }
    return res.json();
};

export const stopEngine = async (id: number): Promise<void> => {
    abort(id);
    const url = `${BASE_URL}/${Endpoint.Engine}?id=${id}&status=${CarStatus.Stopped}`;
    const fetchOptions = {
        method: 'PATCH',
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
    }
};

export const setDriveMode = async (id: number): Promise<SetDriveModeApiResponse> => {
    const controller = new AbortController();
    controllers.set(id, controller);
    const url = `${BASE_URL}/${Endpoint.Engine}?id=${id}&status=${CarStatus.Drive}`;
    const fetchOptions = {
        method: 'PATCH',
        signal: controller.signal,
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        return Promise.reject(errorMessage);
    }
    return res.json();
};
