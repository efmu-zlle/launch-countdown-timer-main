const digits = document.querySelectorAll(
  ".flip-clock-container .flip-clock .digit"
);

const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 6, 45, 10, 50);

window.addEventListener("DOMContentLoaded", function () {
  LoadTimer();
});

function SetTimer() {
  const currentDate = new Date().getTime();

  const timeRemaining = futureDate - currentDate;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  const dayTimer = Math.floor(timeRemaining / oneDay);
  const hourTimer = Math.floor((timeRemaining % oneDay) / oneHour);
  const minuteTimer = Math.floor((timeRemaining % oneHour) / oneMinute);
  const secondTimer = Math.floor((timeRemaining % oneMinute) / oneSecond);

  return [dayTimer, hourTimer, minuteTimer, secondTimer];
}

function FormatTimer(value) {
  return value >= 0 && value < 10 ? (value = `0${value}`) : value;
}

function LoadTimer() {
  const countdown = SetTimer();

  digits.forEach((digit, index) => {
    let card = digit.querySelector(".card");
    let cardFront = card.querySelector(".card-face-front");
    let cardBack = card.querySelector(".card-face-back");

    const beforeHtml = +countdown[index] + 1;
    const afterHtml = countdown[index];

    if (!digit.dataset.digitBefore) {
      digit.dataset.digitBefore = FormatTimer(beforeHtml);
      cardFront.textContent = digit.dataset.digitBefore;

      digit.dataset.digitAfter = FormatTimer(afterHtml);
      cardBack.textContent = digit.dataset.digitAfter;
    } else if (digit.dataset.digitBefore != FormatTimer(beforeHtml)) {
      card.addEventListener(
        "transitionend",
        () => {
          digit.dataset.digitBefore = FormatTimer(beforeHtml);
          cardFront.textContent = digit.dataset.digitBefore;

          const cardClone = card.cloneNode(true);
          cardClone.classList.remove("flipped");
          card.replaceWith(cardClone);
          cardBack = cardClone.querySelector(".card-face-back");
          cardFront = cardClone.querySelector(".card-face-front");

          digit.dataset.digitAfter = FormatTimer(afterHtml);
          cardBack.textContent = digit.dataset.digitAfter;
        },
        { once: true }
      );

      if (!card.classList.contains("flipped")) {
        card.classList.add("flipped");
      }
    }
  });
}

setInterval(() => {
  LoadTimer();
}, 1000);
