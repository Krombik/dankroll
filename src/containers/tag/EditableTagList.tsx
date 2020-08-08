import React, { FC, useRef, useCallback } from "react";
import "styled-components/macro";
import SortableList from "../common/SortableList";
import SortableItem from "../common/SortableItem";
import { moveFromTo } from "utils/moveFromTo";
import AddIcon from "@material-ui/icons/Add";
import EditableTag from "./EditableTag";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { SortEndHandler } from "react-sortable-hoc";

type Props = {
  tagList: string[];
  editTags: (tags: string[]) => void;
};

const EditableTagList: FC<Props> = ({ tagList, editTags }) => {
  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    editTags(moveFromTo(tagList, oldIndex, newIndex));
  };
  const ref = useRef<HTMLSpanElement>(null);
  const editTag = (tag: string, index?: number) => {
    const tags = [...tagList];
    tags[index || 0] = tag;
    editTags(tags);
  };
  const addTag = (tag: string) => {
    editTags([...tagList, tag]);
    if (ref.current) ref.current.innerHTML = "";
  };
  const removeTag = (index: number) => {
    const tags = [...tagList];
    tags.splice(index, 1);
    editTags(tags);
  };
  const setFocus = useCallback(() => {
    ref.current?.focus();
  }, []);
  return (
    <SortableList
      axis="xy"
      distance={10}
      onSortEnd={onSortEnd}
      helperClass="dragging"
    >
      <Grid
        container
        item
        xs={12}
        spacing={1}
        css={`
          .MuiInputBase-input {
            padding: 0 4px;
            text-transform: lowercase;
          }
          .MuiChip-label {
            display: flex;
          }
          .drag-area {
            padding-left: 2px;
            display: inline-flex;
            align-self: center;
            height: 100%;
          }
        `}
      >
        {tagList.map((tag, index) => (
          <SortableItem index={index} key={index}>
            <Grid item>
              <Chip
                label={
                  <EditableTag
                    draggable
                    index={index}
                    onTag={editTag}
                    value={tag}
                  />
                }
                onDelete={() => {
                  removeTag(index);
                }}
                variant="outlined"
                component="span"
              />
            </Grid>
          </SortableItem>
        ))}
        <Grid item>
          <Chip
            label={<EditableTag onTag={addTag} value="" inputRef={ref} />}
            onDelete={setFocus}
            deleteIcon={<AddIcon />}
            variant="outlined"
            component="span"
          />
        </Grid>
      </Grid>
    </SortableList>
  );
};

export default EditableTagList;
