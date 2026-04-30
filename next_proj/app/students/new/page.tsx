'use client'

import { useState } from 'react'
import { trpc } from '@/lib/client'
import { Button } from '@/components/ui/button'

export default function StudentForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const mutation = trpc.student.createProtected.useMutation({
    onSuccess: (data) => {
        console.log("Created:", data)
        
    },
    onError: (err) => {
        console.log("Error:", err)
    },
    })

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()

        mutation.mutate({
            firstName: name,
            email,
        })
    }

    return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter course"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
    )
    }