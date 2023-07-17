const BASE_URL = 'http://127.0.0.1:3000';

const controllers = new Map();

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

export const getCars = async (pageNum: number, limit: number): Promise<GetCarsApiResponse> => {
    const url = `${BASE_URL}/garage?_page=${pageNum}&_limit=${limit}`;
    const res = await fetch(url);
    const cars = await res.json();
    const carsCount = Number(res.headers.get('X-Total-Count'));
    return { carsCount, cars };
};

export const getCarsCount = async (): Promise<number> => {
    const url = `${BASE_URL}/garage?_limit=0`;
    const res = await fetch(url);
    return Number(res.headers.get('X-Total-Count'));
};

export const getWinners = async (pageNum: number, limit: number) => {
    const url = `${BASE_URL}/winners?_page=${pageNum}&_limit=${limit}`;
    const res = await fetch(url);
    const cars = await res.json();
    const carsCount = Number(res.headers.get('X-Total-Count'));
    return { carsCount, cars };
};

export const getWinnersCount = async () => {
    const url = `${BASE_URL}/winners?_limit=0`;
    const res = await fetch(url);
    return Number(res.headers.get('X-Total-Count'));
};

export const createCar = async (data: CarParams) => {
    const url = `${BASE_URL}/garage`;
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
    return res.json();
};

export const updateCar = async (id: number, data: CarParams) => {
    const url = `${BASE_URL}/garage/${id}`;
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
    return res.json();
};

export const deleteCar = async (id: number) => {
    const url = `${BASE_URL}/garage/${id}`;
    const fetchOptions = {
        method: 'DELETE',
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
    }
    return res.json();
};

const abort = (id: number) => {
    const controller = controllers.get(id);
    controller.abort();
    controllers.delete(id);
};

export const startEngine = async (id: number): Promise<StartEngineApiResponse> => {
    const controller = new AbortController();
    controllers.set(id, controller);
    const url = `${BASE_URL}/engine?id=${id}&status=started`;
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
    const url = `${BASE_URL}/engine?id=${id}&status=stopped`;
    const fetchOptions = {
        method: 'PATCH',
    };
    await fetch(url, fetchOptions);
};

export const setDriveMode = async (id: number): Promise<SetDriveModeApiResponse> => {
    const controller = new AbortController();
    controllers.set(id, controller);
    const url = `${BASE_URL}/engine?id=${id}&status=drive`;
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
