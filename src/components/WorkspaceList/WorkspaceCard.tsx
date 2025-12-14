import type { Workspace } from "../../services/types";

interface Props {
  workspace: Workspace;
  onClick: () => void;
}

export const WorkspaceCard: React.FC<Props> = ({ workspace, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer border rounded-xl p-4 hover:shadow-md transition bg-white"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg">{workspace.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {workspace.description}
          </p>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-400">
        Área: {workspace.thematicArea}
      </div>
    </li>
  );
};
