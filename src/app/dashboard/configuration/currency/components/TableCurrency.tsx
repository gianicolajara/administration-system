import Table from "@/app/components/Table";
import { IMoney } from "@/types/interfaces/money";
import { BodyData, Head } from "@/types/types/table";
import { Dispatch, SetStateAction } from "react";
import ItemCurrency from "./ItemCurrency";

type Props = {
  currencies?: Array<IMoney>;
  loading: boolean;
  setFormData: Dispatch<SetStateAction<IMoney>>;
  setSaveData: Dispatch<SetStateAction<IMoney | undefined>>;
  handleOpen: () => void;
};

const TableCurrency = ({
  currencies,
  loading,
  setFormData,
  setSaveData,
  handleOpen,
}: Props) => {
  const handleSetFormCurrency = (currency: IMoney) => {
    setFormData({
      id: currency.id,
      name: currency.name,
    });
  };

  const generateHead = (): Array<Head> => {
    return [
      {
        id: 1,
        name: "Nombre",
      },
      {
        id: 2,
        name: "Acciones",
      },
    ];
  };

  const generateBody = (): Array<BodyData> => {
    if (!currencies) return [];

    return currencies?.map((item) => ({
      id: item.id as string,
      filter: item.name,
      subData: [
        {
          subItem: (
            <ItemCurrency
              currency={item}
              handleSetFormCurrency={handleSetFormCurrency}
              setSaveData={setSaveData}
              handleOpen={handleOpen}
            />
          ),
        },
      ],
    }));
  };

  return (
    <Table
      addFilter={false}
      body={generateBody()}
      head={generateHead()}
      isLoading={loading}
    />
  );
};

export default TableCurrency;
