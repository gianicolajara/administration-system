"use client";
import { MenuItemDashboard } from "../../../../types/types/dashboard";
import MenuItem from "./MenuItem";

type Props = {
  listItems: Array<MenuItemDashboard>;
};

const ListMenuItems = ({ listItems }: Props) => {
  return (
    <>
      {listItems.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </>
  );
};

export default ListMenuItems;
