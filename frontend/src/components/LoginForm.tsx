import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useAuth } from '../lib/contexts/AuthContext';
import { toast } from 'react-hot-toast';
// Remove ApolloError import if you're not using it
// import { ApolloError } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      error {
        message
      }
    }
  }
`;

export function LoginForm() {
  const { login } = useAuth();
  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      console.error('Mutation error:', error);
      console.error('Network error:', error.networkError);
      console.error('GraphQL errors:', error.graphQLErrors);
      toast.error('Erro ao fazer login. Por favor, tente novamente.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const loginInput = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || ''
    };

    console.log('Attempting login with:', { email: loginInput.email });

    try {
      const response = await loginMutation({
        variables: { loginInput }
      });
      
      console.log('Full response:', response);

      if (response?.data?.login?.access_token) {
        login(response.data.login.access_token);
        toast.success('Login realizado com sucesso!');
      } else if (response?.data?.login?.error) {
        toast.error(`Erro ao fazer login: ${response.data.login.error.message}`);
      } else {
        toast.error('Erro inesperado durante o login');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <div className="mb-4">
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="w-full p-2 border rounded" 
          required 
        />
      </div>
      <div className="mb-4">
        <input 
          type="password" 
          name="password" 
          placeholder="Senha" 
          className="w-full p-2 border rounded" 
          required 
          autoComplete="current-password"
        />
      </div>
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </form>
  );
}
