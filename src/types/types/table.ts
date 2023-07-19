import { ReactNode } from "react";

export type Head = {
  name: string;
  id: string | number;
};

export type SubItemData = {
  subItem: string | number | ReactNode;
};

export type BodyData = {
  id: string | number;
  filter?: string;
  subData: Array<SubItemData>;
};
