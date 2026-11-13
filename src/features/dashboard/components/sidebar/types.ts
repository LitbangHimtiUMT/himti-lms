export interface ISidebarItemChildrenProps {
  id: number;
  name: string;
  path: string
}

export interface ISidebarItemProps {
  title?: string;
  items: ISidebarItemChildrenProps[];
  collapsed?: boolean;
}

export interface ISidebarProps {
  isFetching?: boolean
  items: ISidebarItemProps[];
  collapsed?: boolean;
}
