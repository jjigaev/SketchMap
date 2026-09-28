export {};

const menu = document.querySelector<HTMLButtonElement>(".menu-toggle");
const navigation = document.querySelector<HTMLElement>(".mobile-nav");
function closeMenu(restoreFocus = false) {
  if (!menu || !navigation) return;
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Открыть меню");
  navigation.hidden = true;
  if (restoreFocus) menu.focus();
}
menu?.addEventListener("click", () => {
  if (!navigation) return;
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  navigation.hidden = !open;
});
navigation
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (
    event.target instanceof Node &&
    !navigation?.contains(event.target) &&
    !menu?.contains(event.target)
  )
    closeMenu();
});
window
  .matchMedia("(min-width: 761px)")
  .addEventListener("change", () => closeMenu());

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Content is visible by default, including if JavaScript is disabled or fails.
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  document
    .querySelectorAll(".hero-title-row, .hero-bottom, .hero-reel")
    .forEach((element, index) => {
      element.animate(
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 700,
          delay: index * 100,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "backwards",
        },
      );
    });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((element) => observer.observe(element));
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      observer.disconnect();
      document.getAnimations().forEach((animation) => animation.finish());
    }
  });
}

document
  .querySelectorAll<HTMLElement>("[data-filter-group]")
  .forEach((group) => {
    const buttons = group.querySelectorAll<HTMLButtonElement>("[data-filter]");
    const items = group.querySelectorAll<HTMLElement>("[data-category]");
    const status = group.querySelector<HTMLElement>("[data-filter-status]");
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        const value = button.dataset.filter;
        buttons.forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
        let count = 0;
        items.forEach((item) => {
          item.hidden = value !== "all" && item.dataset.category !== value;
          if (!item.hidden) count++;
        });
        if (status) status.textContent = `Показано: ${count}`;
      }),
    );
  });
