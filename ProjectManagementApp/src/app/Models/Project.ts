export interface Project {
  projectId: number;
  name: string;
  description?: string;
  managerId?: number;
  startDate?: string;  // ISO string
  endDate?: string;    // ISO string
}
