import { ArticleType } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import React, { FC } from "react";
import Banner from "../common/Banner";
import Typography from "@material-ui/core/Typography";
import ArticleControlButtons from "../../components/article/ArticleControlButtons";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { deleteArticle } from "../../api/article";
import { setError } from "../../redux/error/actions";
import { useHistory } from "react-router-dom";
import { removeArticle } from "../../redux/store/actions";
import { removeEditor } from "../../redux/editor/actions";

type Props = {
  article: ArticleType;
};

const ArticleSection: FC<Props> = ({ article }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const history = useHistory();
  let loading = false;
  const handleDelete = async () => {
    if (!loading) {
      loading = true;
      const { status } = await deleteArticle(article.id);
      if (status) {
        dispatch(setError(true, status));
        loading = false;
      } else {
        history.replace("/");
        dispatch(removeArticle(article.id));
        dispatch(removeEditor(article.id));
      }
    }
  };
  return (
    <>
      <Grid item xs={12}>
        <Banner>
          <Typography variant="h2" color="textPrimary">
            {article.title}
            <ArticleControlButtons id={article.id} onDelete={handleDelete} />
          </Typography>
        </Banner>
      </Grid>
      <Grid item xs={12}>
        {article.body}
      </Grid>
    </>
  );
};

export default ArticleSection;
