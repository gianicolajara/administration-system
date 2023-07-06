import type { MenuItemDashboard } from "../../../../types/types/dashboard";

export const menuItems: Array<MenuItemDashboard> = [
  {
    id: 1,
    title: "Facturas",
    url: "#",
    subitems: [
      {
        id: 2,
        title: "Crear",
        url: "/dashboard/bills/create",
      },
      {
        id: 3,
        title: "Ver",
        url: "/dashboard/bills/bills",
      },
    ],
  },
];
