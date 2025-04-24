import React, { useState, ReactElement } from "react";
import { TabsProps } from "../../../types/Props/Tabs/TabsProps";

const TabsContainer: React.FC<TabsProps> = ({
  defaultValue,
  children,
  className,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultValue);

  return (
    <div className={`tabs ${className || ""}`}>
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
