import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

export default function TaskForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Task</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input placeholder="TaskTitle" />
        <Input placeholder="Description" />
        <Input placeholder="Priority" />
        <Input placeholder="Status" />
        <Input placeholder="AssignedTo" />
      </CardContent>

      <CardFooter>
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  );
}
