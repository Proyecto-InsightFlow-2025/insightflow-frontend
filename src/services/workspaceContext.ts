import { getHeaders } from "./helpers";
import type {Workspace, CreateWorkspaceDTO, EditWorkspaceDTO, WPApiResponse} from './types';


const WORKSPACE_API_URL = "https://insightflow-workspace-service-qw4p.onrender.com";

export const workspaceService = {

    getAllWorkspacesByOwner: async (ownerId: string): Promise<WPApiResponse<Workspace[]>> => {
        const response = await fetch(`${WORKSPACE_API_URL}/workspaces?ownerId=${ownerId}`, {
            method: "GET",
            headers: getHeaders()
        });
        return response.json();
    },

    getWorkspaceById: async (id: string): Promise<WPApiResponse<Workspace>> => {
        const response = await fetch(`${WORKSPACE_API_URL}/workspaces/${id}`,{
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) { 
            throw new Error('Espacio de trabajo no encontrado');
        }
        return response.json(); 
    },

    createWorkspace: async (data: CreateWorkspaceDTO): Promise<WPApiResponse<Workspace>> => {
        const form = new FormData();
        form.append('name', data.name);
        form.append('description', data.description);
        form.append('thematicArea', data.thematicArea);
        form.append('iconURL', data.iconURL);
        form.append('ownerId', data.ownerId);

        const response = await fetch(`${WORKSPACE_API_URL}/workspaces`, {
            method: 'POST',
            body: form
        }); 
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al crear espacio de trabajo');
        }
        return response.json();
    },

    editWorkspace: async (id: string, data: EditWorkspaceDTO): Promise<WPApiResponse<Workspace>> => {
        const form = new FormData();
        if(data.name) form.append('name', data.name);
        if(data.description) form.append('description', data.description);
        if(data.thematicArea) form.append('thematicArea', data.thematicArea);
        if(data.iconURL) form.append('iconURL', data.iconURL);
        const response = await fetch(`${WORKSPACE_API_URL}/workspaces/${id}`, {
            method: 'PATCH',
            body: form
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al actualizar espacio de trabajo');
        }
        return response.json();
    },

    deleteWorkspace: async (id: string): Promise<WPApiResponse<Workspace>> => {
        const response = await fetch(`${WORKSPACE_API_URL}/workspaces/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al eliminar espacio de trabajo');
        }
        return response.json();
    }

}