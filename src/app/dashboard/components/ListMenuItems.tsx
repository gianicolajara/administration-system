"use client";
import { MenuItemDashboard } from "@/types/types/dashboard";
import { useState } from "react";
import MenuItem from "./MenuItem";

type Props = {
  listItems: Array<MenuItemDashboard>;
};

const ListMenuItems = ({ listItems }: Props) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleActiveItem = (newActiveItem: number) => {
    if (activeItem !== newActiveItem) setActiveItem(newActiveItem);
  };

  return (
    <ul className="flex flex-col">
      {listItems.map((item) => (
        <MenuItem
          item={item}
          handleActiveItem={handleActiveItem}
          activeItem={activeItem}
          key={item.id}
        />
      ))}
    </ul>
  );
};

export default ListMenuItems;
