import React, { FC } from "react";
import { StyledArticlePreview } from "./styled";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ArticleControlButtons from "./ArticleControlButtons";

type Props = {
  title: string | JSX.Element;
  body: string | JSX.Element;
  href?: string;
};

const ArticlePreview: FC<Props> = ({ title, body, href = "" }) => (
  <Grid item xs={12} lg={6}>
    <StyledArticlePreview>
      <CardHeader
        title={<Typography variant="h5">{title}</Typography>}
        action={<ArticleControlButtons id={href} />}
      />
      <CardContent>
        <Typography variant="subtitle1">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!href}
          component={Link}
          to={href}
        >
          Read more
        </Button>
      </CardActions>
    </StyledArticlePreview>
  </Grid>
);

export default ArticlePreview;
