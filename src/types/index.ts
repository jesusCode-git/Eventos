export type Category = 'work' | 'personal' | 'social' | 'health' | 'otro';
export type SortOption = 'date-asc' | 'date-desc' | 'name';

export interface Event {
  id: number;
  name: string;
  date: string;       
  time: string;       
  cat: Category;
  loc: string;
  desc: string;
  createdAt: number;  
}

export interface Filters {
  query: string;
  cat: Category | '';
  from: string;
  to: string;
  sort: SortOption;
}

export interface FormData {
  name: string;
  date: string;
  time: string;
  cat: Category;
  loc: string;
  desc: string;
}
