import React from 'react';
import { Product } from '../types';
import { CloseIcon } from './Icons';

interface ProductCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const ProductCatalogModal: React.FC<ProductCatalogModalProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-amber-900">Product Catalog</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
                <p className="font-semibold">Your catalog is empty.</p>
                <p className="mt-2 text-sm">Start by describing your products to VAANI.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-stone-50 border border-stone-200 rounded-lg overflow-hidden flex flex-col group transition-shadow hover:shadow-lg">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-stone-800">{product.name}</h3>
                    <p className="text-sm text-stone-600 mt-1 flex-grow">{product.description}</p>
                    <div className="mt-4 pt-4 border-t border-stone-200 flex justify-center">
                        <img src={product.qrCodeUrl} alt={`QR Code for ${product.name}`} className="w-24 h-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCatalogModal;