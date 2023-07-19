import { BodyData, Head } from "@/types/types/table";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  isValidElement,
  useState,
} from "react";
import "react-calendar/dist/Calendar.css";
import uniqid from "uniqid";
import InputText from "../dashboard/components/InputText";
import Alert from "./Alert";
import DateRange from "./DatePickerRange";

export type Props = {
  body: Array<BodyData>;
  head: Array<Head>;
  addFilter?: boolean;
  addDateFilter?: boolean;
  valueDatePicker?: Value;
  onChangeDatePicker?: Dispatch<SetStateAction<Value>>;
};

const Table = ({
  body,
  head,
  addFilter = false,
  addDateFilter = false,
  onChangeDatePicker,
  valueDatePicker,
}: Props) => {
  const [filter, setFilter] = useState("");

  const handleChange = addFilter
    ? (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
      }
    : () => {};

  return (
    <div className="h-min w-full border-2 border-neutral-700 bg-neutral-900 rounded-lg p-4">
      <div className="flex gap-x-2 items-center w-full">
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
            {!body && <Alert>Algo Fue mal</Alert>}
            {body?.length === 0 && <Alert type="danger">Sin Data</Alert>}
            {body
              ?.filter((item) => item.filter?.includes(filter))
              .map((item) =>
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
