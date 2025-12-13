import { useEffect, useState } from 'react';
import { documentService } from '../services';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import { type Document } from '../services/types';

export default function DocumentsListPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const data = await documentService.getAllDocuments();
      const activeDocuments = data.filter(doc => !doc.soft_deleted);
      setDocuments(activeDocuments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-600">Cargando documentos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mis Documentos</h1>
            <p className="text-slate-600 mt-2">Administra tus documentos aquí</p>
          </div>
          <Link 
            to="/documents/new" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Nuevo Documento
          </Link>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <FileText className="w-16 h-16 text-slate-400" />
              <h2 className="text-xl font-semibold text-slate-900">Aún no tienes documentos</h2>
              <p className="text-slate-600 max-w-md">
                Crea tu primer documento para comenzar. Tus documentos aparecerán aquí una vez los crees.
              </p>
              <Link
                to="/documents/new"
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Crear Documento
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <Link key={doc.id} to={`/documents/${doc.id}`}>
                <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white cursor-pointer h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{doc.icon}</span>
                    <h2 className="font-semibold text-lg truncate">{doc.title}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-auto">
                    ID: {doc.id.slice(0, 8)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}