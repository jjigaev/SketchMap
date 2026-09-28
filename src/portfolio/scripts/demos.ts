import "./portfolio";

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
      result.textContent =
        form.dataset.kind === "reservation"
          ? "Форма заполнена. В демонстрации стол не бронируется, данные никуда не отправлены."
          : form.dataset.kind === "booking"
            ? "Форма заполнена. В демонстрации запись не создаётся, данные никуда не отправлены."
            : "Форма заполнена. Это демонстрация: заявка не отправлена.";
      result.hidden = false;
    });
    const fields = form.querySelector("fieldset");
    if (fields) fields.disabled = false;
  });
