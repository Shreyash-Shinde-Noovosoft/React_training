type Task = {
  id: string
  title: string
  description: string
  priority:
  | "High"
  | "Medium"
  | "Low"

status:
  | "Completed"
  | "Pending"
  | "InProgress"
  // | "Blocked"
  assignedTo: string
}