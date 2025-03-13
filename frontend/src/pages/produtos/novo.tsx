import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm';
import Navbar from '../../components/Navbar';

const NovoProdutoPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Novo Produto</h2>
          <ProductForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default NovoProdutoPage; 