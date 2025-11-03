export interface ProjectSummary {
  projectId: number;
  projectName: string;

  totalTasks: number;
  toDoCount: number;
  inProgressCount: number;
  doneCount: number;
  overdueCount: number;

  completionPercentage: number; // 0–100%
}
