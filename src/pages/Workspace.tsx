import React from 'react';
import { Briefcase, Plus } from 'lucide-react';

export const Workspace: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Workspace</h1>
            <p className="text-slate-600 mt-2">Administra tus configuraciones de Workspace</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium">
            <Plus className="w-5 h-5" />
            Nuevo Workspace
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Briefcase className="w-16 h-16 text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-900">Aún no tienes Workspaces</h2>
            <p className="text-slate-600 max-w-md">
              Crea tu primer Workspace. Tus Workspaces aparecerán aquí una vez comiences a crearlos.
            </p>
            <button className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
              <Plus className="w-4 h-4" />
              Crear Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
