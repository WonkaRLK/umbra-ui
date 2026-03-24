import { Button } from "@/components/umbra/button";
import { Badge } from "@/components/umbra/badge";
import { Avatar } from "@/components/umbra/avatar";
import { StatCard } from "@/components/umbra/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/umbra/card";

export function ShowcaseStrip() {
  return (
    <section className="py-16 px-6 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs text-[#505050] uppercase tracking-widest mb-10">
          Componentes incluidos
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Button preview */}
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] p-5 flex flex-col gap-3 items-start">
            <span className="text-xs text-[#505050]">Button</span>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Default</Button>
              <Button size="sm" variant="outline">Outline</Button>
            </div>
          </div>

          {/* Badge preview */}
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] p-5 flex flex-col gap-3 items-start">
            <span className="text-xs text-[#505050]">Badge</span>
            <div className="flex flex-wrap gap-2">
              <Badge>Activo</Badge>
              <Badge color="success">Listo</Badge>
              <Badge color="warning">Pendiente</Badge>
            </div>
          </div>

          {/* Avatar preview */}
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] p-5 flex flex-col gap-3 items-start">
            <span className="text-xs text-[#505050]">Avatar</span>
            <div className="flex gap-2">
              <Avatar fallback="Matias Zeballos" size="sm" />
              <Avatar fallback="Rosa Lopez" size="sm" />
              <Avatar fallback="Juan Perez" size="sm" />
            </div>
          </div>

          {/* StatCard preview */}
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] p-5 flex flex-col gap-3 items-start">
            <span className="text-xs text-[#505050]">StatCard</span>
            <StatCard label="Ingresos" value="$24.8k" trend="up" trendValue="+12%" className="w-full" />
          </div>

          {/* Card preview */}
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] p-5 flex flex-col gap-3 md:col-span-2">
            <span className="text-xs text-[#505050]">Card</span>
            <Card>
              <CardHeader>
                <CardTitle>Nuevo proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#505050]">Plataforma de gestion para equipos distribuidos.</p>
              </CardContent>
            </Card>
          </div>

          {/* Copy-paste teaser */}
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] p-5 flex flex-col gap-3 md:col-span-2">
            <span className="text-xs text-[#505050]">Copy-paste ready</span>
            <pre className="text-[11px] text-[#a855f7] bg-[#080808] rounded-[8px] p-3 overflow-x-auto">
              <code>{'import { Button } from "@/components/umbra/button";\n\n<Button>Ver proyecto</Button>'}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}