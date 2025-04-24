import React, { ReactElement } from "react";
import {
  TabsListProps,
  WithTabStateProps,
} from "../../../types/Props/Tabs/TabsListProps";

const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  selectedTab,
  setSelectedTab,
}) => {
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<WithTabStateProps>, {
        selectedTab,
        setSelectedTab,
      });
    }
    return child;
  });

  return (
    <div className={`flex border-b ${className || ""}`}>{clonedChildren}</div>
  );
};

export default TabsList;
