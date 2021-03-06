import React, { FC, SyntheticEvent, useCallback } from "react";
import RemovableTab from "components/tabs/RemovableTab";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "types";
import { useDispatch } from "react-redux";
import { moveTab, removeTab, setTab } from "redux/articleTabs/actions";
import AddNewTabButton from "./AddNewTabButton";
import SortableList from "../common/SortableList";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";
import { TabValues } from "utils/constant";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabList,
  (tabList) => ({ tabList })
);

type Props = { authorized: boolean };

const SortableTabs: FC<TabsProps & Props> = ({ authorized, ...props }) => {
  const { tabList } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  }, []);
  const handleRemove = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeTab(e.currentTarget.value));
  }, []);
  const handleChange = useCallback((_: any, tabKey: string) => {
    if (tabKey !== TabValues.ADD) dispatch(setTab(tabKey));
  }, []);
  return (
    <SortableList
      axis="x"
      lockAxis="x"
      distance={10}
      onSortEnd={onSortEnd}
      helperClass="dragging"
    >
      <Tabs
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        {...props}
      >
        {authorized && <Tab value={TabValues.FEED} label="Feed" />}
        <Tab value={TabValues.DEFAULT} label="Last articles" />
        {tabList.map((tab, index) => (
          <RemovableTab
            key={index}
            index={index}
            value={tab}
            onRemove={handleRemove}
          />
        ))}
        <AddNewTabButton value={TabValues.ADD} />
      </Tabs>
    </SortableList>
  );
};

export default SortableTabs;
