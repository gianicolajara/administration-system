import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import { Dispatch, SetStateAction } from "react";
import "react-calendar/dist/Calendar.css";
import { AiFillCalendar, AiOutlineClose } from "react-icons/ai";

type Props = {
  // eslint-disable-next-line no-unused-vars
  valueDatePicker?: Value;
  onChangeDatePicker?: Dispatch<SetStateAction<Value>>;
};

const DateRange = ({ onChangeDatePicker, valueDatePicker }: Props) => {
  return (
    <DateRangePicker
      className="w-full text-sm lg:text-base"
      onChange={onChangeDatePicker}
      value={valueDatePicker}
      clearIcon={
        <AiOutlineClose
          className="text-white hover:text-primary transition-all"
          size={15}
        />
      }
      calendarIcon={
        <AiFillCalendar
          className="text-white hover:text-primary transition-all"
          size={15}
        />
      }
    />
  );
};

export default DateRange;
