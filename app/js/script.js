const digits = document.querySelectorAll('.flip-clock-container .flip-clock .digit');

function SetTimer() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 9, 17, 23, 41);

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

function FormatTimer(value) {
  return value < 10 ? `0${value}` : value; 
}

function LoadTimer() {
  const countdown = SetTimer();

  digits.forEach((digit, index) => {
    let card = digit.querySelector('.card');
  });
};

setInterval(LoadTimer, 1000);
LoadTimer();


