export const createSVG = (path: string, classNames: string[]): SVGSVGElement => {
    const svgElem: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useElem: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttributeNS(null, `href`, path);
    svgElem.appendChild(useElem);
    classNames.forEach((className) => svgElem.classList.add(className));
    return svgElem;
};

export const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

export const formatTime = (timeInMs: number): string => (timeInMs / 1000).toFixed(2);

export const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
