import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import { useEffect, useState } from "react";

type Props = {
  refetch: () => void;
};

const useRangeDate = ({ refetch }: Props) => {
  const [multiPickerValue, setMultiPickerValue] = useState<Value>([null, null]);

  useEffect(() => {
    if (multiPickerValue !== null) {
      refetch();
    }
  }, [multiPickerValue, refetch]);

  return {
    multiPickerValue,
    setMultiPickerValue,
  };
};

export default useRangeDate;
