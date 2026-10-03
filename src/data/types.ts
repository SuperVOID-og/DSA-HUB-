export type SectionType = 
  | 'text'
  | 'h2'
  | 'h3'
  | 'code'
  | 'image'
  | 'table'
  | 'list'
  | 'callout'
  | 'definition';

export interface BaseSection {
  id: string;
  type: SectionType;
}

export interface TextSection extends BaseSection {
  type: 'text' | 'h2' | 'h3';
  content: string;
}

export interface CodeSection extends BaseSection {
  type: 'code';
  language: string;
  code: string;
}

export interface ImageSection extends BaseSection {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface TableSection extends BaseSection {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface ListSection extends BaseSection {
  type: 'list';
  items: string[];
  ordered?: boolean;
}

export interface CalloutSection extends BaseSection {
  type: 'callout';
  variant: 'info' | 'warning' | 'tip';
  title?: string;
  content: string;
}

export interface DefinitionSection extends BaseSection {
  type: 'definition';
  term: string;
  definition: string;
}

export type Section = 
  | TextSection 
  | CodeSection 
  | ImageSection 
  | TableSection 
  | ListSection 
  | CalloutSection
  | DefinitionSection;

export interface Topic {
  id: string;
  title: string;
  sections: Section[];
  deepDive?: Section[];
  mistakes?: Section[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  sourcePdf?: string;
  topics: Topic[];
}
