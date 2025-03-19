let rootStyles = getComputedStyle(document.querySelector(':root')!);
rootStyles.getPropertyValue('--light-c1');

const cssColorVars = [
    '--light-c ',
    '--light-c1',
    '--light-c2',
    '--gray-c1',
    '--gray-c2',
    '--dark-c',
    '--blue-c1',
    '--blue-c2',
    '--sky-c1',
    '--red-c1',
]

export const cssColors = cssColorVars.reduce((acc: any, cssColorVar: any) => {
    acc[cssColorVar] = rootStyles.getPropertyValue(cssColorVar).trim();
    return acc
}, {});