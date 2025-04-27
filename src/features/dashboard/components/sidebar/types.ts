import { ReactNode } from "react";

export interface ISidebarItemChildrenProps {
  id: number;
  name: string;
  path: string
}

export interface ISidebarItemProps {
  title?: string;
  items: ISidebarItemChildrenProps[];
}

export interface UserProfile {
  name: string
  email: string
  icon?: ReactNode
}

export interface ISidebarProps {
  items: ISidebarItemProps[];
  user?: UserProfile
}