export const calcTotal = (array) => {
  let total = array.reduce((acc, el) => {
    return acc + el.qty * el.price;
  }, 0);

  return total;
};

export const calcTax = (array) => {
  let total = calcTotal(array);
  let tax = 2 * (total / 100);
  return tax;
};

export const GrandTotal = (array) => {
  let total = calcTotal(array);
  let tax = calcTax(array);

  return total + tax;
};
