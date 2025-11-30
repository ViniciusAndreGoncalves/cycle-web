import { createContext, useContext, useEffect, useState } from "react"

type Currency = "brl" | "usd"

type CurrencyProviderState = {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const initialState: CurrencyProviderState = {
  currency: "brl", // Valor inicial provisório
  setCurrency: () => null,
}

const CurrencyProviderContext = createContext<CurrencyProviderState>(initialState)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // 1. Tenta pegar do LocalStorage primeiro
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem("app-currency") as Currency
    return saved || "brl" // Se não tiver nada salvo, começa com BRL provisoriamente
  })

  // 2. useEffect para detectar IP (Roda apenas uma vez ao abrir o site)
  useEffect(() => {
    const checkUserLocation = async () => {
      // Se o usuário JÁ tem uma preferência salva, não precisamos checar o IP
      const hasSavedPreference = localStorage.getItem("app-currency")
      if (hasSavedPreference) return

      try {
        // Chama API gratuita para ver o país
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        // Se o país for Brasil (BR), seta BRL. Senão, seta USD.
        if (data.country_code === "BR") {
          setCurrency("brl")
        } else {
          setCurrency("usd")
        }
      } catch (error) {
        console.error("Erro ao detectar país, mantendo padrão BRL", error)
      }
    }

    checkUserLocation()
  }, [])

  // 3. Salva no localStorage toda vez que a moeda mudar
  useEffect(() => {
    localStorage.setItem("app-currency", currency)
  }, [currency])

  return (
    <CurrencyProviderContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyProviderContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyProviderContext)
  if (context === undefined)
    throw new Error("useCurrency deve ser usado dentro de um CurrencyProvider")
  return context
}