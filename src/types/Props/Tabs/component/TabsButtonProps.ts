export interface TabsButtonProps {
  value: string;
  children: React.ReactNode;
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}
