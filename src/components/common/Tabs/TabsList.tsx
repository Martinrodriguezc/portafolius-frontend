import React, { ReactNode, ReactElement } from "react";

interface TabsListProps {
  children: ReactNode;
  className?: string;
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface WithTabStateProps {
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  selectedTab,
  setSelectedTab,
}) => {
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<WithTabStateProps>, { selectedTab, setSelectedTab });
    }
    return child;
  });

  return <div className={`flex border-b ${className || ""}`}>{clonedChildren}</div>;
};

export default TabsList;