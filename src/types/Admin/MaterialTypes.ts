import { Material } from '../material';
import { ServiceResponse } from './ServiceTypes';
import { DatosPorMes } from '../../hooks/admin/metricsServices';

export type MaterialResponse = ServiceResponse<Material>;

export type MaterialsListResponse = ServiceResponse<Material[]>;

export interface MaterialCreateParams {
  type: Material['type'];
  title: string;
  description: string;
  url: string;
  size_bytes?: number;
  mime_type?: string;
}

export interface MaterialUpdateParams {
  id: number;
  material: Partial<Material>;
}

export interface MaterialDeleteResponse extends ServiceResponse {
  id: number;
}

export interface MaterialFilterParams {
  type?: string;
  searchTerm?: string;
}

export type MaterialUploadResponse = ServiceResponse<{
  url: string;
  size_bytes: number;
  mime_type: string;
}>;

// Extendemos DatosPorMes como Record<string, unknown> para compatibilidad con exportarCSV
export interface MaterialDatosPorMes extends DatosPorMes, Record<string, unknown> {}

export interface MaterialesPorMes {
  data: MaterialDatosPorMes[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdate: Date | null;
} 