export interface TaskT {
    id: string;
    content: string;
  }
  
export interface ColumnT {
    id: string;
    title: string;
    tasks: TaskT[];
  }