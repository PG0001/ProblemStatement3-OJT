export interface TaskComment {
  commentId: number;
  taskId: number;
  employeeId: number;
  employeeName?: string;
  text: string;
  createdAt?: string;
}
