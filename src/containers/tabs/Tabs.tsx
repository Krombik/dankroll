import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import MuiTabs from "@material-ui/core/Tabs";
import { TabValues } from "utils/constant";
import { setTab } from "redux/articleTabs/actions";

export type TabsProps = { currTab: string };

const Tabs: FC<TabsProps> = ({ children, currTab }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = useCallback(async (_: any, tabKey: string) => {
    if (tabKey !== TabValues.ADD) dispatch(setTab(tabKey));
  }, []);
  return (
    <MuiTabs
      onChange={handleChange}
      value={currTab}
      variant="scrollable"
      scrollButtons="auto"
    >
      {children}
    </MuiTabs>
  );
};

export default Tabs;
