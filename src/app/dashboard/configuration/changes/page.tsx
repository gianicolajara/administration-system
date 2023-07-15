"use client";

import Title from "@/app/components/Title";
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
      <Title>Cambios</Title>
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
        <TableChanges
          changes={data}
          loading={isLoading}
          setFormData={setFormData}
        />
        <FormChanges
          formData={formData}
          handleChange={handleChange}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default Changes;
