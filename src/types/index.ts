export type ResourceType =
  | "video"
  | "article"
  | "course"
  | "pdf"
  | "documentation"
  | "tool";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  category_id: string;
}

export interface Resource {
  id: string;
  skill_id: string;
  user_id: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  thumbnail_url?: string;
  like_count: number;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  updated_at: string;
}
