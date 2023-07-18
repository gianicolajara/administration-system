import type { MenuItemDashboard } from "@/types/types/dashboard";
import { AiOutlineUser } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { BsNutFill } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { FaExchangeAlt } from "react-icons/fa";

export const menuItems: Array<MenuItemDashboard> = [
  {
    id: 1,
    title: "Facturas",
    originalTitle: "bills",
    url: "/dashboard/bills",
    Icon: CiMoneyBill,
  },
  {
    id: 2,
    title: "Usuarios",
    url: "/dashboard/users",
    originalTitle: "users",
    Icon: AiOutlineUser,
  },
  {
    id: 3,
    title: "Configuración",
    originalTitle: "configuration",
    Icon: BsNutFill,
    subitems: [
      {
        id: 4,
        title: "Monedas",
        url: "/dashboard/configuration/currency",
        Icon: BiMoney,
      },
      {
        id: 5,
        title: "Cambios",
        url: "/dashboard/configuration/changes",
        Icon: FaExchangeAlt,
      },
    ],
  },
];
