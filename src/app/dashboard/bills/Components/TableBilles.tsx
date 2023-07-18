import Alert from "@/app/components/Alert";
import Table from "@/app/components/Table";
import Loader from "@/app/dashboard/components/Loader";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { BodyData, Head } from "@/types/types/table";
import { Dispatch, SetStateAction } from "react";
import ItemBill from "./ItemBill";

type Props = {
  billes?: Array<IBillResponse>;
  loading: boolean;
  setFormData: Dispatch<SetStateAction<IBill>>;
  setModalData: Dispatch<SetStateAction<IBillResponse | undefined>>;
  handleOpen: () => void;
};

const TableBilles = ({
  loading,
  billes,
  setFormData,
  setModalData,
  handleOpen,
}: Props) => {
  if (loading) return <Loader />;

  if (!billes) return <Alert>Algo Fue mal</Alert>;
  if (billes?.length === 0) return <Alert type="danger">Sin Data</Alert>;

  const generateHead = (): Array<Head> => {
    return [
      {
        id: 1,
        name: "Numero",
      },
      {
        id: 2,
        name: "Tipo de factura",
      },
      {
        id: 3,
        name: "Activo financiero",
      },
      {
        id: 4,
        name: "Tipo de moneda",
      },
      {
        id: 5,
        name: "Cantidad",
      },
      {
        id: 6,
        name: "Acciones",
      },
    ];
  };

  const generateBody = (): Array<BodyData> => {
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

  return <Table addFilter={true} head={generateHead()} body={generateBody()} />;
};

export default TableBilles;
