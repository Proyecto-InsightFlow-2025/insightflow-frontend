import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { documentService } from '../services';
import { ArrowLeft, FileText, Loader } from 'lucide-react';

export default function CreateDocumentPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('📄');
  const [workspaceId, setWorkspaceId] = useState('3fa85f64-5717-4562-b3fc-2c963f66afa6'); // ID placeholder de workspace
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newDoc = await documentService.createDocument({
        title,
        icon,
        workspace_id: workspaceId,
      });
      navigate(`/documents/${newDoc.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear documento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/documents')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a documentos
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Nuevo Documento</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Título del documento
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Plan de negocios Q1 2025"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Icono (emoji)
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="📄"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-2xl"
                maxLength={2}
              />
              <p className="text-xs text-slate-500 mt-1">
                Usa un emoji para identificar tu documento
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Workspace ID
              </label>
              <input
                type="text"
                value={workspaceId}
                onChange={(e) => setWorkspaceId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-mono text-sm"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                ID del workspace al que pertenece este documento
              </p>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/documents')}
                className="flex-1 px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  'Crear Documento'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}