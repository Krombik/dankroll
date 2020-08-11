import React, { FC } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setOffset } from "redux/articleTabs/actions";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";

const selectData = createSelector(
  (state: State) => state.articleTabs.offset,
  (offset) => ({ offset })
);

const OffsetSelect: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { offset } = useSelector(selectData);
  const handleCount: SelectInputProps["onChange"] = (e) => {
    const count = e.target.value as number;
    if (offset !== count) dispatch(setOffset(count));
  };
  return (
    <FormControl variant="outlined">
      <Select value={offset} onChange={handleCount} label="Offset">
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
};

export default OffsetSelect;
