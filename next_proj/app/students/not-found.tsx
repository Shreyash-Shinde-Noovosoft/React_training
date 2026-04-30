import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h1>Student not found</h1>
      <Link href="/students">Back to students</Link>
    </main>
  )
}