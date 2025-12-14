import { useState } from "react";
import {Image as ImageIcon } from "lucide-react";
import type { Workspace, EditWorkspaceDTO } from "../../services/types";
import { workspaceService } from "../../services/workspaceContext";

interface Props {
  workspace: Workspace;
  onClose: () => void;
  onSaved: () => void;
}

export const WorkspaceEditModal: React.FC<Props> = ({
  workspace,
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description);
  const [thematicArea, setThematicArea] = useState(workspace.thematicArea);

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    workspace.iconURL || null
  );

  const handleFile = (file: File) => {
    setIconFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const data: EditWorkspaceDTO = {};

    if (name !== workspace.name) data.name = name;
    if (description !== workspace.description)
      data.description = description;
    if (thematicArea !== workspace.thematicArea)
      data.thematicArea = thematicArea;
    if (iconFile) data.iconURL = iconFile;

    await workspaceService.editWorkspace(workspace.id, data);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Editar Workspace</h2>

        <div className="space-y-4">
          {/* Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Thematic Area */}
          <input
            value={thematicArea}
            onChange={(e) => setThematicArea(e.target.value)}
            placeholder="Área temática"
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* IMAGE UPLOAD */}
          <div
            className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
            onClick={() =>
              document.getElementById("edit-icon-input")?.click()
            }
          >
            <input
              id="edit-icon-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-24 w-24 object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm">
                  Arrastra una imagen o haz click
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-100"
          >
            Salir
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-200"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};
