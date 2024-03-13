import { Autocomplete } from '@/components/Autocomplete'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <ReactQueryProvider>
      <main className='flex flex-col items-center justify-between p-24'>
        <Badge>Accessible Autocomplete</Badge>
        <Separator className='my-4' />
        <Autocomplete />
      </main>
    </ReactQueryProvider>
  )
}
