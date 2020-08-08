import React, { FC, useEffect, memo } from "react";
import { ArticlesObj } from "types/article";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getArticlesUrl } from "api/article";
import Pagination from "../common/Pagination";
import { FetchRV, State, ThunkDispatcher } from "types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import usePrevious from "utils/usePrevious";
import { setArticleListRefreshFunc, setModal } from "redux/modal/actions";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";
import Typography from "@material-ui/core/Typography";
import { useSWRInfinite } from "swr";
import fetcher from "utils/fetcher";
import { ModalType } from "redux/modal/type";

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

const ArticleList: FC<Props> = memo(({ page, type, value, tabKey }) => {
  const { token, offset } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const prevQuery = usePrevious({ type, value });
  const startPage = page && +page > 0 ? +page - 1 : 0;
  const { data, setSize, size, mutate } = useSWRInfinite<FetchRV<ArticlesObj>>(
    (index) => [getArticlesUrl(type, value, startPage + index, offset), token],
    fetcher.get
  );
  useEffect(() => {
    if (setSize && data && size === 1 && data.length > 1) setSize(data.length);
  }, [type, value]);
  useEffect(() => {
    if (
      setSize &&
      (size || 0 > 1) &&
      prevQuery &&
      value === prevQuery.value &&
      type === prevQuery.type
    )
      setSize(1);
  }, [page]);
  useEffect(() => {
    dispatch(setArticleListRefreshFunc(mutate));
    const handleRouteChange = async () => {
      const { pathname: url } = window.location;
      let isModalShouldBeOpen = true;
      let modal: ModalType | undefined;
      let slug: string | undefined;
      if (url.startsWith("/articles/")) {
        slug = url.replace("/articles/", "");
        if (url.endsWith("/edit")) {
          modal = "edit";
          slug = slug.replace("/edit", "");
        } else modal = "article";
      } else if (url.startsWith("/new")) modal = "new";
      else isModalShouldBeOpen = false;
      dispatch(setModal(isModalShouldBeOpen, modal, slug));
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
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
  const loadMore = () => {
    setSize((x) => x + 1);
  };
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
              onClick={loadMore}
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
});

export default ArticleList;
