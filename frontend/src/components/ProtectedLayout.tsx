import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-green-600">Sistema de Produtos</h1>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="text-red-600 hover:text-red-800"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 