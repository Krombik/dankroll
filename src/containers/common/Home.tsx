import React, { FC } from "react";
import ArticleList from "../article/ArticlesList";
import Banner from "./Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SITE_NAME } from "../../utils/constant";

const Home: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Banner>
          <Grid item container justify="center">
            <Typography variant="h1" color="textPrimary">
              {SITE_NAME}
            </Typography>
          </Grid>
        </Banner>
      </Grid>
      <ArticleList />
    </Grid>
  );
};

export default Home;
