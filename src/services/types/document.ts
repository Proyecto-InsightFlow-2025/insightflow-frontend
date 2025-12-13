export interface Document {
    id: string;
    title: string;
    content: Array<object>;
    icon: string;
    soft_deleted: boolean;
}

export interface CreateDocumentDto {
  title: string;
  workspace_id: string;
  icon?: string;
}

export interface UpdateDocumentDto {
  title?: string;
  icon?: string;
  content?: Array<object>;
}