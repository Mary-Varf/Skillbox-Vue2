export default function quantityNumberAndWord(value) {
  let str = 'товар';
  const secNum = value.toString().slice(-1);
  if ((value >= 2 && value <= 4) || (value > 20 && secNum >= 2 && secNum <= 4)) {
    str = 'товара';
  } else if ((value >= 5 && value <= 20) || (value > 20 && secNum >= 5 && secNum <= 9) || (value % 10 === 0 && value !== 20)) {
    str = 'товаров';
  }
  return `${value} ${str}`;
}
