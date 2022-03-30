const digits = document.querySelectorAll('.flip-clock-container .flip-clock .digit');

function SetTimer() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 9, 17, 50, 55);

    const timeRemaining = futureDate.getTime() - currentDate.getTime();

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;

    const dayTimer = Math.floor(timeRemaining / oneDay);
    const hourTimer = Math.floor((timeRemaining % oneDay) / oneHour);
    const minuteTimer = Math.floor((timeRemaining % oneHour) / oneMinute);
    const secondTimer = Math.floor((timeRemaining % oneMinute) / oneSecond);


    const Timer = {
      beforeHtml : FormatTimer([dayTimer + 1, hourTimer + 1, minuteTimer + 1, secondTimer + 1]),
      afterHtml: FormatTimer([dayTimer, hourTimer, minuteTimer, secondTimer])
    };

    return Timer;
};

function FormatTimer(array) {
  return array.map(value => value < 10 ? `0${value}`: `${value}`);
}


function LoadTimer() {
  const countdown = SetTimer();

  digits.forEach((digit, index) => {
    let card = digit.querySelector('.card');
    let cardFront = card.querySelector('.card-face-front');
    let cardBack = card.querySelector('.card-face-back');


    if (!digit.dataset.digitBefore) {
      digit.dataset.digitBefore = countdown.beforeHtml[index];
      cardFront.textContent = digit.dataset.digitBefore;
      digit.dataset.digitAfter = countdown.afterHtml[index];
      cardBack.textContent = digit.dataset.digitAfter;
    } else if (digit.dataset.digitBefore != countdown.beforeHtml[index]) {
      card.addEventListener('transitionend', function () {
        digit.dataset.digitBefore = countdown.beforeHtml[index];
        cardFront.textContent = digit.dataset.digitBefore;

        let cardClone = card.cloneNode(true);
        cardClone.classList.remove('flipped');
        digit.replaceChild(cardClone, card);
        cardBack = cardClone.querySelector('.card-face-back');

        digit.dataset.digitAfter = countdown.afterHtml[index];
        cardBack.textContent = digit.dataset.digitAfter;
      }, { once: true });

      if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
      }
    }

  });
};

setInterval(LoadTimer, 1000);
LoadTimer();



