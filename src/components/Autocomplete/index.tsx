'use client'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Loading } from '../Loading'

export function Autocomplete() {
  const queryClient = useQueryClient()
  const [queryString, setQueryString] = useState<string>('')

  const getFromCache = (key: string) => {
    return queryClient.getQueryData([key])
  }

  const { data, isLoading } = useQuery({
    queryKey: [queryString],
    queryFn: async ({ queryKey }) => {
      const cache = getFromCache(queryString)
      if (cache) return cache

      const data = await await fetch(
        `https://restcountries.com/v3.1/name/${queryKey}`,
      )

      return data.json()
    },
    enabled: !!queryString,
  })

  const handleChangesQuery = (name: string) => {
    setQueryString(name)
  }

  return (
    <>
      <Command>
        <CommandInput
          placeholder='Enter a country name to search...'
          onValueChange={(e) => handleChangesQuery(e)}
          autoFocus
        />
        {isLoading && <Loading />}

        <CommandList>
          {data?.length &&
            data.map(
              ({
                name: { common },
                flag,
              }: {
                name: { common: string }
                flag: string
              }) => (
                <CommandItem key={common}>{`${flag} - ${common}`}</CommandItem>
              ),
            )}

          {queryString && !data?.length && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </>
  )
}
