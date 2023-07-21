import { BodyData, Head } from "@/types/types/table";

import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  isValidElement,
  useMemo,
  useState,
} from "react";

import { BiError } from "react-icons/bi";
import uniqid from "uniqid";
import InputText from "../dashboard/components/InputText";
import Loader from "../dashboard/components/Loader";
import DateRange from "./DatePickerRange";

export type Props = {
  body: Array<BodyData>;
  head: Array<Head>;
  addFilter?: boolean;
  addDateFilter?: boolean;
  valueDatePicker?: Value;
  onChangeDatePicker?: Dispatch<SetStateAction<Value>>;
  isLoading?: boolean;
  pagination?: boolean;
  amountPage?: number;
};

const Table = ({
  body,
  head,
  addFilter = false,
  addDateFilter = false,
  onChangeDatePicker,
  valueDatePicker,
  isLoading,
  pagination = false,
  amountPage = 0,
}: Props) => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = addFilter
    ? (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
      }
    : () => {};

  const itemFilter = useMemo(
    () =>
      filter && filter.length > 0
        ? body?.filter((item) => item.filter?.includes(filter))
        : body,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, body]
  );

  const paginationChangeHandler = (index: number) => {
    setPage(index);
  };

  const handlePagination = useMemo(
    () =>
      pagination
        ? itemFilter.slice((page - 1) * amountPage, amountPage * page)
        : itemFilter,
    [amountPage, itemFilter, page, pagination]
  );

  return (
    <div className="h-min w-full border-2 border-neutral-700 bg-neutral-900 rounded-lg p-4">
      <div className="flex gap-x-2 items-center w-full flex-col lg:flex-row mb-4 lg:mb-0">
        {addFilter && (
          <div className="py-4 w-full">
            <InputText
              onChange={handleChange}
              value={filter}
              name="filter"
              placeholder="Ingrese un filtro..."
            />
          </div>
        )}
        {addDateFilter && (
          <DateRange
            onChangeDatePicker={onChangeDatePicker}
            valueDatePicker={valueDatePicker}
          />
        )}
      </div>

      <div className="w-full mb-4 flex gap-x-1 flex-wrap">
        {pagination
          ? Array(Math.ceil(body.length / amountPage))
              .fill(0)
              .map((item, index) => (
                <div
                  className={`w-[25px] h-[25px] bg-neutral-800 flex justify-center items-center text-white p-4 rounded-lg cursor-pointer ${
                    page === index + 1 ? "bg-primary" : ""
                  }`}
                  key={index}
                  onClick={() => paginationChangeHandler(index + 1)}
                >
                  {index + 1}
                </div>
              ))
          : null}
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full text-left p-4 border-neutral-800 border-collapse text-white">
          <thead className="p-4">
            <tr>
              {head?.map((item) => (
                <th className="border-2 border-neutral-700 px-4" key={item.id}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!body || body?.length === 0) && !isLoading && (
              <tr>
                <td
                  colSpan={head.length}
                  className="border-2 border-neutral-700 p-4 text-center"
                >
                  <div className="flex flex-col justify-center items-center">
                    <BiError color="white" size={20} />
                    No data
                  </div>
                </td>
              </tr>
            )}
            {isLoading && (
              <tr>
                <td
                  colSpan={head.length}
                  className="border-2 border-neutral-700 p-4 text-center"
                >
                  <Loader />
                </td>
              </tr>
            )}
            {!isLoading &&
              handlePagination.map((item) =>
                isValidElement(item.subData[0].subItem) ? (
                  <tr key={uniqid()}>{item.subData[0].subItem}</tr>
                ) : (
                  <tr key={item.id}>
                    {item.subData?.map((subItemData) => (
                      <td key={uniqid()}>{subItemData.subItem}</td>
                    ))}
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
