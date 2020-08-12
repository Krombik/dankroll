import React, { FC, useEffect } from "react";
import { ArticlesObj } from "types/article";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getArticlesUrl } from "api/article";
import Pagination from "../common/Pagination";
import { FetchRV, State } from "types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import usePrevious from "utils/usePrevious";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";
import Typography from "@material-ui/core/Typography";
import { useSWRInfinite } from "swr";
import fetcher from "utils/fetcher";
import { useHistory } from "react-router-dom";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.articleTabs.offset,
  (token, offset) => ({ token, offset })
);

type Props = {
  tabKey: string;
  page?: string;
  type: string;
  value?: string;
};

const ArticleList: FC<Props> = ({ page, type, value, tabKey }) => {
  const { token, offset } = useSelector(selectData);
  const prevTabKey = usePrevious(tabKey);
  const startPage = page && +page > 0 ? +page - 1 : 0;
  const { data, setSize, size, mutate } = useSWRInfinite<FetchRV<ArticlesObj>>(
    (index) => [getArticlesUrl(type, value, startPage + index, offset), token],
    fetcher.get
  );
  useEffect(() => {
    if (setSize && data && data.length > 1 && size === 1) setSize(data.length);
  }, [tabKey]);
  useEffect(() => {
    if (setSize && (size || 0 > 1) && tabKey === prevTabKey) setSize(1);
  }, [page]);
  const history = useHistory();
  useEffect(() => {
    let prev = false;
    return history.listen((location) => {
      if (prev) mutate();
      prev =
        location.pathname.startsWith("/articles/") &&
        !location.pathname.endsWith("/edit");
    });
  }, []);
  if (!data || !size || !setSize)
    return <ArticlePreviewSkeletonSection count={offset} />;
  const articlesCount = data[0]?.articlesCount as number;
  if (data[0] && !articlesCount)
    return (
      <Grid item xs={12}>
        <Typography align="center">No articles available</Typography>
      </Grid>
    );
  const isLoadMoreUnavailable = data.length * offset >= articlesCount;
  const isLoading = data.length !== size;
  const pageCount = Math.ceil(articlesCount / offset);
  return (
    <>
      <ArticlePreviewSection
        data={data}
        token={token}
        mutate={mutate}
        offset={offset}
      />
      {isLoading && <ArticlePreviewSkeletonSection count={offset} />}
      {pageCount > 1 && (
        <>
          <Grid container item justify="center">
            <Button
              onClick={() => setSize((x) => x + 1)}
              variant="contained"
              color="primary"
              disabled={isLoading || isLoadMoreUnavailable}
            >
              {isLoading
                ? "Loading..."
                : isLoadMoreUnavailable
                ? "No more Articles"
                : "Load more"}
            </Button>
          </Grid>
          <Grid container item justify="center">
            <Pagination
              page={size + startPage}
              count={pageCount}
              tabKey={tabKey}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default ArticleList;
