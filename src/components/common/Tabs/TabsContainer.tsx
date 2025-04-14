import React, { useState, ReactNode, ReactElement } from "react";

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

const TabsContainer: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultValue);

  return (
    <div className="tabs">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as ReactElement<{
              selectedTab?: string;
              setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
            }>,
            { selectedTab, setSelectedTab }
          );
        }
        return child;
      })}
    </div>
  );
};

export default TabsContainer;