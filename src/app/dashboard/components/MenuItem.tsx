"use client";

import P from "@/app/components/P";
import { MenuItemDashboard } from "@/types/types/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

type Props = {
  item: MenuItemDashboard;
  // eslint-disable-next-line no-unused-vars
  handleActiveItem: (newActiveItem: number) => void;
  activeItem: number;
};

const MenuItem = ({ item, handleActiveItem, activeItem }: Props) => {
  const [openItemMenu, setOpenItemMenu] = useState(false);

  const pathname = usePathname();
  const actualPage = pathname?.split("/")[3];
  const actualPrincipalPage = pathname?.split("/")[2];

  useEffect(() => {
    if (activeItem !== item.id) setOpenItemMenu(false);
  }, [activeItem, item.id]);

  return (
    <li
      className={`text-white w-full h-full border-b-2 border-slate-900 transition-all cursor-pointer flex flex-col select-none `}
      onClick={() => handleActiveItem(item.id)}
    >
      {item.url ? (
        <Link href={item.url}>
          <div
            onClick={() => setOpenItemMenu(!openItemMenu)}
            className={`w-full h-full flex justify-center lg:justify-between items-center hover:bg-slate-800 p-3  ${
              actualPrincipalPage ===
              (item.originalTitle as string).toLowerCase()
                ? "bg-slate-800"
                : ""
            }`}
          >
            <item.Icon className="lg:hidden" size={20} color="text-white" />
            <P className="hidden lg:flex">{item.title}</P>
            {item.subitems ? (
              openItemMenu ? (
                <BsArrowUpShort />
              ) : (
                <BsArrowDownShort />
              )
            ) : null}
          </div>
        </Link>
      ) : (
        <div
          onClick={() => setOpenItemMenu(!openItemMenu)}
          className={`w-full h-full flex justify-between items-center hover:bg-slate-800 p-3 ${
            actualPrincipalPage === (item.originalTitle as string).toLowerCase()
              ? "bg-slate-800"
              : ""
          }`}
        >
          <item.Icon className="lg:hidden" size={20} color="text-white" />
          <P className="hidden lg:flex">{item.title}</P>
          {item.subitems ? (
            openItemMenu ? (
              <BsArrowUpShort />
            ) : (
              <BsArrowDownShort />
            )
          ) : null}
        </div>
      )}
      {item.subitems && (
        <ul
          className={`flex flex-col transition-all bg-neutral-950/50 ${
            openItemMenu ? "flex" : "hidden"
          }`}
        >
          {item.subitems.map((subItems) => (
            <Link key={subItems.id} href={subItems.url as string}>
              <li
                className={`text-white py-1 px-3 w-full border-t-2 border-slate-900 hover:bg-slate-900 transition-all cursor-pointer flex justify-center ${
                  actualPage ===
                  (subItems.url as string).split("/")[3].replace("/", "")
                    ? "bg-purple-950/50"
                    : ""
                } `}
              >
                <subItems.Icon
                  className="lg:hidden"
                  size={17}
                  color="text-white"
                />
                <P className="hidden lg:flex">{subItems.title}</P>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
