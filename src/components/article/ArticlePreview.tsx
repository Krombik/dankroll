import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import ContentInfo from "../../containers/common/ContentInfo";
import { Link } from "react-router-dom";
import { Location } from "history";

type Props = {
  avatar: string | JSX.Element;
  username: string | JSX.Element;
  date: string | JSX.Element;
  likeButton: JSX.Element;
  title: string | JSX.Element;
  description: string | JSX.Element;
  href?: string;
  onModal?: (e: any) => void;
  location?: Location;
};

const ArticlePreview: FC<Props> = ({
  avatar,
  username,
  date,
  likeButton,
  title,
  description,
  location,
  children,
  onModal,
  href = "",
}) => (
  <Grid item container xs={12} lg={6}>
    <Grid component={Card} item xs={12}>
      <ContentInfo
        avatar={avatar}
        username={username}
        date={date}
        action={likeButton}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!href}
          component={Link}
          onClick={onModal}
          to={{ pathname: href, state: { prevLocation: location } }}
        >
          Read more
        </Button>
      </CardActions>
      {children && (
        <CardActions>
          <Grid container spacing={1}>
            {children}
          </Grid>
        </CardActions>
      )}
    </Grid>
  </Grid>
);

export default ArticlePreview;
