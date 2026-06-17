import { useState } from 'react';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

type CalendarProps = {
  selectedStartDate?: DateType;
  selectedEndDate?: DateType;
  onStartDateChange?: (date: Date) => void;
  onEndDateChange?: (date: Date) => void;
};

export default function Calendar({ selectedStartDate, selectedEndDate, onStartDateChange, onEndDateChange }: CalendarProps) {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>(selectedStartDate);

  return (
    <DateTimePicker
      mode="single"
      date={selected}
      onChange={(params: any) => {
        const d: Date | undefined = params?.date;
        if (d) {
          setSelected(d);
          if (onStartDateChange) onStartDateChange(new Date(d));
        }
      }}
      styles={defaultStyles}
    />
  );
}