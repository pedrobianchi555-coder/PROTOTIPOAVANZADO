export interface Material {
  id: string;
  nombre: string;
  cantidad: number;
  medida: string;
  descripcion: string;
  precio?: number;
}

export const MATERIALES_CARRO_H: Material[] = [
  {
    id: "tubo-1-5",
    nombre: "Tubo cuadrado/rectangular 1½ x 1½ pulgadas",
    cantidad: 4,
    medida: "30 cm",
    descripcion: "Estructura principal horizontal (frente y posterior)",
    precio: 25000,
  },
  {
    id: "tubo-lateral",
    nombre: "Tubo cuadrado/rectangular 1½ x 1½ pulgadas",
    cantidad: 2,
    medida: "20 cm",
    descripcion: "Estructura lateral (conecta frente y posterior)",
    precio: 15000,
  },
  {
    id: "tubo-vertical",
    nombre: "Tubo cuadrado/rectangular 1 x 1 pulgada",
    cantidad: 2,
    medida: "15 cm",
    descripcion: "Estructura vertical (sostiene al esmeril)",
    precio: 10000,
  },
  {
    id: "rodillos",
    nombre: "Rodillos/ruedas de precisión (bearing wheels)",
    cantidad: 16,
    medida: "10 mm diámetro",
    descripcion: "8 rodillos frente + 8 rodillos posterior. Deben ser de precisión para movimiento suave",
    precio: 5000,
  },
  {
    id: "pernos-m8",
    nombre: "Pernos/tornillos hexagonales M8",
    cantidad: 32,
    medida: "40 mm largo",
    descripcion: "Para fijar rodillos y estructura (4 por rodillo)",
    precio: 500,
  },
  {
    id: "tuercas-m8",
    nombre: "Tuercas hexagonales M8",
    cantidad: 32,
    medida: "Estándar",
    descripcion: "Para asegurar pernos",
    precio: 200,
  },
  {
    id: "arandelas-m8",
    nombre: "Arandelas M8",
    cantidad: 64,
    medida: "Estándar",
    descripcion: "Para distribuir presión (2 por perno)",
    precio: 100,
  },
  {
    id: "soldadura",
    nombre: "Varilla de soldadura",
    cantidad: 1,
    medida: "1 kg",
    descripcion: "Para soldar la estructura base (tubo en H)",
    precio: 30000,
  },
  {
    id: "riel-lineal",
    nombre: "Riel lineal de precisión (V-slot o similar)",
    cantidad: 2,
    medida: "30 cm",
    descripcion: "Opcional: para guiado más preciso del esmeril",
    precio: 50000,
  },
  {
    id: "placa-amoladora",
    nombre: "Placa de montaje para esmeril angular",
    cantidad: 1,
    medida: "Personalizado",
    descripcion: "Placa de acero para montar el esmeril angular en la estructura vertical",
    precio: 40000,
  },
  {
    id: "pernos-ajuste",
    nombre: "Pernos de ajuste/nivelación",
    cantidad: 4,
    medida: "M10 x 30 mm",
    descripcion: "Para ajustar y nivelar la posición del carro",
    precio: 2000,
  },
  {
    id: "acero-plano",
    nombre: "Placa de acero plano (base)",
    cantidad: 1,
    medida: "30 cm x 50 cm x 1 cm",
    descripcion: "Base de apoyo para el carro H",
    precio: 60000,
  },
  {
    id: "lubricante",
    nombre: "Lubricante industrial (NLGI 2)",
    cantidad: 1,
    medida: "500 ml",
    descripcion: "Para engrasar rodillos y puntos de fricción",
    precio: 15000,
  },
];

export const ESPECIFICACIONES = {
  ancho: "30 cm",
  largo: "50 cm",
  alto: "25 cm",
  pesoAproximado: "15-18 kg",
  velocidadMaxima: "Variable según motor del esmeril",
  materialCorte: ["Porcelanato", "Baldosas cerámicas", "Láminas de hierro", "Acero fino", "Vidrio"],
  tolerancia: "±2 mm en corte recto",
  distanciaRodillos: {
    frente: "Distribuidos en 30 cm",
    posterior: "Distribuidos en 30 cm",
  },
};

export const INSTRUCCIONES_ENSAMBLAJE = [
  "1. Preparar y cortar todos los tubos a medida",
  "2. Soldar la estructura base en forma de H (3 tubos principales)",
  "3. Soldarse las secciones laterales para conectar frente y posterior",
  "4. Perforar agujeros de 8 mm para montaje de rodillos (equidistantes)",
  "5. Montar rodillos con pernos, tuercas y arandelas",
  "6. Instalar placa base de acero",
  "7. Montar placa de esmeril en estructura vertical",
  "8. Ajustar y nivelar el carro con tornillos de nivelación",
  "9. Lubricar todos los rodillos",
  "10. Realizar prueba de movimiento en vacio",
];
