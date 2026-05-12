import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card, CardContent } from '../components/Card';
import { Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('Error en el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cacao-600 to-cacao-900 flex items-center justify-center p-lg">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">CACAO SAN JOSE</h1>
          <p className="text-cacao-100">Sistema de Gestión Empresarial</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardContent className="p-2xl">
            <form onSubmit={handleLogin} className="space-y-lg">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gris-700 mb-3">
                  <Mail className="inline mr-2" size={16} />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="input"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gris-700 mb-3">
                  <Lock className="inline mr-2" size={16} />
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-md bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gris-700">Recuérdame</span>
                </label>
                <a href="#" className="text-cacao-600 hover:text-cacao-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-4 pt-lg border-t border-gris-200 text-center text-sm text-gris-600">
              <p>¿No tienes cuenta? <a href="#" className="text-cacao-600 hover:text-cacao-700 font-medium">Solicita acceso</a></p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-2xl text-center text-cacao-100 text-sm">
          <p>© 2026 CACAO SAN JOSE C.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};
