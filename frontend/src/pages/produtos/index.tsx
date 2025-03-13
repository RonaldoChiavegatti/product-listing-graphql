import ProductForm from '../../components/ProductForm';
import { ProtectedLayout } from '../../components/ProtectedLayout';

export default function ProdutosPage() {
  return (
    <ProtectedLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Cadastrar Novo Produto</h2>
        <ProductForm onSuccess={() => {
          // Adicione aqui qualquer lógica após o sucesso
        }} />
      </div>
    </ProtectedLayout>
  );
}