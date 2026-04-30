'use client'

import { useState } from 'react'
import { Button }  from "@/components/ui/button";

export default function StudentActionButton() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-red-500 text-white p-4">
  Test Tailwind
    </div>
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
    </>
  )
}