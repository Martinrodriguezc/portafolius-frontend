import React from "react";
import { TabsContentProps } from "../../../types/Props/Tabs/component/TabsContentProps";
import NoDataMessage from "../../student/progress/NoDataMessage";

interface ExtendedTabsContentProps extends TabsContentProps {
  hasData?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}

const TabsPanel: React.FC<ExtendedTabsContentProps> = ({
  value,
  children,
  selectedTab,
  className,
  hasData = true,
  emptyTitle,
  emptyMessage,
}) => {
  if (selectedTab !== value) return null;
  
  if (!hasData) {
    return <NoDataMessage title={emptyTitle} message={emptyMessage} />;
  }

  return <div className={className}>{children}</div>;
};

export default TabsPanel;
