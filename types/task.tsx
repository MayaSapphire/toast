import { DateType } from "react-native-ui-datepicker";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export class Task {
   
  public id: number = 0;
  public name: string = "";
  public importance: Double = 0;
  public urgency: Double = 0;
  public energy: Double = 0;
  public isCompleted: boolean = false;
  public urgencyType: string = "";
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public urgencyChangeRate: Double = 0 ;

  constructor(id: number, 
    name: string, 
    importance: Double, 
    urgency: Double, 
    energy: Double, 
    isCompleted: boolean, 
    urgencyType: string, 
    startDate: Date, 
    endDate: Date, 
    urgencyChangeRate: Double) {
    this.id = id;
    this.name = name;
    this.importance = importance;
    this.urgency = urgency;
    this.energy = energy;
    this.isCompleted = isCompleted;
    this.urgencyType = urgencyType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.urgencyChangeRate = urgencyChangeRate;
  }
  
  public updateTask(updatedTask: Task) {
    this.name = updatedTask.name;
    this.importance = updatedTask.importance;
    this.urgency = updatedTask.urgency;
    this.energy = updatedTask.energy;
    this.isCompleted = updatedTask.isCompleted;
    this.urgencyType = updatedTask.urgencyType;
    this.startDate = updatedTask.startDate;
    this.endDate = updatedTask.endDate;
    this.urgencyChangeRate = updatedTask.urgencyChangeRate;
  }

  public setImportance(value: number) {
    this.importance = value;
  };

  public setUrgency(value: number) {
    this.urgency = value;
  };

  public setEnergy(value: number) {
    this.energy = value;
  };

  public setIsCompleted(value: boolean) {
    this.isCompleted = value;
  }

  public setUrgencyType(value: string) {
    this.urgencyType = value;
  }

  public setStartDate(value: Date) {
    this.startDate = value;
  }

  public setEndDate(value: Date) {
    this.endDate = value;
  }

  public setUrgencyChangeRate(value: number) {
    this.urgencyChangeRate = value;
  }
}