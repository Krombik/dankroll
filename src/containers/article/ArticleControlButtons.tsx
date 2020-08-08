import React, { FC, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { ThunkDispatcher, LocationState } from "types";
import { setModal } from "redux/modal/actions";
import { deleteArticle } from "api/article";
import { setError } from "redux/error/actions";
import TooltipIconButton from "components/common/TooltipIconButton";
import { ArticleType } from "types/article";
import { setCurrentEditor } from "redux/editor/actions";
import { Link, useLocation } from "react-router-dom";
import { goBack } from "connected-react-router";

type Props = {
  article: ArticleType;
  token: string;
};

const ArticleControlButtons: FC<Props> = ({ article, token }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const location = useLocation<LocationState>();
  const openEditor = () => {
    dispatch(setCurrentEditor(`_${article.slug}`, article));
    dispatch(setModal(true, "edit", article.slug));
  };
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!loading) {
      setLoading(true);
      const data = await deleteArticle(article.slug, token);
      if (data.status) {
        dispatch(setError(true, data));
      } else {
        dispatch(setModal(false));
        dispatch(goBack());
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
          state: { prevLocation: location.state?.prevLocation || location },
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
