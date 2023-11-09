export interface Board {
  boardName: string;
  boardColor: string;
  threadsId: number[];
  icon: string;
}

export interface Thread {
  title: string;
  id: number;
  author: string;
  content: string;
  date: string;
  liked: number;
  boardName: string;
}

export interface PostThread {
  title: string;
  content: string;
  boardName: string;
  author: string;
}
export interface UpdateThread {
  title: string;
  content: string;
  boardName: string;
  author: string;
  id: number;
}
