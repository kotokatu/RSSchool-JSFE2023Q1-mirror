const BASE_URL = 'http://127.0.0.1:3000';

export interface CarConfig {
    name: string;
    color: string;
    id: number;
}

export interface GetCarsValue {
    carsCount: number;
    cars: CarConfig[];
}

export const getCars = async (pageNum: number, limit: number): Promise<GetCarsValue> => {
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

export const getWinnersCount = async () => {
    const url = `${BASE_URL}/winners?_limit=0`;
    const res = await fetch(url);
    return Number(res.headers.get('X-Total-Count'));
};
