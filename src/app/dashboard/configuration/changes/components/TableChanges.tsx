import Table from "@/app/components/Table";
import Loader from "@/app/dashboard/components/Loader";
import { IChanges, IChangesResponse } from "@/types/interfaces/changes";
import { BodyData, Head } from "@/types/types/table";
import { Dispatch, SetStateAction } from "react";
import ItemChanges from "./ItemChanges";

type Props = {
  changes?: Array<IChangesResponse>;
  loading: boolean;
  setFormData: Dispatch<SetStateAction<IChanges>>;
};

const TableChanges = ({ loading, changes, setFormData }: Props) => {
  if (loading) return <Loader />;

  if (changes?.length === 0) return <p>Sin Data</p>;

  if (!changes) return <p>Algo fue mal</p>;

  const generateHead = (): Array<Head> => {
    return [
      {
        id: 1,
        name: "De",
      },
      {
        id: 2,
        name: "A",
      },
      {
        id: 3,
        name: "Precio",
      },
      {
        id: 4,
        name: "Acciones",
      },
    ];
  };

  const generateBody = (): Array<BodyData> => {
    return changes?.map((item) => ({
      id: item.id as string,
      filter: item.id,
      subData: [
        {
          subItem: <ItemChanges changes={item} setFormData={setFormData} />,
        },
      ],
    }));
  };

  return (
    <Table addFilter={false} body={generateBody()} head={generateHead()} />
  );
};

export default TableChanges;
