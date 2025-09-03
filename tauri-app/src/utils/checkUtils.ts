export function checkEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function checkdPhone(phone: string): boolean {
  const phoneRegex = /^(01[0-9]-\d{3,4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
  return phoneRegex.test(phone);
}

export function checkKorEngNoSpace(value: string): boolean {
  // 영문 + 한글 음절 + 한글 자모(초/중성) 허용
  const korEngRegex = /^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
  return korEngRegex.test(value);
}

// 사용자가 혼동할 수 있는 이름 별칭 (공백 미허용)
export const checkKorEngNoSpaceAlias = checkKorEngNoSpace;

export function checkKorEngWithSpace(value: string): boolean {
  // 영문 + 한글 음절 + 자모 + 공백 허용
  const korEngSpaceRegex = /^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ ]+$/;
  return korEngSpaceRegex.test(value);
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

export function onlyKorEngKeydown<T extends {
  key?: string;
  code?: string;
  keyCode?: number;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
  preventDefault: () => void;
}>(e: T) {
  const k: string | undefined = (e as any).key;
  const code: string | undefined = (e as any).code;
  const keyCode: number | undefined = (e as any).keyCode;
  const composing = Boolean((e as any).isComposing) || k === "Process";

  if (composing) return;

  if ((e as any).ctrlKey || (e as any).metaKey || (e as any).altKey) return;

  const allowKeys = new Set([
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Tab",
    "Enter",
    "Escape",
    "Insert",
  ]);
  if (k && allowKeys.has(k)) return;

  if (k === " " || code === "Space" || keyCode === 32) {
    e.preventDefault();
    return;
  }

  if (k && k.length === 1) {
    const ok = /^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]$/.test(k);
    if (!ok) e.preventDefault();
  }
}

export function sanitizeKorEngInput(el: HTMLInputElement | HTMLTextAreaElement) {
  const before = el.value;
  const after = before.replace(/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]+/g, "");
  if (before !== after) el.value = after;
}
