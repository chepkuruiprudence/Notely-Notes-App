export interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  userId: string;
  isPinned?: boolean;
  isPublic?: boolean;
}
