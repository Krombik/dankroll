import React, { FC, memo } from "react";
import ArticleList from "containers/article/ArticlesList";
import SortableTabs from "containers/tabs/SortableTabs";
import Banner from "containers/common/Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TabValues, SITE_NAME } from "utils/constant";
import Gutter from "components/common/Gutter";
import TabBar from "components/tabs/TabBar";
import { TabQuery } from "types/tab";
import { parse } from "query-string";
import { RouteComponentProps } from "react-router-dom";

const Home: FC<RouteComponentProps> = memo(({ location: { search } }) => {
  const { type = TabValues.DEFAULT, value, page }: TabQuery = parse(search);
  const currTab = value ? `${type}-${value}` : type;
  return (
    <>
      <Banner justify="center">
        <Grid item>
          <Typography variant="h1" color="textPrimary">
            {SITE_NAME}
          </Typography>
        </Grid>
      </Banner>
      <TabBar>
        <SortableTabs currTab={currTab} />
      </TabBar>
      <Gutter>
        <ArticleList
          value={value}
          type={type}
          tabKey={currTab}
          page={page as string}
        />
      </Gutter>
    </>
  );
});

export default Home;
