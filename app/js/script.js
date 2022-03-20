const digits = document.querySelectorAll('.flip-clock-container .flip-clock .digit');

const setTimer = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 9, 16, 43, 41);

    const timeRemaining = futureDate.getTime() - currentDate.getTime();

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;

    const dayTimer = Math.floor(timeRemaining / oneDay);
    const hourTimer = Math.floor((timeRemaining % oneDay) / oneHour);
    const minuteTimer = Math.floor((timeRemaining % oneHour) / oneMinute);
    const secondTimer = Math.floor((timeRemaining % oneMinute) / oneSecond);

    return [dayTimer, hourTimer, minuteTimer, secondTimer]
};


const formatTimer = value => {
    return value < 10 ? `0${value}` : value;
};

const displayTimer = () => {
    const timer = setTimer();

    digits.forEach((digit, index) => {
        const card = digit.querySelector('.card');

        digit.dataset.digitBefore = formatTimer(timer[index]);
        digit.dataset.digitAfter = formatTimer(timer[index]);

        card.children[0].textContent = formatTimer(timer[index]);
        card.children[1].textContent = formatTimer(timer[index]);
    });

};

let countdown = setInterval(displayTimer, 1000);
displayTimer();

