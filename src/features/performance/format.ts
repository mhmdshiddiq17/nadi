const currencyFormatter =
  new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  );

const compactCurrencyFormatter =
  new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      notation: "compact",
      maximumFractionDigits: 1,
    },
  );

const percentFormatter =
  new Intl.NumberFormat(
    "id-ID",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  );

export function formatIDR(
  amount: number,
) {
  return currencyFormatter.format(
    amount,
  );
}

export function formatIDRCompact(
  amount: number,
) {
  return compactCurrencyFormatter.format(
    amount,
  );
}

export function formatPercent(
  value: number,
) {
  return `${percentFormatter.format(
    value,
  )}%`;
}