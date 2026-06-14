interface WpMenuProps {
  location: string;
  className?: string;
}

interface MenuItem {
  ID: number;
  url: string;
  title: string;
  // add other properties if needed
}

interface Menu {
  items: MenuItem[];
}

export type { WpMenuProps };
export type { MenuItem };
export type { Menu };
