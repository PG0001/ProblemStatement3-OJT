
export interface ProjectSummary {
  projectId: number;
  totalTasks: number;
  tasksByStatus: {
    'To Do': number;
    'In Progress': number;
    'Review': number;
    'Done': number;
  };
  completedTasks: number;
  pendingTasks: number;
}
