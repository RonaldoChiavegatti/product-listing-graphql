import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, GET_PRODUCTS } from '../lib/graphql/products';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../lib/contexts/AuthContext';
import { CreateProductInput } from '../lib/types/product';

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const { token } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateProductInput>({
    defaultValues: {
      disponivel: true
    }
  });

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    },
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      toast.success('Produto criado com sucesso!');
      reset();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(`Erro ao criar produto: ${error.message}`);
    }
  });

  const onSubmit = async (data: CreateProductInput) => {
    try {
      // Convert string with comma to float
      const valorString = data.valor.toString().replace(',', '.');
      const valorFloat = parseFloat(valorString);

      if (isNaN(valorFloat)) {
        toast.error('Valor inválido. Use números e vírgula para decimais.');
        return;
      }

      const formattedData = {
        ...data,
        valor: valorFloat,
        disponivel: data.disponivel === 'true' || data.disponivel === true
      };

      await createProduct({
        variables: {
          createProductDto: formattedData
        }
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
          Nome do produto
        </label>
        <input
          type="text"
          id="product-name"
          {...register('nome', { required: 'Nome é obrigatório' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
          Descrição do produto
        </label>
        <textarea
          id="product-description"
          {...register('descricao', { required: 'Descrição é obrigatória' })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
          Valor do produto
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="text"
            inputMode="decimal"
            id="product-price"
            {...register('valor', { 
              required: 'Valor é obrigatório',
              pattern: {
                value: /^\d+(?:[,.]\d{0,2})?$/,
                message: 'Valor inválido. Use números e vírgula para decimais (ex: 10,50)'
              },
              validate: {
                positive: (value) => parseFloat(value.toString().replace(',', '.')) > 0 || 'Valor deve ser maior que 0'
              }
            })}
            placeholder="0,00"
            className="block w-full rounded-md border-gray-300 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.valor && (
          <p className="mt-1 text-sm text-red-600">{errors.valor.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Disponível para venda
        </label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              id="product-available-yes"
              {...register('disponivel')}
              value="true"
              defaultChecked
              className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2">Sim</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              id="product-available-no"
              {...register('disponivel')}
              value="false"
              className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2">Não</span>
          </label>
        </div>
      </div>

      <div className="pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Criando...' : 'Criar Produto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm; 