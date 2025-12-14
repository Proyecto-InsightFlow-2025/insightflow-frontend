import { useEffect, useState } from "react";
import type { Workspace } from "../services/types";
import { workspaceService } from "../services/workspaceContext";
import { Briefcase } from "lucide-react";
import { WorkspaceCard } from "../components/WorkspaceList/WorkspaceCard";
import { WorkspaceDetailModal } from "../components/WorkspaceList/WorkspaceDetailModal";
import { WorkspaceEditModal } from "../components/WorkspaceList/WorkspaceEditModal";



export function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);

  const userId = localStorage.getItem("userId") ?? "";

  useEffect(() => {
    loadSpaces();
  }, []);

  const loadSpaces = async () => {
    setLoading(true);
    try {
      const result = await workspaceService.getAllWorkspacesByOwner(userId);

      if (!result.isSuccess || !Array.isArray(result.data)) {
        setWorkspaces([]);
        return;
      }

      setWorkspaces(result.data.filter(ws => ws.isActive));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Cargando workspaces...</p>;
  }

  return (
    <div className="p-6">
      {/* EMPTY STATE */}
      {workspaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Briefcase className="w-16 h-16 text-slate-400" />
          <h2 className="text-xl font-semibold text-slate-900">
            Aún no tienes Workspaces
          </h2>
          <p className="text-slate-600 max-w-md">
            Crea tu primer Workspace. Tus Workspaces aparecerán aquí.
          </p>
        </div>
      ) : (
        <>
          {/* LIST */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.map(ws => (
              <WorkspaceCard
                key={ws.id}
                workspace={ws}
                onClick={() => setSelectedWorkspaceId(ws.id)}
              />
            ))}
          </ul>
        </>
      )}

      {/* DETAIL MODAL */}
      {selectedWorkspaceId && (
        <WorkspaceDetailModal
          workspaceId={selectedWorkspaceId}
          onClose={() => setSelectedWorkspaceId(null)}
          onEdit={(ws) => {
            setSelectedWorkspaceId(null);
            setEditingWorkspace(ws);
          }}
          onDeleted={() => {
            setSelectedWorkspaceId(null);
            loadSpaces();
          }}
        />
      )}

      {/* EDIT MODAL */}
      {editingWorkspace && (
        <WorkspaceEditModal
          workspace={editingWorkspace}
          onClose={() => setEditingWorkspace(null)}
          onSaved={() => {
            setEditingWorkspace(null);
            loadSpaces();
          }}
        />
      )}

      {/* CREATE MODAL (la isla que ya tenías) */}
      {openCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenCreate(false)}
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Crear Workspace</h2>

            <button
              onClick={() => setOpenCreate(false)}
              className="mt-4 w-full bg-slate-200 py-2 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

