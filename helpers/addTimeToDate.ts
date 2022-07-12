export const addTimeToDate = (date: string, minutes: number): Date => {
    const timeInMilliseconds = minutes * 60 * 1000;
    const dateMod = new Date(date);
    dateMod.setTime(dateMod.getTime() + (timeInMilliseconds));
    return dateMod;
};
