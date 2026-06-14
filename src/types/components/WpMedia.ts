interface WpMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  caption?: { rendered: string };
  [key: string]: any;
}

export type { WpMedia };
