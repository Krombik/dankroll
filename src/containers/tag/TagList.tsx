import React, { FC, SyntheticEvent, useCallback } from "react";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { addTab } from "redux/articleTabs/actions";
import Grid from "@material-ui/core/Grid";

type Props = {
  tagList: string[];
};

const TagList: FC<Props> = ({ tagList }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleAddTab = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
    dispatch(addTab(e.currentTarget.value));
  }, []);
  return (
    <>
      {tagList.map((tag, index) => (
        <Grid item key={index}>
          <Chip
            label={"#" + tag}
            variant="outlined"
            size="small"
            component="button"
            value={tag}
            onClick={handleAddTab}
          />
        </Grid>
      ))}
    </>
  );
};

export default TagList;
