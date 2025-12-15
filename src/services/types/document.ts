/**
 * Representa um documento en el sistema.
 */
export interface Document {
    id: string;
    title: string;
    content: Array<object>;
    icon: string;
    soft_deleted: boolean;
}
/**
 * Datos necesarios para crear un nuevo documento.
 */
export interface CreateDocumentDto {
  title: string;
  workspace_id: string;
  icon?: string;
}

/**
 * Datos para actualizar un documento existente.
 */
export interface UpdateDocumentDto {
  title?: string;
  icon?: string;
  content?: Array<object>;
}