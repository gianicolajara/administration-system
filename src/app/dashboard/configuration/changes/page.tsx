"use client";

import ModalDelete from "@/app/components/ModalDelete";
import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import {
  useDeleteChangeMutation,
  useGetAllChangesQuery,
} from "@/redux/services/changesApi";
import { IChangesResponse } from "@/types/interfaces/changes";
import FormChanges from "./components/FormChanges";
import SuggestionChange from "./components/SuggestionChange";
import TableChanges from "./components/TableChanges";
import { initialState } from "./utils/createForm";

const Changes = () => {
  const { data, isLoading } = useGetAllChangesQuery("Changes");

  const { formData, handleChange, handleReset, setFormData } = useForm({
    initialState,
  });

  const { handleClose, handleOpen, open, saveData, setSaveData, setOpen } =
    useModal<IChangesResponse>();

  const [deleteChange, { isLoading: deleteLoading }] =
    useDeleteChangeMutation();

  return (
    <>
      <ModalDelete<IChangesResponse>
        handleClose={handleClose}
        loading={deleteLoading}
        name={`de ${saveData?.from.name} a ${saveData?.to.name}`}
        onYes={async (item) => {
          await deleteChange(item.id as string);
        }}
        open={open}
        setOpen={setOpen}
        item={saveData}
      />
      <div className="w-full h-full">
        <div className="mb-4">
          <SubTitle>Cambios</SubTitle>
        </div>

        <div>
          <SuggestionChange />
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
