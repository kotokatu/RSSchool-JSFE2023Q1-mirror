export type Store = {
    carsCount: number;
    page: number;
    limit: number;
};

export const garageStore = {
    carsCount: 0,
    page: 1,
    limit: 7,
};

export const winnersStore = {
    carsCount: 0,
    page: 1,
    limit: 10,
};
