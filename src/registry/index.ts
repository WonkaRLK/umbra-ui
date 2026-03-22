import React from "react";
import { Button } from "@/components/umbra/button";
import { Badge } from "@/components/umbra/badge";
import { Input } from "@/components/umbra/input";
import { Avatar } from "@/components/umbra/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/umbra/card";
import { Separator } from "@/components/umbra/separator";
import { Tabs } from "@/components/umbra/tabs";
import { StatCard } from "@/components/umbra/stat-card";

export type ComponentCategory = "Base" | "Layout" | "Feedback" | "Navigation" | "Data";

export interface ComponentEntry {
  name: string;
  category: ComponentCategory;
  description: string;
  preview: React.ReactElement;
  code: string;
}

export const registry: ComponentEntry[] = [
  {
    name: "Button",
    category: "Base",
    description: "Botón con variantes, tamaños y estado de carga.",
    preview: React.createElement(Button, { variant: "default" }, "Ver proyecto"),
    code: `import { Button } from "@/components/umbra/button";

export default function Example() {
  return <Button variant="default">Ver proyecto</Button>;
}`,
  },
  {
    name: "Badge",
    category: "Base",
    description: "Badge inline con variantes y colores semánticos.",
    preview: React.createElement(Badge, { variant: "default" }, "Activo"),
    code: `import { Badge } from "@/components/umbra/badge";

export default function Example() {
  return <Badge variant="default">Activo</Badge>;
}`,
  },
  {
    name: "Input",
    category: "Base",
    description: "Campo de texto con label, error y estado deshabilitado.",
    preview: React.createElement(Input, { label: "Email", placeholder: "tu@email.com" }),
    code: `import { Input } from "@/components/umbra/input";

export default function Example() {
  return <Input label="Email" placeholder="tu@email.com" />;
}`,
  },
  {
    name: "Avatar",
    category: "Base",
    description: "Avatar con imagen o iniciales de fallback.",
    preview: React.createElement(Avatar, { fallback: "Matias Zeballos", size: "md" }),
    code: `import { Avatar } from "@/components/umbra/avatar";

export default function Example() {
  return <Avatar fallback="Matias Zeballos" size="md" />;
}`,
  },
  {
    name: "Card",
    category: "Layout",
    description: "Contenedor con Header, Content y Footer.",
    preview: React.createElement(
      Card,
      { style: { maxWidth: 280 } },
      React.createElement(CardHeader, null, React.createElement(CardTitle, null, "Nuevo proyecto")),
      React.createElement(CardContent, null, React.createElement("p", { style: { fontSize: 13, color: "#7c6f9e" } }, "Plataforma de gestión para equipos."))
    ),
    code: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/umbra/card";

export default function Example() {
  return (
    <Card>
      <CardHeader><CardTitle>Nuevo proyecto</CardTitle></CardHeader>
      <CardContent><p>Plataforma de gestión para equipos.</p></CardContent>
    </Card>
  );
}`,
  },
  {
    name: "Separator",
    category: "Layout",
    description: "Línea divisoria horizontal o vertical.",
    preview: React.createElement(Separator, { style: { width: 200 } }),
    code: `import { Separator } from "@/components/umbra/separator";

export default function Example() {
  return <Separator />;
}`,
  },
  {
    name: "Tabs",
    category: "Navigation",
    description: "Pestañas con indicador animado.",
    preview: React.createElement(Tabs, {
      tabs: [
        { value: "a", label: "General", content: React.createElement("p", { style: { fontSize: 13, color: "#7c6f9e" } }, "Configuración general") },
        { value: "b", label: "Equipo", content: React.createElement("p", { style: { fontSize: 13, color: "#7c6f9e" } }, "Miembros del equipo") },
      ],
    }),
    code: `import { Tabs } from "@/components/umbra/tabs";

export default function Example() {
  return (
    <Tabs tabs={[
      { value: "a", label: "General", content: <p>Configuración general</p> },
      { value: "b", label: "Equipo", content: <p>Miembros del equipo</p> },
    ]} />
  );
}`,
  },
  {
    name: "StatCard",
    category: "Data",
    description: "Tarjeta de métrica con indicador de tendencia.",
    preview: React.createElement(StatCard, { label: "Ingresos", value: "$24.8k", trend: "up", trendValue: "+12% este mes", style: { maxWidth: 200 } }),
    code: `import { StatCard } from "@/components/umbra/stat-card";

export default function Example() {
  return <StatCard label="Ingresos" value="$24.8k" trend="up" trendValue="+12% este mes" />;
}`,
  },
];

export const categories: ComponentCategory[] = ["Base", "Layout", "Navigation", "Data", "Feedback"];
