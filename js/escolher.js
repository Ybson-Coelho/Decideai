const form = document.querySelector(".choice-form");

const choiceName = document.querySelector("#choice-name");
const optionInput = document.querySelector("#option-input");
const addOptionButton = document.querySelector("#add-option");

const optionsList = document.querySelector("#options-list");
const optionsCount = document.querySelector("#options-count");
const emptyState = document.querySelector("#empty-state");

const drawButton = document.querySelector("#draw-button");

const result = document.querySelector("#result");
const resultText = document.querySelector("#result-text");

const drawAgainButton = document.querySelector("#draw-again");
const newChoiceButton = document.querySelector("#new-choice");

const options = [];

function addOption() {
  const value = optionInput.value.trim();

  if (!value) {
    optionInput.focus();
    return;
  }

  options.push(value);
  optionInput.value = "";

  renderOptions();
  optionInput.focus();
}

function removeOption(index) {
  options.splice(index, 1);

  renderOptions();
}

function renderOptions() {
  optionsList.innerHTML = "";

  if (options.length === 0) {
    optionsList.appendChild(emptyState);
  } else {
    options.forEach((option, index) => {
      const item = document.createElement("div");

      item.className = "option-item";

      const name = document.createElement("span");
      name.className = "option-name";
      name.textContent = option;

      const removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.className = "remove-option";
      removeButton.setAttribute("aria-label", `Remover ${option}`);
      removeButton.textContent = "×";

      removeButton.addEventListener("click", () => {
        removeOption(index);
      });

      item.append(name, removeButton);
      optionsList.appendChild(item);
    });
  }

  updateOptionsCount();
  updateDrawButton();
}

function updateOptionsCount() {
  const count = options.length;

  if (count === 1) {
    optionsCount.textContent = "1 opção";
    return;
  }

  optionsCount.textContent = `${count} opções`;
}

function updateDrawButton() {
  drawButton.disabled = options.length < 2;
}

function drawOption() {
  if (options.length < 2) {
    return;
  }

  const index = Math.floor(Math.random() * options.length);

  resultText.textContent = options[index];
  result.hidden = false;

  result.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

addOptionButton.addEventListener("click", addOption);

optionInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  addOption();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  drawOption();
});

drawAgainButton.addEventListener("click", drawOption);

newChoiceButton.addEventListener("click", () => {
  options.length = 0;

  choiceName.value = "";
  optionInput.value = "";

  result.hidden = true;

  renderOptions();

  choiceName.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

renderOptions();
