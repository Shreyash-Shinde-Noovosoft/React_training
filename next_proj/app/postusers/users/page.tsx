'use client'


import { trpc } from '@/lib/client'
import { User } from "@/lib/types"
import NewTable from './components/NewTable'
import { Search } from './components/Search'
import { useState } from 'react'




export default function UserPage() {
    
    const [input, setInput] = useState<string>("")
    const { data, isLoading, error} = trpc.users.getAll.useQuery({q:input})

    console.log(data)

    return (
        <>
            <Search input={input} setInput={setInput}/>
            <NewTable data={data} isLoading={isLoading} />
        </>
  )
}