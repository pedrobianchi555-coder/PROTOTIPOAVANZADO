import React, { useState } from 'react';
import CarroH3D from './CarroH3D';
import {
  MATERIALES_CARRO_H,
  ESPECIFICACIONES,
  INSTRUCCIONES_ENSAMBLAJE,
} from './carroHMateriales';
import { Package, Wrench, Zap, FileText } from 'lucide-react';

type Tab = 'visor3d' | 'materiales' | 'especificaciones' | 'instrucciones';

const CarroHProject: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('visor3d');

  const precioTotal = MATERIALES_CARRO_H.reduce(
    (sum, mat) => sum + (mat.precio || 0) * mat.cantidad,
    0
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0066ff 0%, #ff6600 100%)', padding: '20px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          🔧 Carro H - Guía Lineal DIY
        </h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Visualizador 3D y lista de materiales para fabricar una guía lineal para esmeril angular
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#1a1a1a', borderBottom: '2px solid #333' }}>
        {[
          { id: 'visor3d' as const, label: '🎯 Visor 3D', icon: Zap },
          { id: 'materiales' as const, label: '📦 Materiales', icon: Package },
          { id: 'especificaciones' as const, label: '📏 Especificaciones', icon: Wrench },
          { id: 'instrucciones' as const, label: '📖 Instrucciones', icon: FileText },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              padding: '15px 20px',
              border: 'none',
              background: activeTab === id ? '#0066ff' : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === id ? 'bold' : 'normal',
              borderBottom: activeTab === id ? '3px solid #ff6600' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {activeTab === 'visor3d' && (
          <div style={{ height: 'calc(100vh - 200px)' }}>
            <CarroH3D />
          </div>
        )}

        {activeTab === 'materiales' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>📦 Lista de Materiales</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px',
              }}
            >
              {MATERIALES_CARRO_H.map((material) => (
                <div
                  key={material.id}
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '15px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0066ff';
                    e.currentTarget.style.background = '#1a2a3a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.background = '#1a1a1a';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0', color: '#0066ff' }}>
                        {material.nombre}
                      </h3>
                      <p style={{ margin: '0 0 8px 0', color: '#aaa', fontSize: '13px' }}>
                        {material.descripcion}
                      </p>
                    </div>
                    <div
                      style={{
                        background: '#0066ff',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        marginLeft: '10px',
                      }}
                    >
                      {material.cantidad}x
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px' }}>
                    <span style={{ color: '#888' }}>📏 {material.medida}</span>
                    {material.precio && (
                      <span style={{ color: '#ff6600', fontWeight: 'bold' }}>
                        ${(material.precio * material.cantidad).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de costo */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #ff6600 100%)',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '30px',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>💰 Resumen de Costo</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px' }}>Costo Total Estimado:</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  ${precioTotal.toLocaleString()}
                </span>
              </div>
              <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.9 }}>
                * Los precios son estimados y varían según proveedor y ubicación
              </p>
            </div>
          </div>
        )}

        {activeTab === 'especificaciones' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>📏 Especificaciones Técnicas</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '30px',
              }}
            >
              {/* Dimensiones */}
              <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
                <h3 style={{ color: '#0066ff', marginTop: 0 }}>Dimensiones</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Ancho:</span>
                    <strong>{ESPECIFICACIONES.ancho}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Largo:</span>
                    <strong>{ESPECIFICACIONES.largo}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Alto:</span>
                    <strong>{ESPECIFICACIONES.alto}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Peso Aproximado:</span>
                    <strong>{ESPECIFICACIONES.pesoAproximado}</strong>
                  </div>
                </div>
              </div>

              {/* Rendimiento */}
              <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
                <h3 style={{ color: '#ff6600', marginTop: 0 }}>Rendimiento</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <span>Tolerancia de corte:</span>
                    <strong style={{ display: 'block' }}>{ESPECIFICACIONES.tolerancia}</strong>
                  </div>
                  <div>
                    <span>Materiales que corta:</span>
                    <div style={{ marginTop: '5px' }}>
                      {ESPECIFICACIONES.materialCorte.map((mat) => (
                        <div key={mat} style={{ background: '#0066ff', padding: '4px 8px', borderRadius: '4px', marginBottom: '4px', fontSize: '12px' }}>
                          {mat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribución de rodillos */}
            <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 style={{ marginTop: 0, color: '#0088ff' }}>Distribución de Rodillos</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 style={{ margin: '0 0 10px 0' }}>Parte Frontal</h4>
                  <p style={{ margin: 0, color: '#aaa' }}>{ESPECIFICACIONES.distanciaRodillos.frente}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 10px 0' }}>Parte Posterior</h4>
                  <p style={{ margin: 0, color: '#aaa' }}>{ESPECIFICACIONES.distanciaRodillos.posterior}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'instrucciones' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>📖 Instrucciones de Ensamblaje</h2>

            <div
              style={{
                background: '#1a1a1a',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #333',
              }}
            >
              {INSTRUCCIONES_ENSAMBLAJE.map((instruccion, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '15px',
                    paddingBottom: '15px',
                    borderBottom: index < INSTRUCCIONES_ENSAMBLAJE.length - 1 ? '1px solid #333' : 'none',
                  }}
                >
                  <div
                    style={{
                      background: '#0066ff',
                      color: '#fff',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    {index + 1}
                  </div>
                  <p style={{ margin: 0, lineHeight: '1.6', color: '#ccc' }}>
                    {instruccion.split('. ').slice(1).join('. ')}
                  </p>
                </div>
              ))}
            </div>

            {/* Consejos y advertencias */}
            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#1a3a1a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #00ff00' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>✓ Consejos Útiles</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#aaa' }}>
                  <li>Asegúrate de que todos los cortes sean precisos</li>
                  <li>Usa soldadura de calidad para la estructura</li>
                  <li>Lubrica regularmente los rodillos</li>
                  <li>Verifica la escuadría después del ensamblaje</li>
                </ul>
              </div>

              <div style={{ background: '#3a1a1a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ff6600' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#ff6600' }}>⚠️ Advertencias</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#aaa' }}>
                  <li>Usa equipo de seguridad (gafas, guantes)</li>
                  <li>No fuerces el movimiento del carro</li>
                  <li>Verifica estabilidad antes de usar</li>
                  <li>Mantén manos y ropa alejadas del esmeril</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarroHProject;
