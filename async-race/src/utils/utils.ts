import { CAR_MAKES, CAR_MODELS } from '../constants/constants';

export const createSVG = (path: string): SVGSVGElement => {
    const svgElem: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useElem: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttributeNS(null, `href`, path);
    svgElem.appendChild(useElem);
    return svgElem;
};

const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

export const generateRandomCarName = (): string => {
    const randomMake = CAR_MAKES[getRandomNumber(CAR_MAKES.length)];
    const randomModel = CAR_MODELS[getRandomNumber(CAR_MODELS.length)];
    return `${randomMake} ${randomModel}`;
};

export const generateRandomColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
