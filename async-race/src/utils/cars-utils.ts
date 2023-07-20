import { CarViewParams, createCar } from './api-utils';
import { getRandomNumber } from './utils';

export const CAR_MODELS = [
    'Classic',
    'Corolla',
    'Beetle',
    'Falcon',
    'Golf',
    'Uno',
    'Impala',
    'Prius',
    'F-Series',
    'Camry',
    'Granta',
    'Solaris',
    'Rio',
    'Duster',
    'Sportage',
    'RAV4',
    'CX-5',
];

export const CAR_MAKES = [
    'Ford',
    'Lada',
    'Volkswagen',
    'Toyota',
    'Renault',
    'Fiat',
    'Volvo',
    'BMW',
    'Mercedes',
    'Audi',
    'Honda',
    'Jeep',
    'Mazda',
    'Chevrolet',
    'Hyundai',
    'Kia',
];

const RANDOM_CARS_QUANTITY = 100;

const generateRandomCarName = (): string => {
    const randomMake = CAR_MAKES[getRandomNumber(CAR_MAKES.length)];
    const randomModel = CAR_MODELS[getRandomNumber(CAR_MODELS.length)];
    return `${randomMake} ${randomModel}`;
};

const generateRandomCarColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const createRandomCarsParams = (): CarViewParams[] => {
    const carsParams: CarViewParams[] = Array(RANDOM_CARS_QUANTITY).fill('');
    return carsParams.map(() => ({
        name: generateRandomCarName(),
        color: generateRandomCarColor(),
    }));
};

export const generateCars = async (carParamsData: CarViewParams[] | null): Promise<void> => {
    if (carParamsData) {
        await Promise.all(carParamsData.map((carParams) => createCar(carParams)));
    }
};
