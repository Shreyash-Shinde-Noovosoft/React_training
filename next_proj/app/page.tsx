import Link from 'next/link'
import StudentActionButton from '@/components/StudentActionButton'

export default function HomePage() {
  return (
    <main>
      <h1>Student Portal</h1>
      <p>This is the home screen.</p>
      <Link href="/students">Go to students</Link>
      <StudentActionButton />
    </main>
  )
}