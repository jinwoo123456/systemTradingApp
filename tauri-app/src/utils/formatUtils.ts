export function formatPhone(value: string): string {
  const onlyNums = value.replace(/\D/g, "");
  if (onlyNums.length < 4) {
    return onlyNums;
  } else if (onlyNums.length < 7) {
    return onlyNums.replace(/(\d{3})(\d{1,3})/, "$1-$2");
  } else if (onlyNums.length < 11) {
    return onlyNums.replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3");
  } else {
    return onlyNums.substring(0, 11).replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
  }
}

export function removeDash(input: string): string {
  return input.replace(/-/g, "");
}