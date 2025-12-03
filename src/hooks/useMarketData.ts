import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from "@/lib/axios"
import { useCurrency } from "@/components/currency-provider"

export function useMarketData() {
  const [stocks, setStocks] = useState<any[]>([])
  const [cryptos, setCryptos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { currency } = useCurrency()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // 1. Buscar Ações
        // Nota: Ações B3 são sempre em BRL. Se o usuário estiver em USD,
        // precisa converter. Por enquanto, mostrar em BRL.
        console.log("🚀 Iniciando busca de dados no Front...");

        console.log("Chamando API Laravel: /market/highlights");
        const resStocks = await api.get('/market/highlights');
        
        console.log("📦 Resposta Ações (Laravel):", resStocks.data);

        setStocks(resStocks.data)
        
        // 2. Buscar Criptos (CoinGecko)
        const safeCurrency = (currency === 'brl' || currency === 'usd') ? currency : 'usd';
        const resCryptos = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: safeCurrency,
              ids: 'bitcoin,ethereum,tether,xrp,solana,usdc,chainlink,avalanche-2,uniswap,polkadot',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false
            }
          }
        )

        setStocks(resStocks.data)
        setCryptos(resCryptos.data)

      } catch (error) {
        console.error("Erro ao buscar dados de mercado:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currency])

  return { stocks, cryptos, loading }
}