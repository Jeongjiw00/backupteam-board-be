const currencyByCountry = {
  en: {
    format: "en-US",
    currency: "USD",
  },
  kr: {
    format: "kr-KO",
    currency: "KRW",
  },
};

const numberToCurrency = (number, countryCode) => {
  const cur = currencyByCountry[countryCode];
  return new Intl.NumberFormat(cur.format, {
    style: "currency",
    currency: cur.currency,
  }).format(number);
};

const priceToKrwFormat = (price, country) => {
  const countryCode = country || "kr";
  const cur = currencyByCountry[countryCode];
  const priceKrw = new Intl.NumberFormat(cur.format, {
    style: "currency",
    currency: cur.currency,
  }).format(price);

  let tax = (price / 11) * 10;
  tax = Math.round(tax);
  tax = new Intl.NumberFormat(cur.format, {
    style: "currency",
    currency: cur.currency,
  }).format(tax);

  let originalPrice = price / 11;
  originalPrice = new Intl.NumberFormat(cur.format, {
    style: "currency",
    currency: cur.currency,
  }).format(originalPrice);

  return {
    priceKrw,
    tax,
    originalPrice,
  };
};

const price = 100000;
console.log(priceToKrwFormat(price));
