"use client";

import InputRadio from "@/app/dashboard/components/InputRadio";
import InputText from "@/app/dashboard/components/InputText";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  AssetsEnum,
  BillsEnum,
  TypeOfCurrencyEnum,
} from "../../../../../../types/enums/dashboard";
import { Bill } from "../../../../../../types/types/bill";
import { formatDateYYYYmmdd } from "../../../../../lib/formatDate";
import { typesOfBills } from "../config/bills";
import ListBillType from "./ListBillType";

const initialStateForm: Bill = {
  billType: BillsEnum.Multas.toString(),
  assets: AssetsEnum.Ingreso.toString(),
  billNumber: "",
  date: formatDateYYYYmmdd(new Date(Date.now())),
  amountMoney: 0.0,
  typeOfCurrency: TypeOfCurrencyEnum.Pesos.toString(),
  report: "",
};

const FormCreateBill = () => {
  const [FormData, setFormData] = useState<Bill>(initialStateForm);
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(FormData);
    setFormData(initialStateForm);
  };

  return (
    <form
      className="border-2 border-slate-800 p-5 rounded-lg"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex gap-x-4 border-2 border-slate-800 p-5">
        <legend className="bg-white py-1 px-2 rounded-lg text-slate-950 font-bold">
          Tipo de Factura
        </legend>
        <ListBillType
          FormData={FormData}
          onChange={handleOnChange}
          typesOfBills={typesOfBills}
        />
      </fieldset>
      <fieldset className="flex gap-x-4 border-2 border-slate-800 p-5 mt-5">
        <legend className="bg-white py-1 px-2 rounded-lg text-slate-950 font-bold">
          Activo Financiero
        </legend>
        <label>
          <input
            type="radio"
            name="assets"
            value={AssetsEnum.Ingreso.toString()}
            onChange={handleOnChange}
            checked={FormData.assets === AssetsEnum.Ingreso.toString()}
            className="appearance-none w-5 h-5 rounded-full border-4 border-purple-950 transition-all relative checked:border-8 checked:border-purple-600 select-none top-1 right-1"
          />
          Ingreso
        </label>
        <label>
          <input
            type="radio"
            name="assets"
            value={AssetsEnum.Egreso.toString()}
            onChange={handleOnChange}
            checked={FormData.assets === AssetsEnum.Egreso.toString()}
            className="appearance-none w-5 h-5 rounded-full border-4 border-purple-950 transition-all relative checked:border-8 checked:border-purple-600 select-none top-1 right-1"
          />
          Egreso
        </label>
      </fieldset>
      <fieldset className="flex gap-4 border-2 border-slate-800 p-5 mt-5 flex-col ">
        <legend className="bg-white py-1 px-2 rounded-lg text-slate-950 font-bold">
          Datos
        </legend>
        <div className="flex w-full gap-x-5">
          <InputText
            label="Numero de Factura"
            name="billNumber"
            onChange={handleOnChange}
            value={FormData.billNumber}
          />

          <div className="flex flex-col w-full">
            <label htmlFor="date">Fecha de factura</label>
            <input
              type="date"
              name="date"
              value={FormData.date}
              onChange={handleOnChange}
              className="text-white p-2 h-[50px] bg-slate-800"
            />
          </div>
        </div>
        <div className="flex w-full gap-x-5 ">
          <InputText
            label="Cantidad de dinero"
            name="amountMoney"
            onChange={handleOnChange}
            value={FormData.amountMoney}
            type="number"
          />

          <div className="flex w-full h-full flex-col self-center">
            <label htmlFor="">Tipo de moneda</label>
            <div className="flex gap-x-4 w-full items-center h-[50px]">
              <InputRadio
                name="typeOfCurrency"
                value={TypeOfCurrencyEnum.Pesos.toString()}
                onChange={handleOnChange}
                label="Pesos"
                checked={
                  TypeOfCurrencyEnum.Pesos.toString() ===
                  FormData.typeOfCurrency
                }
              />
              <InputRadio
                name="typeOfCurrency"
                value={TypeOfCurrencyEnum.Dolar.toString()}
                onChange={handleOnChange}
                label="Dolar"
                checked={
                  TypeOfCurrencyEnum.Dolar.toString() ===
                  FormData.typeOfCurrency
                }
              />
              <InputRadio
                name="typeOfCurrency"
                value={TypeOfCurrencyEnum.Bolivar.toString()}
                onChange={handleOnChange}
                label="Bolivar"
                checked={
                  TypeOfCurrencyEnum.Bolivar.toString() ===
                  FormData.typeOfCurrency
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="report">Reporte</label>
          <textarea
            name="report"
            cols={30}
            rows={10}
            onChange={handleOnChange}
            value={FormData.report}
            className="resize-none bg-slate-800 rounded p-4"
            placeholder="Ingrese una descripción o titulo de su factura"
          />
        </div>
        <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 active:bg-purple-950 transition-all">
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default FormCreateBill;
