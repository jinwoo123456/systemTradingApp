export function checkEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function checkdPhone(phone: string): boolean {
  const phoneRegex = /^(01[0-9]-\d{3,4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
  return phoneRegex.test(phone);
}

export function validateField(
  form: HTMLFormElement,
  field: string,
  message: string,
  isValid?: (input: HTMLInputElement) => boolean    
) {
  const input = form.elements.namedItem(field) as HTMLInputElement | null;
  if (!input) return;

  const group = input.closest(".form-group");
  if (!group) return;
  let hint = group.querySelector<HTMLSpanElement>(".field-hint");
  if (!hint) {
    hint = document.createElement("span");
    hint.className = "field-hint";
    input.insertAdjacentElement("afterend", hint);
  }
  hint.textContent = message;
  const update = () => {
    const defaultOk = input.value.trim() !== "";
    const ok = typeof isValid === "function" ? isValid(input) : defaultOk;
    group.classList.toggle("has-value", input.value.trim().length > 0);
    group.classList.toggle("has-error", !ok);  // ❗에러면 계속 보이게
  };
  update();
  input.focus();
  if (!(input as any)._vfBound) {
    input.addEventListener("input", update);
    input.addEventListener("blur", update);
    (input as any)._vfBound = true;
  }
}


// React SyntheticEvent와 일반 KeyboardEvent 모두 지원하는 헬퍼
export function noSpace<T extends { key?: string; code?: string; keyCode?: number; preventDefault: () => void }>(
  e: T
) {
  const key = (e as any).key;
  const code = (e as any).code;
  const keyCode = (e as any).keyCode;
  if (key === " " || code === "Space" || keyCode === 32) {
    e.preventDefault();
  }
}
