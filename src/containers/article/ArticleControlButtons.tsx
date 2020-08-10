import React, { FC, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { deleteArticle } from "api/article";
import { setError } from "redux/error/actions";
import TooltipIconButton from "components/common/TooltipIconButton";
import { ArticleType } from "types/article";
import { setCurrentEditor } from "redux/editor/actions";
import { Link } from "react-router-dom";
import { closeModal } from "redux/modal/actions";

type Props = {
  article: ArticleType;
  token: string;
};

const ArticleControlButtons: FC<Props> = ({ article, token }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openEditor = () => {
    dispatch(setCurrentEditor(`_${article.slug}`, article));
  };
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!loading) {
      setLoading(true);
      const data = await deleteArticle(article.slug, token);
      if (data.status) {
        dispatch(setError(true, data));
      } else {
        dispatch(closeModal(true));
      }
    }
  };
  return (
    <>
      <TooltipIconButton
        tooltip="Edit"
        component={Link}
        to={{
          pathname: `/articles/${article.slug}/edit`,
          state: { open: true },
        }}
        onClick={openEditor}
      >
        <EditIcon fontSize="inherit" color="inherit" />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Delete" onClick={handleDelete}>
        <DeleteIcon fontSize="inherit" color="inherit" />
      </TooltipIconButton>
    </>
  );
};

export default ArticleControlButtons;
