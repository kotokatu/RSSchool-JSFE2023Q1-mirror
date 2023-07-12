const BASE_URL = 'http://127.0.0.1:3000';

export interface CarConfig {
    name: string;
    color: string;
    id: number;
}

export type CarParams = Omit<CarConfig, 'id'>;

export interface GetCarsResponse {
    carsCount: number;
    cars: CarConfig[];
}

export const getCars = async (pageNum: number, limit: number): Promise<GetCarsResponse> => {
    const url = `${BASE_URL}/garage?_page=${pageNum}&_limit=${limit}`;
    const res = await fetch(url);
    const cars = await res.json();
    const carsCount = Number(res.headers.get('X-Total-Count'));
    return { carsCount, cars };
};

export const getCarsCount = async () => {
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
