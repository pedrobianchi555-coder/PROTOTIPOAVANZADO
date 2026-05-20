# 📖 Cómo Usar el Proyecto Carro H

## Opción 1: Como Componente Independiente en React

### Instalación de Dependencias Necesarias

```bash
npm install three @react-three/fiber @react-three/drei
```

### Uso en tu Aplicación React

```tsx
import { CarroHProject } from '../projects/CarroH';

export default function App() {
  return (
    <div>
      <CarroHProject />
    </div>
  );
}
```

### Ejemplo Completo

```tsx
import React from 'react';
import { CarroHProject } from './projects/CarroH';

function App() {
  return (
    <div className="app">
      <CarroHProject />
    </div>
  );
}

export default App;
```

## Opción 2: Importar Componentes Individuales

```tsx
import { CarroH3D } from '../projects/CarroH';
import { MATERIALES_CARRO_H, ESPECIFICACIONES } from '../projects/CarroH';

// Usar el visualizador 3D directamente
<CarroH3D />

// Usar los datos de materiales
console.log(MATERIALES_CARRO_H);
console.log(ESPECIFICACIONES);
```

## Opción 3: Crear tu Propia Interfaz

Puedes usar los datos y componentes por separado para crear una interfaz personalizada:

```tsx
import { 
  MATERIALES_CARRO_H, 
  ESPECIFICACIONES, 
  INSTRUCCIONES_ENSAMBLAJE 
} from '../projects/CarroH/carroHMateriales';

function MisEspecificaciones() {
  return (
    <div>
      <h1>Mi Carro H</h1>
      <p>Ancho: {ESPECIFICACIONES.ancho}</p>
      <p>Largo: {ESPECIFICACIONES.largo}</p>
      <ul>
        {MATERIALES_CARRO_H.map(material => (
          <li key={material.id}>
            {material.nombre} - {material.cantidad}x {material.medida}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Estructura de Archivos

```
projects/CarroH/
├── index.ts                    # Punto de entrada
├── CarroHProject.tsx           # Componente principal con UI
├── CarroH3D.tsx                # Visualizador 3D
├── carroHMateriales.ts         # Datos y especificaciones
├── README.md                   # Documentación
└── USAGE.md                    # Este archivo
```

## Datos Disponibles

### MATERIALES_CARRO_H
Array con 12 materiales incluyendo:
- Tubos cuadrados
- Rodillos de precisión
- Pernos y tuercas
- Soldadura
- Placa de montaje
- Y más...

Cada material contiene:
```typescript
{
  id: string;
  nombre: string;
  cantidad: number;
  medida: string;
  descripcion: string;
  precio?: number;
}
```

### ESPECIFICACIONES
Objeto con especificaciones técnicas:
```typescript
{
  ancho: "30 cm",
  largo: "50 cm",
  alto: "25 cm",
  pesoAproximado: "15-18 kg",
  tolerancia: "±2 mm en corte recto",
  materialCorte: [...],
  distanciaRodillos: {...}
}
```

### INSTRUCCIONES_ENSAMBLAJE
Array con 10 pasos de ensamblaje paso a paso.

## Notas Importantes

- **Proyecto Independiente**: Este proyecto está completamente aislado y puede usarse en cualquier aplicación React
- **Dependencias Obligatorias**: Requiere `three`, `@react-three/fiber` y `@react-three/drei`
- **Sin Dependencias Externas Adicionales**: No requiere Supabase, MQTT, XLSX u otras librerías del proyecto principal
- **TypeScript Compatible**: Todo el código está en TypeScript para mayor seguridad de tipos

## Soporte

Para más información sobre el visualizador 3D, consulta:
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Documentation](https://drei.pmnd.rs/)
