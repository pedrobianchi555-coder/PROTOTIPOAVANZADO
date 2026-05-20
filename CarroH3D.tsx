import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Rodillo {
  posicion: [number, number, number];
  id: string;
}

const Tubo: React.FC<{
  posicion: [number, number, number];
  rotacion: [number, number, number];
  escala: [number, number, number];
  color: string;
  nombre: string;
}> = ({ posicion, rotacion, escala, color, nombre }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={posicion}
      rotation={rotacion}
      scale={escala}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? '#ffaa00' : color}
        metalness={0.8}
        roughness={0.2}
      />
      <meshStandardMaterial emissive={hovered ? '#ffaa00' : color} />
    </mesh>
  );
};

const Rodillo: React.FC<{
  posicion: [number, number, number];
  id: string;
}> = ({ posicion, id }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={posicion}
      rotation={[Math.PI / 2, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
      <meshStandardMaterial
        color={hovered ? '#00ff88' : '#333333'}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

const PernoBolts: React.FC = () => {
  // Puntos donde van los pernos (4 esquinas por rodillo aproximadamente)
  const posiciones: Array<[number, number, number]> = [
    // Rodillos frontales - izquierda
    [-1.3, 0.8, -1.5], [-0.7, 0.8, -1.5], [-0.1, 0.8, -1.5], [0.5, 0.8, -1.5],
    [1.1, 0.8, -1.5], [1.7, 0.8, -1.5],
    // Rodillos posteriores - izquierda
    [-1.3, 0.8, 1.5], [-0.7, 0.8, 1.5], [-0.1, 0.8, 1.5], [0.5, 0.8, 1.5],
    [1.1, 0.8, 1.5], [1.7, 0.8, 1.5],
  ];

  return (
    <>
      {posiciones.map((pos, idx) => (
        <mesh key={`perno-${idx}`} position={pos}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.7} />
        </mesh>
      ))}
    </>
  );
};

const CarroHScene: React.FC = () => {
  const [showLabels, setShowLabels] = useState(true);

  return (
    <Canvas style={{ width: '100%', height: '100%' }} shadows>
      <PerspectiveCamera makeDefault position={[4, 3, 4]} />
      <OrbitControls makeDefault />

      {/* Iluminación */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />

      {/* Base/Plataforma */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.2, 5]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.6} />
      </mesh>

      {/* ESTRUCTURA PRINCIPAL EN H */}

      {/* Barra horizontal frontal (1.5" x 30cm) */}
      <Tubo
        posicion={[0, 0.5, -1.5]}
        rotacion={[0, 0, 0]}
        escala={[3, 0.15, 0.15]}
        color="#0066ff"
        nombre="Tubo Frontal"
      />

      {/* Barra horizontal posterior (1.5" x 30cm) */}
      <Tubo
        posicion={[0, 0.5, 1.5]}
        rotacion={[0, 0, 0]}
        escala={[3, 0.15, 0.15]}
        color="#0066ff"
        nombre="Tubo Posterior"
      />

      {/* Barras laterales izquierda (conectan frente-posterior) */}
      <Tubo
        posicion={[-1.5, 0.5, 0]}
        rotacion={[0, 0, 0]}
        escala={[0.15, 0.15, 3.2]}
        color="#0088ff"
        nombre="Lateral Izquierda"
      />

      {/* Barras laterales derecha */}
      <Tubo
        posicion={[1.5, 0.5, 0]}
        rotacion={[0, 0, 0]}
        escala={[0.15, 0.15, 3.2]}
        color="#0088ff"
        nombre="Lateral Derecha"
      />

      {/* RODILLOS - Frente (8 rodillos distribuidos) */}
      <Rodillo posicion={[-1.3, 0.8, -1.5]} id="rodillo-f1" />
      <Rodillo posicion={[-0.7, 0.8, -1.5]} id="rodillo-f2" />
      <Rodillo posicion={[-0.1, 0.8, -1.5]} id="rodillo-f3" />
      <Rodillo posicion={[0.5, 0.8, -1.5]} id="rodillo-f4" />
      <Rodillo posicion={[1.1, 0.8, -1.5]} id="rodillo-f5" />
      <Rodillo posicion={[1.7, 0.8, -1.5]} id="rodillo-f6" />

      {/* RODILLOS - Posterior (8 rodillos distribuidos) */}
      <Rodillo posicion={[-1.3, 0.8, 1.5]} id="rodillo-b1" />
      <Rodillo posicion={[-0.7, 0.8, 1.5]} id="rodillo-b2" />
      <Rodillo posicion={[-0.1, 0.8, 1.5]} id="rodillo-b3" />
      <Rodillo posicion={[0.5, 0.8, 1.5]} id="rodillo-b4" />
      <Rodillo posicion={[1.1, 0.8, 1.5]} id="rodillo-b5" />
      <Rodillo posicion={[1.7, 0.8, 1.5]} id="rodillo-b6" />

      {/* ESTRUCTURA VERTICAL para montar el esmeril */}
      <Tubo
        posicion={[0, 1.5, 0]}
        rotacion={[0, 0, 0]}
        escala={[0.1, 1, 0.1]}
        color="#ff6600"
        nombre="Estructura Vertical"
      />

      {/* Placa de montaje del esmeril */}
      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#ff6600" metalness={0.7} />
      </mesh>

      {/* Pernos de montaje */}
      <PernoBolts />

      {/* Grid para referencias */}
      <Grid args={[10, 10]} cellSize={0.5} cellColor="#6f6f6f" sectionSize={2} />

      {/* Info Labels */}
      <htmlContent showLabels={showLabels} />
    </Canvas>
  );
};

const htmlContent: React.FC<{ showLabels: boolean }> = ({ showLabels }) => {
  if (!showLabels) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      color: 'white',
      fontSize: '12px',
      fontFamily: 'monospace',
      background: 'rgba(0,0,0,0.7)',
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '200px',
    }}>
      <div>📏 Medidas Carro H:</div>
      <div>Ancho: 30 cm</div>
      <div>Largo: 50 cm</div>
      <div>Alto: 25 cm</div>
      <div style={{ marginTop: '10px' }}>🔧 Componentes:</div>
      <div>• 4 tubos principales</div>
      <div>• 16 rodillos de precisión</div>
      <div>• 32 pernos M8</div>
      <div>• 1 placa de esmeril</div>
    </div>
  );
};

