export interface Comment {
  commentId: number;
  taskId: number;
  employeeId: number;
  employeeName?: string;
  content: string;
  createdDate?: string;
}
