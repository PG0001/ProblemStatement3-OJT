export interface Task {
  taskId: number;
  projectId: number;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  assignedToId?: number;
  assignedToName?: string;
  priority?: 'High' | 'Medium' | 'Low';
  dueDate?: string;    // ISO string
  createdDate?: string;
}
