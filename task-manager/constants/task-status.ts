import { Status } from "./enums";

export const TASK_STATUSES = [
  {
    title: "Pending",
    value: Status.PENDING,
  },

  {
    title: "In Progress",
    value: Status.IN_PROGRESS,
  },

  {
    title: "Completed",
    value: Status.COMPLETED,
  },
//   {
//     title: "Blocked",
//     value: "Blocked",
//   },
//   {
//     title: "Blocked2",
//     value: "Blocked2",
//   },
] as const;
