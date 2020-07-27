import { ArticleType } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import React, { FC } from "react";
import Banner from "../../containers/common/Banner";
import Typography from "@material-ui/core/Typography";
import ArticleControlButtons from "./ArticleControlButtons";

type Props = {
  article: ArticleType;
};

const ArticleSection: FC<Props> = ({ article }) => (
  <>
    <Grid item xs={12}>
      <Banner>
        <Typography variant="h2" color="textPrimary">
          {article.title}
          <ArticleControlButtons id={article.id} />
        </Typography>
      </Banner>
    </Grid>
    <Grid item xs={12}>
      {article.body}
    </Grid>
  </>
);

export default ArticleSection;
