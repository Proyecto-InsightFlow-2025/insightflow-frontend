import React from 'react';
import { FileText, Plus } from 'lucide-react';

export const Documents: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Documentos</h1>
            <p className="text-slate-600 mt-2">Administra tus documentos aquí</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium">
            <Plus className="w-5 h-5" />
            Nuevo Documento
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <FileText className="w-16 h-16 text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-900">Aún no tienes documentos</h2>
            <p className="text-slate-600 max-w-md">
              Crea tu primer documento para comenzar. Tus documentos aparecerán aquí una vez los crees.
            </p>
            <button className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
              <Plus className="w-4 h-4" />
              Crear Documento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
