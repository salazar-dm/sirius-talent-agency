export const convertDate = (date: [number, number, number]) => {
    const dateDay = date[2];
    const dateMonth = new Date(0, date[1] - 1).toLocaleString('default', { month: 'long' });
    const dateYear = date[0];
    return `${dateMonth} ${dateDay}, ${dateYear}`;
}