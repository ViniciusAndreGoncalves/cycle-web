import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCurrency } from '@/components/currency-provider';

const CACHE_TIME = 10 * 60 * 1000; // 10 minutos

export function useCryptoData() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { currency } = useCurrency();

  useEffect(() => {
    async function fetchData() {
      // 1. Validação inicial
      if (!currency) {
        return
      }
      
      const safeCurrency = (currency === 'brl' || currency === 'usd') ? currency : 'usd';
      
      // Define uma chave de cache única para a moeda atual
      const cacheKey = `crypto_data_${safeCurrency}`;
      
      // Tenta pegar do cache primeiro
      const cached = localStorage.getItem(cacheKey);

      // 2. Tenta pegar do cache primeiro
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        const now = Date.now();

        if (now - timestamp < CACHE_TIME) {
          console.log("⚡ Usando Cache:", safeCurrency);
          setData(cachedData);
          setLoading(false);
          return; // Para aqui e não faz requisição
        }
      }

      // 3. Se não tem cache, busca na API
      setLoading(true);
      try {
        console.log(`📡 Buscando API: ${safeCurrency.toUpperCase()}...`)

        const response = await axios.get(
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
        
        console.log("✅ Dados recebidos:", response.data)
        setData(response.data)

        // Salva no cache
        localStorage.setItem(cacheKey, JSON.stringify({
          data: response.data,
          timestamp: Date.now()
        }));
        
      } catch (error) {
        console.error("❌ Erro ao buscar API", error)

        // Fallback: Se der erro na API, tenta usar o cache antigo se existir
        if (cached) {
            console.warn("⚠️ Usando cache antigo por falha na API.");
            const { data: cachedData } = JSON.parse(cached);
            setData(cachedData);
        }

      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currency])

  return { data, loading, currency }
}