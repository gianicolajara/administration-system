import { httpErrorMessageHandle } from "@/lib/alertHttp";
import { formatDateYYYYmmdd } from "@/lib/formatDate";
import { useGetAllChangesQuery } from "@/redux/services/changesApi";
import { AssetsEnum, BillsEnum } from "@/types/enums/dashboard";
import { IBillResponse } from "@/types/interfaces/bill";
import { IChangesResponse } from "@/types/interfaces/changes";
import { IConfigurationResponse } from "@/types/interfaces/configuration";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import NProgress from "nprogress";
import { useState } from "react";
import * as XLSX from "xlsx";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { generateTotal } from "../utils/bills";

type Props = {
  data?: Array<IBillResponse>;
  dataConfiguration?: IConfigurationResponse;
  configurationLoading: boolean;
  dataLoading: boolean;
  dates: Value;
};

const CreateExcel = ({
  data,
  dataConfiguration,
  configurationLoading,
  dataLoading,
  dates,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { data: dataChanges, isLoading: loadingChanges } =
    useGetAllChangesQuery("Changes");

  if (configurationLoading || dataLoading || loadingChanges) return <Loader />;

  if (!data || data.length <= 1 || !dataConfiguration) {
    return <Button>No es posible crear un fichero excel</Button>;
  }

  const createXLSX = () => {
    setLoading(true);

    const startDate = dates ? (dates as Array<Date>)[0]?.toString() : undefined;
    const endDate = dates ? (dates as Array<Date>)[1]?.toString() : undefined;

    const sizeHeader = 1;
    const sizeWhite = 1;
    const sizeMargin = 1;
    let moneyObject: { [key: string]: number } = {};

    const currencyConfigurationId = dataConfiguration.change.id;

    const totalCurrencies = data?.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.typeOfCurrency.name]: acc[`${cur.typeOfCurrency.name}`]
          ? cur.assets === AssetsEnum.Egreso
            ? acc[`${cur.typeOfCurrency.name}`] - Math.abs(cur.amountMoney)
            : acc[`${cur.typeOfCurrency.name}`] + cur.amountMoney
          : cur.assets === AssetsEnum.Egreso
          ? -Math.abs(cur.amountMoney)
          : cur.amountMoney,
      };
    }, moneyObject);

    const keyCurrenciesArray = Object.entries(totalCurrencies as object);

    const content =
      data?.map((item) => {
        const billChange = dataChanges?.find((change) => {
          return (
            change.from.id === item.typeOfCurrency.id &&
            change.to.id === currencyConfigurationId
          );
        });

        if (!billChange) {
          httpErrorMessageHandle({
            message:
              "No existe una configuracion valida en sus cambios de moneda",
          });
          setLoading(false);
          throw new Error(
            "No existe una configuracion valida en sus cambios de moneda"
          );
        }

        return {
          "Numero de Factura": item.billNumber,
          "Usuario": item.user.username,
          "Fecha Creado": formatDateYYYYmmdd(item.createAt as Date),
          "Reporte": item.report,
          "Tipo": BillsEnum[item.billType],
          "Activos": AssetsEnum[item.assets],
          "Cantidad dinero":
            item.assets === AssetsEnum.Ingreso
              ? item.amountMoney
              : -Math.abs(item.amountMoney),
          "Moneda": item.typeOfCurrency.name,
          [`Total en ${dataConfiguration?.change.name}`]: generateTotal(
            item,
            billChange as IChangesResponse
          ),
        };
      }) ?? [];

    const indexToTotal = content.length + sizeHeader + sizeWhite + sizeMargin;
    const indexTotalChange = content.length + sizeHeader + sizeWhite;

    const worksheet = XLSX.utils.json_to_sheet(content);
    XLSX.utils.sheet_add_json(
      worksheet,
      keyCurrenciesArray.map((item) => ({
        [`A${indexToTotal}`]: item[0],
        [`B${indexToTotal}`]: item[1],
      })),
      {
        skipHeader: true,
        origin: `A${indexToTotal}`,
      }
    );

    XLSX.utils.sheet_add_json(
      worksheet,
      [{ [`H${indexToTotal - 1}`]: "Total" }],
      {
        skipHeader: true,
        origin: `H${indexToTotal - 1}`,
      }
    );

    worksheet[`I${indexTotalChange}`] = {
      t: "n",
      f: `SUM(I2:I${indexTotalChange - 1})`,
    };

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
    XLSX.writeFile(
      workbook,
      `${
        startDate && endDate
          ? `${formatDateYYYYmmdd(new Date(startDate))}-${formatDateYYYYmmdd(
              new Date(endDate)
            )}.csv`
          : "bills.csv"
      }`
    );
    NProgress.done();
    setLoading(false);
  };

  return (
    <Button loading={loading} onClick={createXLSX}>
      XLSX
    </Button>
  );
};

export default CreateExcel;
