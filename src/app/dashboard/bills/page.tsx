"use client";

import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import {
  addBillBySocketResponse,
  deleteBillBySoscketResponse,
  updateBillIdBySocketResponse,
  useGetAllBillesQuery,
} from "@/redux/services/billApi";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import FormCreateBill from "./Components/FormCreateBill";
import ModalBill from "./Components/ModalBill";
import TableBilles from "./Components/TableBilles";
import { initialStateForm } from "./utils/bills";

const Create = () => {
  const [multiPickerValue, setMultiPickerValue] = useState<Value>([null, null]);

  const dispatch = useDispatch();

  const { isLoading, data, refetch } = useGetAllBillesQuery({
    startDate: multiPickerValue
      ? (multiPickerValue as Array<Date>)[0]?.toString()
      : undefined,
    endDate: multiPickerValue
      ? (multiPickerValue as Array<Date>)[1]?.toString()
      : undefined,
  });

  const { formData, handleChange, setFormData, handleReset } = useForm<IBill>({
    initialState: initialStateForm,
  });

  const { handleClose, handleOpen, open, saveData, setSaveData, setOpen } =
    useModal<IBillResponse>();

  useEffect(() => {
    if (multiPickerValue !== null) {
      refetch();
    }
  }, [multiPickerValue, refetch]);

  useEffect(() => {
    const socket = io(process.env.SOCKET_URI as string, {
      reconnectionDelayMax: 10000,
      path: "/api/socket",
    });

    socket.on("connect", () => {
      console.log("Socket Connected ", socket.id);
    });

    socket.on("bill::insert", (bill: IBillResponse) => {
      console.log("dentro de insert");
      console.log(bill);
      addBillBySocketResponse(bill, dispatch);
    });

    socket.on("bill::update", (data: { id: string; updated: string }) => {
      console.log("dentro de update");
      updateBillIdBySocketResponse(
        {
          ...JSON.parse(data.updated),
          id: data.id,
        } as IBillResponse,
        dispatch
      );
    });

    socket.on("bill::delete", (id: string) => {
      console.log("dentro de delete");
      deleteBillBySoscketResponse(id, dispatch);
    });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalBill
        open={open}
        bill={saveData}
        setOpen={setOpen}
        handleClose={handleClose}
      />
      <section className="w-full h-full">
        <div className="mb-4">
          <SubTitle>Facturas</SubTitle>
        </div>
        <section className="grid grid-cols-1 grid-rows-[auto,_auto] lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
          <FormCreateBill
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            handleReset={handleReset}
          />
          <TableBilles
            loading={isLoading}
            billes={data}
            setFormData={setFormData}
            setModalData={setSaveData}
            handleOpen={handleOpen}
            valueDatePicker={multiPickerValue}
            onChangeDatePicker={setMultiPickerValue}
          />
        </section>
      </section>
    </>
  );
};

export default Create;
