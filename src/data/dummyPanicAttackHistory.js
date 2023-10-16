export const initData = Array.from({ length: 4 * 7 }, (_, index) => ({
    date: new Date(1970, 0, 1 + index).toISOString(),
    value: Math.floor(Math.random() * 10)
}));
