import type { MenuItemDashboard } from "@/types/types/dashboard";
import { AiOutlineUser } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { BsNutFill } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { FaExchangeAlt } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";

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
        id: 1,
        title: "Monedas",
        url: "/dashboard/configuration/currency",
        Icon: BiMoney,
      },
      {
        id: 2,
        title: "Cambios",
        url: "/dashboard/configuration/changes",
        Icon: FaExchangeAlt,
      },
      {
        id: 3,
        title: "Generales",
        url: "/dashboard/configuration/generals",
        Icon: GrConfigure,
      },
    ],
  },
];