export const CarroH3D: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#1a1a1a' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[4, 3, 4]} />
        <OrbitControls makeDefault />

        {/* Iluminación */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Base/Plataforma */}
        <mesh position={[0, -1.2, 0]} receiveShadow>
          <boxGeometry args={[3.5, 0.2, 5]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} />
        </mesh>

        {/* ESTRUCTURA PRINCIPAL EN H */}

        {/* Barra horizontal frontal */}
        <Tubo
          posicion={[0, 0.5, -1.5]}
          rotacion={[0, 0, 0]}
          escala={[3, 0.15, 0.15]}
          color="#0066ff"
          nombre="Tubo Frontal"
        />

        {/* Barra horizontal posterior */}
        <Tubo
          posicion={[0, 0.5, 1.5]}
          rotacion={[0, 0, 0]}
          escala={[3, 0.15, 0.15]}
          color="#0066ff"
          nombre="Tubo Posterior"
        />

        {/* Barras laterales */}
        <Tubo
          posicion={[-1.5, 0.5, 0]}
          rotacion={[0, 0, 0]}
          escala={[0.15, 0.15, 3.2]}
          color="#0088ff"
          nombre="Lateral Izquierda"
        />

        <Tubo
          posicion={[1.5, 0.5, 0]}
          rotacion={[0, 0, 0]}
          escala={[0.15, 0.15, 3.2]}
          color="#0088ff"
          nombre="Lateral Derecha"
        />

        {/* RODILLOS FRONTALES */}
        {[-1.3, -0.7, -0.1, 0.5, 1.1, 1.7].map((x) => (
          <Rodillo key={`f-${x}`} posicion={[x, 0.8, -1.5]} id={`rodillo-f-${x}`} />
        ))}

        {/* RODILLOS POSTERIORES */}
        {[-1.3, -0.7, -0.1, 0.5, 1.1, 1.7].map((x) => (
          <Rodillo key={`b-${x}`} posicion={[x, 0.8, 1.5]} id={`rodillo-b-${x}`} />
        ))}

        {/* ESTRUCTURA VERTICAL */}
        <Tubo
          posicion={[0, 1.5, 0]}
          rotacion={[0, 0, 0]}
          escala={[0.1, 1, 0.1]}
          color="#ff6600"
          nombre="Estructura Vertical"
        />

        {/* Placa de montaje */}
        <mesh position={[0, 2.3, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.5]} />
          <meshStandardMaterial color="#ff6600" metalness={0.7} />
        </mesh>

        {/* Pernos */}
        <PernoBolts />

        {/* Grid */}
        <Grid args={[10, 10]} cellSize={0.5} cellColor="#6f6f6f" sectionSize={2} />
      </Canvas>

      {/* Info en esquina */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: 'white',
        fontSize: '12px',
        fontFamily: 'monospace',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '200px',
      }}>
        <div>📏 Carro H - Medidas:</div>
        <div>Ancho: 30 cm</div>
        <div>Largo: 50 cm</div>
        <div>Alto: 25 cm</div>
        <div style={{ marginTop: '10px' }}>🔧 Componentes:</div>
        <div>• 4 tubos principales</div>
        <div>• 16 rodillos de precisión</div>
        <div>• 32 pernos M8</div>
        <div>• Placa de esmeril</div>
      </div>
    </div>
  );
};

export default CarroH3D;
