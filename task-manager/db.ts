import fs from "fs";
import path from "path";

import type { User } from "@/server/api/types";

const tasksFilePath = path.join(
  process.cwd(),
  "users.json"
);

function getUsers(): User[] {
  const users = JSON.parse(
    fs.readFileSync(tasksFilePath, "utf-8")
  );

  return users;
}

export const db = {
  get users() {
    return getUsers()
  },
};