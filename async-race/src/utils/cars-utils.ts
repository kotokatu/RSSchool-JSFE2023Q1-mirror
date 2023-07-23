import { CarViewParams, createCar } from './api-utils';
import { getRandomNumber } from './utils';

const CAR_MODELS = [
    'Storm',
    'Liberty',
    'Mirage',
    'Falcon',
    'Torch',
    'Dragon',
    'Stardust',
    'Tracer',
    'Ranger',
    'Moonlight',
    'Dawn',
    'Aurora',
    'Vulture',
    'Blast',
    'Trailblazer',
    'Origin',
    'Blitz',
];

const CAR_MAKES = [
    'Ford',
    'Jaguar',
    'Volkswagen',
    'Porsche',
    'Renault',
    'Volvo',
    'BMW',
    'Mercedes',
    'Jeep',
    'Chevrolet',
];

const RANDOM_CARS_QUANTITY = 100;

const generateRandomCarName = (): string => {
    const randomMake = CAR_MAKES[getRandomNumber(CAR_MAKES.length)];
    const randomModel = CAR_MODELS[getRandomNumber(CAR_MODELS.length)];
    return `${randomMake} ${randomModel}`;
};

const generateRandomCarColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const createRandomCarsParams = (): CarViewParams[] =>
    Array(RANDOM_CARS_QUANTITY)
        .fill('')
        .map(() => ({
            name: generateRandomCarName(),
            color: generateRandomCarColor(),
        }));

export const generateCars = async (carParamsData: CarViewParams[] | null): Promise<void> => {
    if (carParamsData) {
        await Promise.all(carParamsData.map((carParams) => createCar(carParams)));
    }
};
