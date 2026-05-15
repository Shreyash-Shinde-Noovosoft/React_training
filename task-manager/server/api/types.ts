import { Priority, Status } from "@/constants/enums"

export type Task = {
  id: string
  title: string
  description: string
  priority:Priority
  status:Status
  assignedTo: string
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
};