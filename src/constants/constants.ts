export type statuses = "tasks" | "doing" | "done";
export type priorities = "High" | "Mid" | "Low";

export interface todo {
  status: statuses;
  title: string;
  desc?: string;
  id: string;
  priority: priorities;
}
