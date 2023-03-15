export function getText(originText: string, price: number[], scale = 1): string {
  const textArr = originText.trim().split("\n");

  const priceTextPrefix = "【单价】";
  const priceText =
    priceTextPrefix +
    textArr[1]
      .replace(priceTextPrefix, "")
      .split("；")
      .map((item, index) => item + "￥" + Math.ceil(price[index] * scale))
      .join("；");

  textArr[1] = priceText;

  return textArr.join("\n");
}

export function getSaveText(name: string, priceLabel, desc: string): string {
  return [name, priceLabel, desc].join("\n");
}
