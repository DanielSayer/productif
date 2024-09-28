import Link from 'next/link'

export default async function Home() {
  return (
    <main className="grid h-[calc(100vh-3.5rem)] place-items-center">
      <Link href="/merge">Merge</Link>
    </main>
  )
}
