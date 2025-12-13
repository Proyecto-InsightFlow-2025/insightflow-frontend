import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentService } from '../services';
import type { Document, UpdateDocumentDto } from '../services/types';

export default function DocumentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [contentJson, setContentJson] = useState('');

  useEffect(() => {
    if (id) fetchDoc(id);
  }, [id]);

  const fetchDoc = async (docId: string) => {
    try {
      const data = await documentService.getDocumentById(docId);
      setDocument(data);
      setTitle(data.title);
      setIcon(data.icon);
      const initialContent = data.content.length === 0 ? [{}] : data.content;
      setContentJson(JSON.stringify(initialContent, null, 2));
    } catch (error) {
      console.error(error);
      alert('Error al cargar documento');
      navigate('/documents');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!id) return;
    
    setSaving(true);
    try {
      let parsedContent = [];
      try {
        parsedContent = JSON.parse(contentJson);
      } catch (e) {
        alert('El contenido no es un JSON válido');
        setSaving(false);
        return;
      }

      const updateData: UpdateDocumentDto = {
        title,
        icon,
        content: parsedContent
      };

      const updatedDoc = await documentService.updateDocument(id, updateData);
      setDocument(updatedDoc);
      alert('¡Guardado correctamente!');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('¿Seguro que quieres eliminar este documento?')) return;
    
    try {
      await documentService.deleteDocument(id);
      navigate('/documents');
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (!document) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button 
        onClick={() => navigate('/documents')}
        className="text-indigo-600 mb-4 hover:underline"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex gap-4 items-start">
          <div className="flex-1">
             <label className="block text-xs text-gray-400 mb-1">Título</label>
             <input 
               type="text" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="text-2xl font-bold w-full border-b border-transparent hover:border-gray-300 focus:border-indigo-500 outline-none px-1"
             />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 text-center">Icono</label>
            <input 
               type="text" 
               value={icon}
               onChange={(e) => setIcon(e.target.value)}
               className="text-3xl w-16 text-center border rounded p-1"
               maxLength={2}
             />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Contenido (JSON)
           </label>
           <textarea
             rows={10}
             value={contentJson}
             onChange={(e) => setContentJson(e.target.value)}
             className="w-full font-mono text-sm border rounded p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
           />
           <p className="text-xs text-gray-500 mt-1">
             Edita la estructura JSON directamente (simulación de editor de bloques).
           </p>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 font-medium px-4 py-2"
          >
            Eliminar Documento
          </button>
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}