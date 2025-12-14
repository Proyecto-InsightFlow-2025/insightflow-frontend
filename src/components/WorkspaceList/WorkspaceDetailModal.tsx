import { useEffect, useState } from "react";
import {
  Pencil,
  Trash,
  Users,
  Calendar,
  User,
  BadgeCheck,
  BadgeX,
} from "lucide-react";
import { workspaceService } from "../../services/workspaceContext";
import type { Workspace } from "../../services/types";

interface Props {
  workspaceId: string;
  onClose: () => void;
  onEdit: (workspace: Workspace) => void;
  onDeleted: () => void;
}

export const WorkspaceDetailModal: React.FC<Props> = ({
  workspaceId,
  onClose,
  onEdit,
  onDeleted,
}) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        const res = await workspaceService.getWorkspaceById(workspaceId);

        if (res.data) {
          setWorkspace({
            ...res.data,
            members: Array.isArray(res.data.members)
              ? res.data.members
              : [],
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspace();
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 shadow">
          Cargando workspace...
        </div>
      </div>
    );
  }

  if (!workspace) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex items-center gap-4">
            {workspace.iconURL ? (
              <img
                src={workspace.iconURL}
                alt="Workspace icon"
                className="w-14 h-14 rounded-xl object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                WS
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold">{workspace.name}</h2>
              <p className="text-sm text-slate-500">
                {workspace.thematicArea}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(workspace)}
              className="p-2 rounded hover:bg-slate-100"
              title="Editar"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              onClick={async () => {
                if (!confirm("¿Eliminar este workspace?")) return;
                await workspaceService.deleteWorkspace(workspace.id);
                onDeleted();
              }}
              className="p-2 rounded hover:bg-red-100 text-red-600"
              title="Eliminar"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* STATUS */}
        <div className="mb-4">
          {workspace.isActive ? (
            <span className="inline-flex items-center gap-1 text-sm text-green-600">
              <BadgeCheck className="w-4 h-4" /> Workspace activo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm text-red-600">
              <BadgeX className="w-4 h-4" /> Workspace inactivo
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-slate-700 mb-6">{workspace.description}</p>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">Owner ID:</span>
            <span className="truncate">{workspace.ownerId}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">
              Miembros ({workspace.members.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">
              Creado el{" "}
              {new Date(workspace.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">ID:</span>
            <span className="truncate">{workspace.id}</span>
          </div>
        </div>

        {/* MEMBERS LIST */}
        {workspace.members.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Miembros</h3>
            <ul className="max-h-32 overflow-y-auto border rounded-lg p-2 space-y-1 text-sm">
              {workspace.members.map((member, index) => (
                <li
                  key={index}
                  className="px-2 py-1 rounded bg-slate-100"
                >
                  {member}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
