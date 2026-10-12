import "./portfolio";
const isEnglish = document.documentElement.lang === "en";
const formFeedback = {
  ru: {
    reservation:
      "Форма заполнена. В демонстрации стол не бронируется, данные никуда не отправлены.",
    booking:
      "Форма заполнена. В демонстрации запись не создаётся, данные никуда не отправлены.",
    consultation: "Форма заполнена. Это демонстрация: заявка не отправлена.",
  },
  en: {
    reservation:
      "Form complete. This is a demo: no table was reserved and your details were not sent.",
    booking:
      "Form complete. This is a demo: no appointment was created and your details were not sent.",
    consultation: "Form complete. This is a demo: your inquiry was not sent.",
  },
};

document
  .querySelectorAll<HTMLFormElement>("[data-demo-form]")
  .forEach((form) => {
    const date = form.querySelector<HTMLInputElement>("input[type=date]");
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    if (date) date.min = today;
    const result = form.querySelector<HTMLParagraphElement>(".form-result");
    const clearResult = () => {
      if (result) result.hidden = true;
    };
    form.addEventListener("input", clearResult);
    form.addEventListener("change", clearResult);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity() || !result) return;
      const messages = formFeedback[isEnglish ? "en" : "ru"];
      const kind = form.dataset.kind;
      result.textContent =
        messages[
          kind === "reservation" || kind === "booking" ? kind : "consultation"
        ];
      result.hidden = false;
    });
    const fields = form.querySelector("fieldset");
    if (fields) fields.disabled = false;
  });
