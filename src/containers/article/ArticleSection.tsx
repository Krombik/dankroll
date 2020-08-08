import React, { FC, useEffect } from "react";
import { ArticleObj } from "types/article";
import Grid from "@material-ui/core/Grid";
import { getArticleUrl } from "api/article";
import ArticleBanner from "components/article/ArticleBanner";
import Markdown from "react-markdown";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import { FetchRV, ThunkDispatcher } from "types";
import Spinner from "components/common/Spinner";
import ArticleControlButtons from "./ArticleControlButtons";
import ArticleLikeButton from "./ArticleLikeButton";
import { useDispatch } from "react-redux";
import { setError } from "redux/error/actions";
import Gutter from "components/common/Gutter";
import useSWR from "swr";
import fetcher from "utils/fetcher";

type Props = {
  slug: string;
  token: string;
  currentUserName: string;
};

const ArticleSection: FC<Props> = ({ slug, token, currentUserName }) => {
  const { data, mutate } = useSWR<FetchRV<ArticleObj>>(
    [getArticleUrl(slug), token],
    fetcher.get
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data));
  }, [data]);
  if (!data) return <Spinner />;
  const { article } = data;
  if (data.status || !article) return null;
  return (
    <>
      <ArticleBanner
        article={article}
        controlButtons={
          <>
            <ArticleLikeButton
              like={article.favorited}
              likesCount={article.favoritesCount}
              slug={article.slug}
              token={token}
              mutate={mutate}
            />
            {currentUserName === article.author.username && (
              <ArticleControlButtons article={article} token={token} />
            )}
          </>
        }
      />
      <Gutter>
        <Grid item xs={12}>
          <Markdown
            source={article.body}
            skipHtml={true}
            renderers={{
              link: Link,
              thematicBreak: Divider,
            }}
          />
        </Grid>
      </Gutter>
    </>
  );
};

export default ArticleSection;
