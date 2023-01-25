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
  return {
    priceKrw: numberToCurrency(price, countryCode),
    tax: numberToCurrency(Math.round((price / 11) * 10), countryCode),
    originalPrice: numberToCurrency(Math.round(price / 11), countryCode),
  };
};

console.log(priceToKrwFormat(100000, "kr"));
console.log(priceToKrwFormat(100000));
console.log(priceToKrwFormat(100000, "en"));
