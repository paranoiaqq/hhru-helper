function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  const vacancyButtons = document.querySelectorAll(
    '[data-qa="vacancy-serp__vacancy_response"]'
  );
  const vacancyLinks = document
    .querySelector('[data-qa="serp-item__title"]')
    .map((element) => element.href.split("?")[0]);

  for (let i = 0; i < vacancyButtons.length; i++) {
    const letterData = `Здравствуйте, меня зовут Никита, я Frontend-разработчик с 2+ годами опыта. Пишу на TypeScript, React, Redux.

  Меня заинтересовала ваша вакансия: ${vacancyLinks[i]}

  Уверен, что смогу усилить вашу команду. У меня есть релевантный опыт разработки SPA на React.

  Если у вас есть какие-то вопросы, с удовольствием на них отвечу. Буду рад любому фидбеку.
  Мой телеграм для связи: t.me/quinckyyy`;

    vacancyButtons[i].click();
    await delay(1000);

    const attachLetterButton = document.querySelector(
      '[data-qa="vacancy-response-letter-toggle"]'
    );
    attachLetterButton.click();
    await delay(1000);

    const letterTextarea = document.getElementsByClassName(
      "bloko-textarea bloko-textarea_sized-rows"
    )[0];
    letterTextarea.value = letterData;
    await delay(1000);

    const submitLetterButton = document.querySelector(
      '[data-qa="vacancy-response-letter-submit"]'
    );
    submitLetterButton.click();
  }
}

async function addInitButton() {
  function createButton(title) {
    const div = document.createElement("div");
    div.classList.add(
      "supernova-navi-item",
      "supernova-navi-item_lvl-2",
      "supernova-navi-item_no-mobile"
    );

    const styleDiv = document.createElement("div");
    styleDiv.classList.add("supernova-navi-underline");
    styleDiv.innerText = title;

    const link = document.createElement("a");
    link.dataset.qa = "mainmenu_vacancyResponses";
    link.classList.add("supernova-link");
    link.addEventListener("click", init);
    link.innerText = title;
    link.append(styleDiv);

    return div;
  }

  await delay(1000);

  const navLinks = document.querySelectorAll(
    ".supernova-navi-item.supernova-navi-item_lvl-2.supernova-navi-item_no-mobile"
  );
  const initButton = createButton("Отправить отклики");
  navLinks[2].append(initButton);
}

addInitButton();
