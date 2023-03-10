function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  const vacancyButtons = Array.from(
    document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]')
  );
  const vacancyLinks = Array.from(
    document.querySelectorAll('[data-qa="serp-item__title"]')
  ).map((element) => element.href.split("?")[0]);

  for (let i = 0; i < vacancyButtons.length; i++) {
    const letterData = `Шаблон сопроводительного письма, можно использовать ${vacancyLinks[i]}`;

    vacancyButtons[i].click();
    await delay(1000);

    let attachLetterButton;
    do {
      attachLetterButton = document.querySelector(
        '[data-qa="vacancy-response-letter-toggle"]'
      );
    } while (
      !document.querySelector('[data-qa="vacancy-response-letter-toggle"]')
    );

    attachLetterButton.click();
    await delay(1000);

    let letterTextarea;
    do {
      letterTextarea = document.getElementsByClassName(
        "bloko-textarea bloko-textarea_sized-rows"
      )[0];
    } while (
      !document.getElementsByClassName(
        "bloko-textarea bloko-textarea_sized-rows"
      )[0]
    );

    letterTextarea.value = letterData;
    await delay(1000);

    let submitLetterButton;
    do {
      submitLetterButton = document.querySelector(
        '[data-qa="vacancy-response-letter-submit"]'
      );
    } while (
      !document.querySelector('[data-qa="vacancy-response-letter-submit"]')
    );
    submitLetterButton.click();
    await delay(1000);
  }
}

(async function addInitButton() {
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
    div.appendChild(link);

    return div;
  }

  await delay(1000);

  const navLinks = document.querySelectorAll(
    ".supernova-navi-item.supernova-navi-item_lvl-2.supernova-navi-item_no-mobile"
  );
  const initButton = createButton("Отправить отклики");
  navLinks[2].append(initButton);
})();
