import React from "react";
import { Button } from "@/components/umbra/button";
import { Badge } from "@/components/umbra/badge";
import { Input } from "@/components/umbra/input";
import { Avatar } from "@/components/umbra/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/umbra/card";
import { Separator } from "@/components/umbra/separator";
import { Tabs } from "@/components/umbra/tabs";
import { StatCard } from "@/components/umbra/stat-card";
import { Checkbox } from "@/components/umbra/checkbox";
import { RadioGroup } from "@/components/umbra/radio-group";
import { Switch } from "@/components/umbra/switch";
import { Select } from "@/components/umbra/select";
import { Textarea } from "@/components/umbra/textarea";
import { Slider } from "@/components/umbra/slider";
import { SearchInput } from "@/components/umbra/search-input";
import { NumberInput } from "@/components/umbra/number-input";
import { Chip } from "@/components/umbra/chip";
import { Alert } from "@/components/umbra/alert";
import { Progress } from "@/components/umbra/progress";
import { Skeleton, SkeletonAvatar } from "@/components/umbra/skeleton";
import { Spinner } from "@/components/umbra/spinner";
import { EmptyState } from "@/components/umbra/empty-state";
import { Dialog } from "@/components/umbra/dialog";
import { Drawer } from "@/components/umbra/drawer";
import { Popover } from "@/components/umbra/popover";
import { Tooltip } from "@/components/umbra/tooltip";
import { DropdownMenu } from "@/components/umbra/dropdown-menu";
import { Accordion } from "@/components/umbra/accordion";
import { Collapsible } from "@/components/umbra/collapsible";
import { Breadcrumb } from "@/components/umbra/breadcrumb";
import { Pagination } from "@/components/umbra/pagination";
import { Stepper } from "@/components/umbra/stepper";
import { Table } from "@/components/umbra/table";
import { Timeline } from "@/components/umbra/timeline";
import { Kbd, KbdGroup } from "@/components/umbra/kbd";
import { CodeBlock } from "@/components/umbra/code-block";
import { List } from "@/components/umbra/list";
import { ContextMenu } from "@/components/umbra/context-menu";
import { CommandPalette } from "@/components/umbra/command-palette";

export type ComponentCategory = "Base" | "Layout" | "Feedback" | "Navigation" | "Data";

export interface ComponentEntry {
  name: string;
  category: ComponentCategory;
  description: string;
  preview: React.ReactElement;
  code: string;
}

