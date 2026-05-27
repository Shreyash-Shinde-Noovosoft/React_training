import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { trpc } from "@/server/api/client";

export default function LogoutButton() {
      const router =
    useRouter()

  const logoutMutation =
    trpc.auth.logout.useMutation({

      onSuccess() {

        router.push("/auth")
      },
    })
    return (
        <>
        <Button
        onClick={() =>
            logoutMutation.mutate()
        }>Logout</Button>
        </>
    )
}