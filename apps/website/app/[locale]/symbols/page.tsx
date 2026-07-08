import SymbolList from '@/components/SymbolList'
import { getMarketSymbols } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'

export default async function Symbols() {
  const locale = await getServerLocale()
  let symbols: Awaited<ReturnType<typeof getMarketSymbols>> = []
  try {
    symbols = await getMarketSymbols({ locale })
  } catch {
    symbols = []
  }
  return <SymbolList symbols={symbols} />
}
