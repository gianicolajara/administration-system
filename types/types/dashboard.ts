export type MenuItemDashboard = {
  id: number;
  title: string;
  url: string;
  subitems?: Array<MenuItemDashboard>;
};

export type BillsType = {
  id: number;
  name: string;
};

export type FormDataCreateBill = {
  billType: string;
  assets: string;
  billNumber: string;
  date: string;
  amountMoney: number;
  typeOfCurrency: string;
  report: string;
};
