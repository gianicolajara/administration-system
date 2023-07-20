"use client";

import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import {
  useDeleteChangeMutation,
  useGetAllChangesQuery,
} from "@/redux/services/changesApi";
import { IChangesResponse } from "@/types/interfaces/changes";
import FormChanges from "./components/FormChanges";
import ModalChanges from "./components/ModalChanges";
import TableChanges from "./components/TableChanges";
import { initialState } from "./utils/createForm";

const Changes = () => {
  const { data, isLoading } = useGetAllChangesQuery("Changes");

  const { formData, handleChange, handleReset, setFormData } = useForm({
    initialState,
  });

  const { handleClose, handleOpen, open, saveData, setSaveData, setOpen } =
    useModal<IChangesResponse>();

  const [deleteChange, { isLoading: deleteLoading, isSuccess, isError }] =
    useDeleteChangeMutation();

  return (
    <>
      <ModalChanges
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        changes={saveData}
        onYes={(item) => deleteChange(item.id as string)}
        loading={deleteLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
      <div className="w-full h-full">
        <div className="mb-4">
          <SubTitle>Cambios</SubTitle>
        </div>
        <div className="grid grid-cols-1 grid-rows-[auto,_auto] lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
          <FormChanges
            formData={formData}
            handleChange={handleChange}
            handleReset={handleReset}
          />
          <TableChanges
            changes={data}
            loading={isLoading}
            setFormData={setFormData}
            handleOpen={handleOpen}
            setSaveData={setSaveData}
          />
        </div>
      </div>
    </>
  );
};

export default Changes;
