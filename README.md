Task 1:

```Typescript
type Addresses = {
  [key: string]: string | { address: keyof Addresses };
};
```

task 2:

```typescript
type Account = {
  id: string
  signer?: true
  address?: keyof Addresses
}

type Instructions = {
  [key: string]: { accounts: Account[] }
}

function instructions(input: {
  addresses: Addresses
  instructions: Instructions
}) {
  const { addresses, instructions: instructionsInput } = input

  const resolvedInstructions: Instructions = {}

  for (const key in instructionsInput) {
    resolvedInstructions[key] = {
      accounts: instructionsInput[key].accounts.map((account) => {
        if (account.address) {
          const addressValue = addresses[account.address]
          if (typeof addressValue === 'string') {
            return { ...account, address: addressValue }
          } else {
            return {
              ...account,
              address: resolveAddress(addresses, addressValue),
            }
          }
        }
        return account
      }),
    }
  }

  return resolvedInstructions

  function resolveAddress(
    addresses: Addresses,
    address: keyof Addresses,
  ): string {
    const addressValue = addresses[address]
    if (typeof addressValue === 'string') {
      return addressValue
    } else {
      return resolveAddress(addresses, addressValue.address)
    }
  }
}
```

Task 3:

```typescript
type AccountsWithoutAddress<T extends Instructions> = {
  [K in keyof T]: T[K] extends {
    accounts: { id: infer ID; address?: undefined }[]
  }
    ? ID
    : never
}[keyof T]

function getAccountsWithoutAddress(
  input: { instructions: Instructions },
  key: keyof typeof input,
) {
  const { instructions } = input
  return instructions[key].accounts.filter((account) => account.signer)
}
```
