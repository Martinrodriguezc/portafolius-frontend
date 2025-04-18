export interface Video {
    id: string;
    title: string;
    description: string;
    date: string;
    duration: string;
    tags: { id: number; text: string; author: "student" | "teacher" }[];
    comments: { id: number; text: string; author: string; date: string }[];
  }