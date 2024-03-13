import { Autocomplete } from '@/components/Autocomplete'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'

export default function Home() {
  return (
    <ReactQueryProvider>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <Autocomplete />
      </main>
    </ReactQueryProvider>
  )
}
