'use client'

import { trpc } from '@/lib/client'
import { useEffect } from 'react'

export default function StudentClient({ id }: { id: string }) {
  const { data, isLoading } = trpc.student.getByIdDummy.useQuery({ id })

  useEffect(() => {
    if (data) {
      console.log("Data loaded", data)
    }
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Student not found</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  )
}