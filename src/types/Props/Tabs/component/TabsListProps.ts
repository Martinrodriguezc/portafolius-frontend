import { ReactNode } from "react";

export interface TabsListProps {
  children: ReactNode;
  className?: string;
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

export interface WithTabStateProps {
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}