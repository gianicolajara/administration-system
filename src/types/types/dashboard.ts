import { IconType } from "react-icons";

export type MenuItemDashboard = {
  id: number;
  title: string;
  url?: string;
  subitems?: Array<MenuItemDashboard>;
  originalTitle?: string;
  Icon: IconType;
};

export type BillsType = {
  id: number;
  name: string;
};