export const registry: ComponentEntry[] = [
  // -- Base ------------------------------------------------------
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
    name: "Checkbox",
    category: "Base",
    description: "Checkbox con label, estado indeterminate y animación.",
    preview: React.createElement(Checkbox, { label: "Aceptar términos", defaultChecked: true }),
    code: `import { Checkbox } from "@/components/umbra/checkbox";

export default function Example() {
  return <Checkbox label="Aceptar términos" />;
}`,
  },
  {
    name: "RadioGroup",
    category: "Base",
    description: "Grupo de radios con selección animada.",
    preview: React.createElement(RadioGroup, {
      options: [
        { value: "a", label: "Opción A" },
        { value: "b", label: "Opción B" },
      ],
      defaultValue: "a",
    }),
    code: `import { RadioGroup } from "@/components/umbra/radio-group";

export default function Example() {
  return (
    <RadioGroup
      options={[
        { value: "a", label: "Opción A" },
        { value: "b", label: "Opción B" },
      ]}
      defaultValue="a"
    />
  );
}`,
  },
  {
    name: "Switch",
    category: "Base",
    description: "Toggle on/off con animación spring.",
    preview: React.createElement(Switch, { label: "Notificaciones", defaultChecked: true }),
    code: `import { Switch } from "@/components/umbra/switch";

export default function Example() {
  return <Switch label="Notificaciones" />;
}`,
  },
  {
    name: "Select",
    category: "Base",
    description: "Dropdown estilizado con label y estado de error.",
    preview: React.createElement(Select, {
      label: "País",
      placeholder: "Seleccionar...",
      options: [
        { value: "ar", label: "Argentina" },
        { value: "mx", label: "México" },
      ],
    }),
    code: `import { Select } from "@/components/umbra/select";

export default function Example() {
  return (
    <Select
      label="País"
      placeholder="Seleccionar..."
      options={[
        { value: "ar", label: "Argentina" },
        { value: "mx", label: "México" },
      ]}
    />
  );
}`,
  },
  {
    name: "Textarea",
    category: "Base",
    description: "Área de texto con label, contador de caracteres y autoResize.",
    preview: React.createElement(Textarea, { label: "Descripción", placeholder: "Escribí aquí...", maxLength: 200 }),
    code: `import { Textarea } from "@/components/umbra/textarea";

export default function Example() {
  return <Textarea label="Descripción" placeholder="Escribí aquí..." maxLength={200} />;
}`,
  },
  {
    name: "Slider",
    category: "Base",
    description: "Range slider con track, fill y thumb personalizados.",
    preview: React.createElement(Slider, { label: "Volumen", defaultValue: 60, showValue: true }),
    code: `import { Slider } from "@/components/umbra/slider";

export default function Example() {
  return <Slider label="Volumen" defaultValue={60} showValue />;
}`,
  },
  {
    name: "SearchInput",
    category: "Base",
    description: "Input de búsqueda con ícono, clear y callback onSearch.",
    preview: React.createElement(SearchInput, { placeholder: "Buscar componentes..." }),
    code: `import { SearchInput } from "@/components/umbra/search-input";

export default function Example() {
  return <SearchInput placeholder="Buscar componentes..." onSearch={(q) => console.log(q)} />;
}`,
  },
  {
    name: "NumberInput",
    category: "Base",
    description: "Input numérico con botones de incremento y decremento.",
    preview: React.createElement(NumberInput, { label: "Cantidad", defaultValue: 1, min: 0, max: 99 }),
    code: `import { NumberInput } from "@/components/umbra/number-input";

export default function Example() {
  return <NumberInput label="Cantidad" defaultValue={1} min={0} max={99} />;
}`,
  },
  {
    name: "Chip",
    category: "Base",
    description: "Tag interactivo y removible con variantes de color.",
    preview: React.createElement("div", { style: { display: "flex", gap: 8 } },
      React.createElement(Chip, { label: "React", variant: "accent" }),
      React.createElement(Chip, { label: "Next.js", variant: "default" }),
    ),
    code: `import { Chip } from "@/components/umbra/chip";

export default function Example() {
  return <Chip label="React" variant="accent" onRemove={() => {}} />;
}`,
  },

  // -- Layout ----------------------------------------------------
  {
    name: "Card",
    category: "Layout",
    description: "Contenedor con Header, Content y Footer.",
    preview: React.createElement(
      Card,
      { style: { maxWidth: 280 } },
      React.createElement(CardHeader, null, React.createElement(CardTitle, null, "Nuevo proyecto")),
      React.createElement(CardContent, null, React.createElement("p", { style: { fontSize: 13, color: "#505050" } }, "Plataforma de gestión para equipos."))
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
    name: "Accordion",
    category: "Layout",
    description: "Secciones expandibles con animación suave.",
    preview: React.createElement(Accordion, {
      style: { maxWidth: 320 },
      items: [
        { value: "1", trigger: "¿Qué es Umbra UI?", content: "Una librería de componentes dark luxury." },
        { value: "2", trigger: "¿Es gratuita?", content: "Sí, completamente open source." },
      ],
    } as React.ComponentProps<typeof Accordion>),
    code: `import { Accordion } from "@/components/umbra/accordion";

export default function Example() {
  return (
    <Accordion items={[
      { value: "1", trigger: "¿Qué es?", content: "Una librería dark luxury." },
      { value: "2", trigger: "¿Gratis?", content: "Sí, open source." },
    ]} />
  );
}`,
  },
  {
    name: "Collapsible",
    category: "Layout",
    description: "Sección única expandible o colapsable.",
    preview: React.createElement(Collapsible, {
      trigger: React.createElement("div", { style: { padding: "8px 12px", background: "#181818", borderRadius: 8, color: "#a0a0a0", fontSize: 13 } }, "Ver detalles ?"),
      defaultOpen: true,
    }, React.createElement("p", { style: { fontSize: 13, color: "#505050", paddingTop: 8 } }, "Contenido expandible.")),
    code: `import { Collapsible } from "@/components/umbra/collapsible";

export default function Example() {
  return (
    <Collapsible trigger={<button>Ver detalles</button>}>
      <p>Contenido expandible aquí.</p>
    </Collapsible>
  );
}`,
  },

  // -- Feedback --------------------------------------------------
  {
    name: "Alert",
    category: "Feedback",
    description: "Mensaje de estado con variantes info, success, warning y error.",
    preview: React.createElement(Alert, { variant: "success", title: "Cambios guardados", description: "Tus cambios fueron guardados correctamente." }),
    code: `import { Alert } from "@/components/umbra/alert";

export default function Example() {
  return (
    <Alert
      variant="success"
      title="Cambios guardados"
      description="Tus cambios fueron guardados correctamente."
    />
  );
}`,
  },
  {
    name: "Progress",
    category: "Feedback",
    description: "Barra de progreso animada con variantes de color.",
    preview: React.createElement(Progress, { value: 68, label: "Completado", showValue: true }),
    code: `import { Progress } from "@/components/umbra/progress";

export default function Example() {
  return <Progress value={68} label="Completado" showValue />;
}`,
  },
  {
    name: "Skeleton",
    category: "Feedback",
    description: "Placeholder de carga con soporte para múltiples líneas.",
    preview: React.createElement("div", { style: { width: 240 } },
      React.createElement(Skeleton, { lines: 3 })
    ),
    code: `import { Skeleton, SkeletonText, SkeletonAvatar } from "@/components/umbra/skeleton";

export default function Example() {
  return (
    <div className="flex gap-3">
      <SkeletonAvatar />
      <SkeletonText lines={3} />
    </div>
  );
}`,
  },
  {
    name: "Spinner",
    category: "Feedback",
    description: "Indicador de carga circular con variantes de tamaño.",
    preview: React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "center" } },
      React.createElement(Spinner, { size: "sm" }),
      React.createElement(Spinner, { size: "md" }),
      React.createElement(Spinner, { size: "lg" }),
    ),
    code: `import { Spinner } from "@/components/umbra/spinner";

export default function Example() {
  return <Spinner size="md" label="Cargando..." />;
}`,
  },
  {
    name: "EmptyState",
    category: "Feedback",
    description: "Pantalla vacía con ícono, título y acción opcional.",
    preview: React.createElement(EmptyState, {
      title: "Sin proyectos",
      description: "Creá tu primer proyecto para comenzar.",
      style: { padding: "16px 0" },
    } as React.ComponentProps<typeof EmptyState>),
    code: `import { EmptyState } from "@/components/umbra/empty-state";

export default function Example() {
  return (
    <EmptyState
      title="Sin proyectos"
      description="Creá tu primer proyecto para comenzar."
      action={<Button>Crear proyecto</Button>}
    />
  );
}`,
  },

  // -- Navigation ------------------------------------------------
  {
    name: "Tabs",
    category: "Navigation",
    description: "Pestañas con indicador animado.",
    preview: React.createElement(Tabs, {
      tabs: [
        { value: "a", label: "General", content: React.createElement("p", { style: { fontSize: 13, color: "#505050" } }, "Configuración general") },
        { value: "b", label: "Equipo", content: React.createElement("p", { style: { fontSize: 13, color: "#505050" } }, "Miembros del equipo") },
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
    name: "Breadcrumb",
    category: "Navigation",
    description: "Ruta de navegación con separadores y soporte de links.",
    preview: React.createElement(Breadcrumb, {
      items: [
        { label: "Inicio", href: "/" },
        { label: "Proyectos", href: "/proyectos" },
        { label: "Umbra UI" },
      ],
    }),
    code: `import { Breadcrumb } from "@/components/umbra/breadcrumb";

export default function Example() {
  return (
    <Breadcrumb items={[
      { label: "Inicio", href: "/" },
      { label: "Proyectos", href: "/proyectos" },
      { label: "Umbra UI" },
    ]} />
  );
}`,
  },
  {
    name: "Pagination",
    category: "Navigation",
    description: "Navegación por páginas con elipsis y accesibilidad.",
    preview: React.createElement(Pagination, { page: 3, totalPages: 10, onPageChange: () => {} }),
    code: `import { Pagination } from "@/components/umbra/pagination";

export default function Example() {
  const [page, setPage] = React.useState(1);
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
}`,
  },
  {
    name: "Stepper",
    category: "Navigation",
    description: "Indicador de pasos de un proceso con orientación horizontal y vertical.",
    preview: React.createElement(Stepper, {
      steps: [
        { label: "Datos" },
        { label: "Dirección" },
        { label: "Pago" },
      ],
      currentStep: 1,
    }),
    code: `import { Stepper } from "@/components/umbra/stepper";

export default function Example() {
  return (
    <Stepper
      steps={[{ label: "Datos" }, { label: "Dirección" }, { label: "Pago" }]}
      currentStep={1}
    />
  );
}`,
  },
  {
    name: "DropdownMenu",
    category: "Navigation",
    description: "Menú desplegable anclado a un trigger.",
    preview: React.createElement(DropdownMenu, {
      trigger: React.createElement(Button, { variant: "outline", size: "sm" }, "Opciones"),
      items: [
        { label: "Editar" },
        { label: "Duplicar" },
        { separator: true },
        { label: "Eliminar", destructive: true },
      ],
    }),
    code: `import { DropdownMenu } from "@/components/umbra/dropdown-menu";

export default function Example() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline">Opciones</Button>}
      items={[
        { label: "Editar", onClick: () => {} },
        { separator: true },
        { label: "Eliminar", destructive: true },
      ]}
    />
  );
}`,
  },

  // -- Data ------------------------------------------------------
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
  {
    name: "Table",
    category: "Data",
    description: "Tabla con headers, ordenamiento y rows interactivos.",
    preview: React.createElement(Table, {
      columns: [
        { key: "name", header: "Nombre", sortable: true },
        { key: "role", header: "Rol" },
      ],
      data: [
        { name: "Ana García", role: "Diseñadora" },
        { name: "Carlos López", role: "Dev" },
      ],
    }),
    code: `import { Table } from "@/components/umbra/table";

export default function Example() {
  return (
    <Table
      columns={[{ key: "name", header: "Nombre", sortable: true }, { key: "role", header: "Rol" }]}
      data={[{ name: "Ana García", role: "Diseñadora" }]}
    />
  );
}`,
  },
  {
    name: "Timeline",
    category: "Data",
    description: "Lista de eventos cronológicos con variantes de estado.",
    preview: React.createElement(Timeline, {
      events: [
        { id: "1", title: "Proyecto creado", timestamp: "Hace 3 días", variant: "success" },
        { id: "2", title: "Primera versión", timestamp: "Ayer" },
        { id: "3", title: "Review pendiente", variant: "warning" },
      ],
    }),
    code: `import { Timeline } from "@/components/umbra/timeline";

export default function Example() {
  return (
    <Timeline events={[
      { id: "1", title: "Proyecto creado", timestamp: "Hace 3 días", variant: "success" },
      { id: "2", title: "Primera versión", timestamp: "Ayer" },
    ]} />
  );
}`,
  },
  {
    name: "Kbd",
    category: "Data",
    description: "Tecla de teclado y grupo de combinaciones.",
    preview: React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "center" } },
      React.createElement(Kbd, null, "?"),
      React.createElement(KbdGroup, { keys: ["Ctrl", "Shift", "P"] }),
    ),
    code: `import { Kbd, KbdGroup } from "@/components/umbra/kbd";

export default function Example() {
  return <KbdGroup keys={["?", "K"]} />;
}`,
  },
  {
    name: "CodeBlock",
    category: "Data",
    description: "Bloque de código con número de líneas y botón de copia.",
    preview: React.createElement(CodeBlock, {
      code: `import { Button } from "@/components/umbra/button";

export default function App() {
  return <Button>Hola</Button>;
}`,
      language: "tsx",
      filename: "app.tsx",
      showCopy: true,
    }),
    code: `import { CodeBlock } from "@/components/umbra/code-block";

export default function Example() {
  return (
    <CodeBlock
      code={\`const hello = "world";\`}
      language="ts"
      filename="hello.ts"
    />
  );
}`,
  },
  {
    name: "List",
    category: "Data",
    description: "Lista estilizada con slots de leading, trailing y secundario.",
    preview: React.createElement(List, {
      items: [
        { id: "1", primary: "Umbra Button", secondary: "Componente base" },
        { id: "2", primary: "Umbra Dialog", secondary: "Overlay" },
        { id: "3", primary: "Umbra Table", secondary: "Datos" },
      ],
    }),
    code: `import { List } from "@/components/umbra/list";

export default function Example() {
  return (
    <List items={[
      { id: "1", primary: "Elemento uno", secondary: "Descripción" },
      { id: "2", primary: "Elemento dos" },
    ]} />
  );
}`,
  },
];

export const categories: ComponentCategory[] = ["Base", "Layout", "Navigation", "Data", "Feedback"];
