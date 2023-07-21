// Function to calculate time left
export function getTimeLeft(timestamp: any) {
    const now = new Date().getTime();
    const timeRemaining = timestamp - now;

    if (timeRemaining <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;

    const days = Math.floor(timeRemaining / oneDay);
    const hours = Math.floor((timeRemaining % oneDay) / oneHour);
    const minutes = Math.floor((timeRemaining % oneHour) / oneMinute);
    const seconds = Math.floor((timeRemaining % oneMinute) / oneSecond);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}