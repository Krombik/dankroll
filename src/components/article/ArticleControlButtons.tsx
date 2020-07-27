import React, { FC } from "react";
import TooltipIconLink from "../common/TooltipIconLink";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TooltipIconButton from "../common/TooltipIconButton";

type Props = {
  id: string | number;
  onDelete?: () => void;
};

const ArticleControlButtons: FC<Props> = ({ id, onDelete = null }) => (
  <>
    <TooltipIconLink
      to={`/article/${id}/edit`}
      disabled={!onDelete}
      tooltip="Edit"
    >
      <EditIcon fontSize="inherit" />
    </TooltipIconLink>
    <TooltipIconButton
      tooltip="Delete"
      onClick={onDelete}
      disabled={!onDelete}
      value={id}
    >
      <DeleteIcon fontSize="inherit" />
    </TooltipIconButton>
  </>
);

export default ArticleControlButtons;
