import { getHeaders } from "./helpers";
import type { Document, CreateDocumentDto, UpdateDocumentDto } from './types';

const DOCUMENTS_API_URL = "https://document-service-backend.onrender.com";

export const documentService = {

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

