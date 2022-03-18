export interface AddForum {
  userId: number;
  title: string;
  content: string;
  type: string;
  img: Array<string>;
  newTime: string;
  video: Array<string>;
  count: number;
}
export interface ForumList {
  id: number;
  userId: number;
  title: string;
  content: string;
  type: Array<string>;
  img: Array<string>;
  newTime: string;
  video: Array<string>;
  voice: Array<string>;
}
