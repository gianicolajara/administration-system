export const formatDateYYYYmmdd = (date: Date) => {
  const day = Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const month = Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
  const year = Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  return `${year}-${month}-${day}`;
};

export const stringDateToYearMonthDayNumbers = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return {
    year,
    month,
    day,
  };
};
