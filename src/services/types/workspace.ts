export interface Workspace {
    id: string;
    name: string;
    description: string;
    thematicArea:string;
    iconURL: string;
    createdAt: string;
    ownerId: string;
    members: string[];
    isActive: boolean;  
}

export interface CreateWorkspaceDTO{
    name: string;
    description: string;
    thematicArea:string;
    iconURL: File;
    ownerId: string;
}

export interface EditWorkspaceDTO{
    name?: string;
    description?: string;
    thematicArea?:string;
    iconURL?: File;
}   

export interface WPApiResponse<T> {
  isSuccess?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
}