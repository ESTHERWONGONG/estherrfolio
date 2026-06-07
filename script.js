const cursor = document.getElementById("cursor");
const HOVER_SELECTOR = "a, button, [data-cursor-hover]";

let isPointerDown = false;
let isOverInteractive = false;

function setCursorState(state) {
  cursor.classList.remove("cursor-default", "cursor-hover", "cursor-click");
  cursor.classList.add(`cursor-${state}`);
}

function updateCursorState() {
  if (isPointerDown) {
    setCursorState("click");
  } else if (isOverInteractive) {
    setCursorState("hover");
  } else {
    setCursorState("default");
  }
}

function checkInteractiveTarget(target) {
  return target instanceof Element && Boolean(target.closest(HOVER_SELECTOR));
}

document.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  isOverInteractive = checkInteractiveTarget(event.target);
  updateCursorState();
});

document.addEventListener("pointerdown", () => {
  isPointerDown = true;
  updateCursorState();
});

document.addEventListener("pointerup", () => {
  isPointerDown = false;
  updateCursorState();
});

document.addEventListener("pointerleave", (event) => {
  if (event.target === document.documentElement) {
    cursor.style.opacity = "0";
  }
});

document.addEventListener("pointerenter", () => {
  cursor.style.opacity = "1";
});

setCursorState("default");
