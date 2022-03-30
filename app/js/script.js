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


    // const Timer = {
    //   beforeHtml : FormatTimer([dayTimer + 1, hourTimer + 1, minuteTimer + 1, secondTimer + 1]),
    //   afterHtml: FormatTimer()
    // };

    return [dayTimer, hourTimer, minuteTimer, secondTimer];
};


function LoadTimer() {
  const countdown = SetTimer();

  digits.forEach((digit, index) => {
    let card = digit.querySelector('.card');
    let cardFront = card.querySelector('.card-face-front');
    let cardBack = card.querySelector('.card-face-back');

    const beforeHtml = countdown[index];
    const afterHtml = +countdown[index] + 1;


    if (!digit.dataset.digitBefore) {
      digit.dataset.digitBefore = FormatTimer(afterHtml);
      cardFront.textContent = digit.dataset.digitBefore;
      digit.dataset.digitAfter = FormatTimer(beforeHtml);
      cardBack.textContent = digit.dataset.digitAfter;
    } else if (digit.dataset.digitBefore != FormatTimer(afterHtml)) {
      
      card.addEventListener('transitionend', function() {
        digit.dataset.digitBefore = FormatTimer(afterHtml);
        cardFront.textContent = digit.dataset.digitBefore;

        const cardClone = card.cloneNode(true);
        cardClone.classList.remove('flipped');
        card.replaceWith(cardClone);
        cardBack = cardClone.querySelector('.card-face-back');

        digit.dataset.digitAfter = FormatTimer(beforeHtml);
        cardBack.textContent = digit.dataset.digitAfter;
      });

      if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
      }
    }

  });
};

function FormatTimer(value) {
  return value < 10 ? (`0${value}`).slice(-2): `${value}`;
}

setInterval(LoadTimer, 1000);
LoadTimer();



