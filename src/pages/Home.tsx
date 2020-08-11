import React, { FC, memo } from "react";
import ArticleList from "containers/article/ArticleList";
import SortableTabs from "containers/tabs/SortableTabs";
import Banner from "containers/common/Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TabValues, SITE_NAME } from "utils/constant";
import Gutter from "components/common/Gutter";
import TabBar from "components/tabs/TabBar";
import { TabQuery } from "types";
import { parse } from "query-string";

type Props = { authorized: boolean; search: string };

const Home: FC<Props> = memo(({ search, authorized }) => {
  let { type, value, page }: TabQuery = parse(search);
  if (
    !type ||
    !value ||
    (type !== TabValues.TAG && (type !== TabValues.FEED || !authorized))
  )
    type = TabValues.DEFAULT;
  const currTab = value ? `${type}-${value}` : type;
  return (
    <>
      <Banner justify="center">
        <Grid item>
          <Typography variant="h1">{SITE_NAME}</Typography>
        </Grid>
      </Banner>
      <TabBar>
        <SortableTabs value={currTab} authorized={authorized} />
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
