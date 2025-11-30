import CYCLE_Logo from "@/assets/CYCLE_Logo.png"

export function BrandLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      {/* LOGO */}
      <img 
        src={CYCLE_Logo} 
        alt="Logo Money"
        className="w-12 h-12 object-contain" 
      />

      {/* TEXTO */}
      {/* Usei text-3xl para destaque. Na navbar é text-xl. Ajuste conforme seu gosto. */}
      <span className="text-3xl font-bold text-foreground">
        CY<span className="text-emerald-500">CLE</span>
      </span>
    </div>
  )
}