import { ChangeEvent, useState } from "react";

interface IUseForm<T> {
  initialState: T;
}

const useForm = <T>({ initialState }: IUseForm<T>) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if ((e.target as HTMLInputElement).files?.length) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [(e.target as HTMLSelectElement).name]: (e.target as HTMLSelectElement)
          .value,
      });
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return { handleChange, formData, handleReset, setFormData };
};

export default useForm;
