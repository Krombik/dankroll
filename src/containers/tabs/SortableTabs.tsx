import React, { FC, SyntheticEvent, useCallback, memo } from "react";
import RemovableTab from "components/tabs/RemovableTab";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "types";
import { useDispatch } from "react-redux";
import { moveTab, removeTab } from "redux/articleTabs/actions";
import AddNewTabButton from "./AddNewTabButton";
import SortableList from "../common/SortableList";
import Tabs, { TabsProps } from "./Tabs";
import { TabValues } from "utils/constant";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabList,
  (state: State) => state.authentication.currentUserName,
  (tabList, currentUserName) => ({
    tabList,
    currentUserName,
  })
);

const SortableTabs: FC<TabsProps> = memo(({ currTab }) => {
  const { tabList, currentUserName } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  }, []);
  const handleRemove = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeTab(e.currentTarget.value));
  }, []);
  return (
    <SortableList
      axis="x"
      lockAxis="x"
      distance={10}
      onSortEnd={onSortEnd}
      helperClass="dragging"
    >
      <Tabs currTab={currTab}>
        {currentUserName && (
          <Tab value={TabValues.FEED} label={`${currentUserName}'s feed`} />
        )}
        <Tab value={TabValues.DEFAULT} label="Last articles" />
        {tabList.map((tab, index) => (
          <RemovableTab
            key={index}
            index={index}
            value={tab}
            onRemove={handleRemove}
          />
        ))}
        <AddNewTabButton value={TabValues.ADD} component="div" />
      </Tabs>
    </SortableList>
  );
});

export default SortableTabs;
