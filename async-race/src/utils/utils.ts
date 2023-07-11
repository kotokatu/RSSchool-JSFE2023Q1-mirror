// eslint-disable-next-line import/prefer-default-export
export const createSVG = (path: string): SVGSVGElement => {
    const svgElem: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useElem: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttributeNS(null, `href`, path);
    svgElem.appendChild(useElem);
    return svgElem;
};
