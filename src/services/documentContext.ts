import { getHeaders } from "./helpers";
import type { Document, CreateDocumentDto, UpdateDocumentDto } from './types';

const DOCUMENTS_API_URL = "https://document-service-backend.onrender.com";

/**
 * Servicios relacionados con la gestión de documentos.
 */
export const documentService = {

    /**
     * Obtiene todos los documentos.
     * @returns Una promesa que resuelve a una lista de documentos.
     */
    getAllDocuments: async (): Promise<Document[]> => {
        const response = await fetch(`${DOCUMENTS_API_URL}/documents`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Error al obtener los documentos');
        }
        return response.json();
    },
    /**
     * Obtiene un documento por su ID.
     * @param id ID del documento.
     * @returns Una promesa que resuelve al documento.
     */
    getDocumentById: async (id: string): Promise<Document> => {
        const response = await fetch(`${DOCUMENTS_API_URL}/documents/${id}`,{
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Documento no encontrado');
        }
        return response.json(); 
    }, 
    /**
     * Crea un nuevo documento.
     * @param data Datos del documento a crear.
     * @returns Una promesa que resuelve al documento creado.
     */
    createDocument: async (data: CreateDocumentDto): Promise<Document> => {
        const response = await fetch(`${DOCUMENTS_API_URL}/documents`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al crear documento');
        }
        return response.json();
    },
    /**
     * Actualiza un documento existente.
     * @param id ID del documento a actualizar.
     * @param data Datos para actualizar el documento.
     * @returns Una promesa que resuelve al documento actualizado.
     */
    updateDocument: async (id: string, data: UpdateDocumentDto): Promise<Document> => {
        const response = await fetch(`${DOCUMENTS_API_URL}/documents/${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al actualizar documento');
        }
        return response.json();
    },
    /**
     * Elimina un documento por su ID.
     * @param id ID del documento a eliminar.
     * @returns Una promesa que resuelve a true si la eliminación fue exitosa.
     */
    deleteDocument: async (id: string): Promise<boolean> => {
        const response = await fetch(`${DOCUMENTS_API_URL}/documents/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error('Error al eliminar documento');
        }
        return true;
    },
};

