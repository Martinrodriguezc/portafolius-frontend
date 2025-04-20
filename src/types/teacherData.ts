export interface Video {
    id: number;
    title: string;
    date: string;
    student: string;
    diagnosis: string;
    status: string;
  }
  
  export interface Student {
    id: number;
    name: string;
    email: string;
    institution: string;
    specialty: string;
    year: string;
    studies: number;
    averageScore: number;
    lastActivity: string;
    status: "active" | "inactive";
  }
  
  export interface Evaluation {
    id: number;
    student: string;
    protocol: string;
    date: string;
    score: number;
    status: "completed";
    videos: number;
    tags: string[];
  }
  
  export interface PendingEvaluation {
    id: number;
    student: string;
    protocol: string;
    date: string;
    videos: number;
    tags: string[];
  }