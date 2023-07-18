"use client";

import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import { useGetAllChangesQuery } from "@/redux/services/changesApi";
import FormChanges from "./components/FormChanges";
import TableChanges from "./components/TableChanges";
import { initialState } from "./utils/createForm";

const Changes = () => {
  const { data, isLoading } = useGetAllChangesQuery("Changes");

  const { formData, handleChange, handleReset, setFormData } = useForm({
    initialState,
  });

  return (
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
        />
      </div>
    </div>
  );
};

export default Changes;
