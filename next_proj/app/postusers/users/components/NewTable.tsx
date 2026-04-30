import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AppRouter } from "@/lib/root";
import { UserResponse, User } from "@/lib/types"
import { TRPCClientErrorLike } from "@trpc/client";
import { TRPCError } from '@trpc/server';

/**
 * 
 * @param data = user response
 * 
* 
* 
* 
* {
*  data: {
* user=[]
* total=[]
* skip=0}
* }
 * @returns 
 */


export default function NewTable (props:{ data:  UserResponse | undefined, isLoading: boolean}) {

    
    
    return (
    <Table>
      <TableCaption>A list of Users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.isLoading? <p>Loading...</p>:props.data?.users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter>
    </Table>
    )
      
}