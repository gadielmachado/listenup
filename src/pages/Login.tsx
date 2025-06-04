import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Zap, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BlurFade from '../components/ui/blur-fade';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { MagicCard } from '../components/ui/magic-card';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Conta criada! Verifique seu email para confirmar.');
        }
      }
    } catch (err: any) {
      setError('Erro inesperado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <BlurFade delay={0.1}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">ListenUp!</h1>
            <p className="text-blue-100">
              {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
            </p>
          </div>
        </BlurFade>

        {/* Login Form */}
        <BlurFade delay={0.2}>
          <MagicCard className="p-8 bg-white/95 backdrop-blur-lg border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Toggle Buttons */}
              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isLogin
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    !isLogin
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              {/* Submit Button */}
              <ShimmerButton
                type="submit"
                disabled={loading}
                background="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                className="w-full p-4 flex items-center justify-center gap-3 disabled:opacity-50"
                shimmerColor="#ffffff"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? <ArrowRight className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    <span className="font-medium">
                      {isLogin ? 'Entrar' : 'Criar Conta'}
                    </span>
                  </>
                )}
              </ShimmerButton>

              {/* Toggle Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin
                    ? 'Não tem uma conta? Crie agora'
                    : 'Já tem uma conta? Entre aqui'
                  }
                </button>
              </div>
            </form>
          </MagicCard>
        </BlurFade>

        {/* Footer */}
        <BlurFade delay={0.3}>
          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm">
              Domine o inglês com inteligência artificial
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default Login; 