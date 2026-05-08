export type Category = 'concierto' | 'festival' | 'show' | 'teatro' | 'exposicion' | 'otro';
export type SortOption = 'date-asc' | 'date-desc' | 'name';

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  cat: Category;
  loc: string;
  desc: string;
  precio: number; 
  createdAt: number;
}

export interface FormData {
  name: string;
  date: string;
  time: string;
  cat: Category;
  loc: string;
  desc: string;
  precio: number;  
}

export interface Filters {
  query: string;
  cat: Category | '';
  from: string;
  to: string;
  sort: SortOption;
}
