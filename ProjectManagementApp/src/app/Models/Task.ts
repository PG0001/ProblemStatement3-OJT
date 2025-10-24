export interface Task {
  taskId: number;
  projectId: number;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  assigneeId?: number;
  assigneeName?: string;
  priority?: 'High' | 'Medium' | 'Low';
  dueDate?: string;    // ISO string
  createdDate?: string;
}
