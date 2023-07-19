import Table from "@/app/components/Table";
import Loader from "@/app/dashboard/components/Loader";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { BodyData, Head } from "@/types/types/table";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import { Dispatch, SetStateAction } from "react";
import ItemBill from "./ItemBill";

type Props = {
  billes?: Array<IBillResponse>;
  loading: boolean;
  setFormData: Dispatch<SetStateAction<IBill>>;
  setModalData: Dispatch<SetStateAction<IBillResponse | undefined>>;
  handleOpen: () => void;
  valueDatePicker?: Value;
  onChangeDatePicker?: Dispatch<SetStateAction<Value>>;
};

const TableBilles = ({
  loading,
  billes,
  setFormData,
  setModalData,
  handleOpen,
  onChangeDatePicker,
  valueDatePicker,
}: Props) => {
  if (loading) return <Loader />;

  const generateHead = (): Array<Head> => {
    return [
      {
        id: 1,
        name: "Numero",
      },
      {
        id: 2,
        name: "Fecha creación",
      },
      {
        id: 3,
        name: "Tipo de factura",
      },
      {
        id: 4,
        name: "Activo financiero",
      },
      {
        id: 5,
        name: "Tipo de moneda",
      },
      {
        id: 6,
        name: "Cantidad",
      },
      {
        id: 7,
        name: "Acciones",
      },
    ];
  };

  const generateBody = (): Array<BodyData> => {
    if (!billes) return [];

    return billes?.map((item) => ({
      id: item.id as string,
      filter: item.billNumber,
      subData: [
        {
          subItem: (
            <ItemBill
              bill={item}
              setFormData={setFormData}
              setModalData={setModalData}
              handleOpen={handleOpen}
            />
          ),
        },
      ],
    }));
  };

  return (
    <Table
      addFilter={true}
      addDateFilter={true}
      head={generateHead()}
      body={generateBody()}
      onChangeDatePicker={onChangeDatePicker}
      valueDatePicker={valueDatePicker}
    />
  );
};

export default TableBilles;
