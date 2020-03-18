export function currencyFormat(num, withCurrencySymbol = true) {
  if (!num) return '0';
  let value = num
    .toString()
    .replace('.', ',') // replace decimal point character with ,
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // use . as a separator

  if (withCurrencySymbol) return `Rp. ${value}`;
  else return value;
}
