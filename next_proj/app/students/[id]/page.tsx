// type Student = {
//   name: string
//   course: string
// }


// const students: Record<string, Student> = {
//   '1': { name: 'Asha', course: 'CS' },
//   '2': { name: 'Ravi', course: 'IT' },
//   '3': { name: 'Meera', course: 'AI' },
// }

// export default async function StudentDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params

// //   const students = {
// //     '1': { name: 'Asha', course: 'CS' },
// //     '2': { name: 'Ravi', course: 'IT' },
// //     '3': { name: 'Meera', course: 'AI' },
// //   }

//   console.log("PARAM:", id)

//   const student = students[id]

//   if (!student) {
//     return <h1>Student not found: {id}</h1>
//   }

//   return (
//     <main>
//       <h1>{student.name}</h1>
//       <p>Course: {student.course}</p>
//     </main>
//   )
// }




import StudentClient from './StudentClient'


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params   

  return <>
      <StudentClient id={id} />

  </>
  
}