import type { MenuItemDashboard } from "../../../../types/types/dashboard";

export const menuItems: Array<MenuItemDashboard> = [
  {
    id: 1,
    title: "Facturas",
    originalTitle: "bills",
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
  {
    id: 2,
    title: "Usuarios",
    url: "/dashboard/users",
    originalTitle: "users",
  },
  {
    id: 3,
    title: "Configuración",
    url: "/dashboard/configuration",
    originalTitle: "configuration",
    subitems: [
      {
        id: 4,
        title: "Monedas",
        url: "/dashboard/configuration/currency",
      },
      {
        id: 5,
        title: "Cambios",
        url: "/dashboard/configuration/changes",
      },
    ],
  },
];
