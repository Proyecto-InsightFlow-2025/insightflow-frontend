import React, { useState } from "react";
import { Plus } from "lucide-react";
import { WorkspaceList } from "./WorkspaceList";
import { workspaceService } from "../services/workspaceContext";

export const Workspace: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Form state (TODOS obligatorios)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thematicArea, setThematicArea] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [creating, setCreating] = useState(false);

  const userId = localStorage.getItem("userId") ?? "";

  const handleFile = (file: File) => {
    setIconFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setThematicArea("");
    setIconFile(null);
    setPreviewUrl(null);
  };

  const handleCreate = async () => {
    // Validación estricta (todo obligatorio)
    if (!name || !description || !thematicArea || !iconFile || !userId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setCreating(true);

      await workspaceService.createWorkspace({
        name,
        description,
        thematicArea,
        iconURL: iconFile,
        ownerId: userId,
      });

      setOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error al crear workspace");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Workspace</h1>
            <p className="text-slate-600 mt-2">
              Administra tus configuraciones de Workspace
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            <Plus className="w-5 h-5" />
            Nuevo Workspace
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12">
          <WorkspaceList />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Isla flotante */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Crear Workspace</h2>
              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del workspace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Área temática"
                value={thematicArea}
                onChange={(e) => setThematicArea(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              {/* Drag & Drop obligatorio */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    handleFile(file);
                  }
                }}
                onClick={() =>
                  document.getElementById("iconInput")?.click()
                }
                className={`
                  flex flex-col items-center justify-center
                  border-2 border-dashed rounded-xl p-6 cursor-pointer transition
                  ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 hover:border-slate-400"
                  }
                `}
              >
                {!previewUrl ? (
                  <>
                    <p className="text-sm text-slate-600 text-center">
                      Arrastra una imagen aquí o{" "}
                      <span className="text-blue-600 font-medium">
                        haz clic para seleccionar
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Ícono obligatorio (PNG, JPG, SVG)
                    </p>
                  </>
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                <input
                  id="iconInput"
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>

              <button
                onClick={handleCreate}
                disabled={
                  creating ||
                  !name ||
                  !description ||
                  !thematicArea ||
                  !iconFile
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {creating ? "Creando..." : "Crear Workspace"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
