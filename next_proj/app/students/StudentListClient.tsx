'use client'

import { trpc } from '@/lib/client'
import Link from 'next/link'

export default function StudentListClient() {
    const { data, isLoading, error} = trpc.student.getAll.useQuery()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return(
        <>
        <ul>
            {data.map((user: any) => (
                <li key={user.id}>
                    <Link href={`/students/${user.id}`}>{user.firstName}</Link>
                </li>
            ))}
        </ul>
        </>
    )

}