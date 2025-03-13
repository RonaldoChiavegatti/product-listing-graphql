import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';

const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      access_token
    }
  }
`;

export function RegisterForm() {
  const [register] = useMutation(REGISTER);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      console.log('Enviando dados:', {
        email: formData.get('email'),
        password: formData.get('password')
      });

      const response = await register({
        variables: {
          registerInput: {
            email: formData.get('email'),
            password: formData.get('password')
          }
        }
      });

      console.log('Resposta completa:', response);
      
      // Se tiver erros na resposta
      if (response.errors) {
        console.error('Erros GraphQL:', response.errors);
        setError(response.errors[0]?.message || 'Erro desconhecido');
        return;
      }
      
      if (response.data?.register?.access_token) {
        localStorage.setItem('token', response.data.register.access_token);
        window.location.href = '/registration-success';
      } else {
        console.error('Estrutura da resposta:', response.data);
        setError('Resposta inválida do servidor');
      }
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      setError(error.message || 'Erro ao registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      {error && (
        <div className="text-red-500 mb-4" role="alert">
          {error}
        </div>
      )}
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        className="w-full p-2 mb-4 border rounded" 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Senha" 
        className="w-full p-2 mb-4 border rounded" 
        required 
      />
      <button 
        type="submit" 
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Registrar
      </button>
    </form>
  );
}
