import { DateType } from "react-native-ui-datepicker";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type task = {
   id: number,
   name: string,
   importance: Double,
   urgency: Double,
   energy: Double, 
   isCompleted: boolean,
   urgencyType: string,
   startDate: DateType,
   endDate: DateType ,
   urgencyChangeRate: Double
  }
 