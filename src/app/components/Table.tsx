import { Props } from "@/types/types/table";
import { ChangeEvent, isValidElement, useState } from "react";
import uniqid from "uniqid";
import InputText from "../dashboard/components/InputText";

const Table = ({ body, head, addFilter }: Props) => {
  const [filter, setFilter] = useState("");

  const handleChange = addFilter
    ? (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
      }
    : () => {};

  return (
    <div className="h-min w-full border-2 border-slate-800 rounded-lg p-4">
      {addFilter && (
        <div className="py-4">
          <InputText
            onChange={handleChange}
            value={filter}
            label="Filtro"
            name="filter"
          />
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <table className="border-2 border-slate-800 table-auto border-collapse w-full">
          <thead>
            <tr>
              {head?.map((item) => (
                <th className="border-2 border-slate-800" key={item.id}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
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
