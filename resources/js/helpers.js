import colorLib from '@kurkle/color';

export function formatNumberWithK(number) {
    let numberK = number / 1000;
    let formattedNumber = numberK.toFixed(0);
    formattedNumber = formattedNumber + "K";
    return formattedNumber;
}

export const flattenObjectArray = (obj) => Object.values(obj).reduce((acc, val) => acc.concat(val), []);

export const truncate = (string, maxLength) => string.length > maxLength ? string.slice(0, maxLength) + '...' : string;

const MONTHS = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];

export function months(config) {
    const cfg = config || {};
    const count = cfg.count || 12;
    const section = cfg.section;
    const values = [];
    let i, value;

    for (i = 0; i < count; ++i) {
        value = MONTHS[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
    }

    return values;
}


let _seed = Date.now();

export function srand(seed) {
    _seed = seed;
}

export function rand(min, max) {
    min = min || 0;
    max = max || 0;
    _seed = (_seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
}

export function transparentize(value, opacity) {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
}

export function numbers(config) {
    const cfg = config || {};
    const min = cfg.min || 0;
    const max = cfg.max || 100;
    const from = [];
    const count = 12;
    const decimals = 2;
    const continuity = 1;
    const dfactor = Math.pow(10, decimals) || 0;
    const data = [];
    let i, value;

    for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + rand(min, max);
        if (rand() <= continuity) {
            data.push(Math.round(dfactor * value) / dfactor);
        } else {
            data.push(null);
        }
    }

    return data;
}

export const CHART_COLORS = {
    red: '#EF4444',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: '#15803D',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

