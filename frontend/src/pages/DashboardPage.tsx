import React from 'react';
import { useQuery } from '@apollo/client';
import ProductList from '../components/ProductList';
import { GET_PRODUCTS } from '../lib/graphql/products';
import { toast } from 'react-hot-toast';
import { useAuth } from '../lib/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const { data, loading } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    },
    onError: (error) => {
      console.error('Query error details:', error);
      if (error.message.includes('Unauthorized')) {
        navigate('/login');
      } else {
        toast.error('Erro ao carregar produtos. Tente novamente.');
      }
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ProductList products={data?.products || []} />
      </div>
    </div>
  );
}; 