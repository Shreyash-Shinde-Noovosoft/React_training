import Link from 'next/link'

import {Button} from '@/components/ui/button'
import { trpc } from '@/lib/client'
import StudentListClient from './StudentListClient'

const students = [
  { id: '1', name: 'Asha' },
  { id: '2', name: 'Ravi' },
  { id: '3', name: 'Meera' },
]

export default function StudentsPage() {

  return (
    <main>
      <h1>Students</h1>

      <Link href="/students/new">
        <Button>Add Student</Button>
      </Link>

      <StudentListClient />
    </main>
  )
}