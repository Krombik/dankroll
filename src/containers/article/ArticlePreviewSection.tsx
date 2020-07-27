import { ArticleType } from "../../types/article";
import React, { FC, SyntheticEvent } from "react";
import ArticlePreview from "../../components/article/ArticlePreview";
import { FetchRV, ThunkDispatcher } from "../../types";
import { deleteArticle } from "../../api/article";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/error/actions";

type Props = {
  articles: ArticleType[];
  mutate: (data: FetchRV<ArticleType[]>, shouldRevalidate?: boolean) => any;
};

const ArticlePreviewSection: FC<Props> = ({ articles, mutate }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  let loading = false;
  const handleDelete = async (id: number, index: number) => {
    if (!loading) {
      loading = true;
      const { status } = await deleteArticle(id);
      if (status) {
        dispatch(setError(true, status));
        loading = false;
      } else
        mutate(
          { res: [...articles.slice(0, index), ...articles.slice(index + 1)] },
          false
        );
    }
  };
  return (
    <>
      {articles.map((article, index) => (
        <ArticlePreview
          key={index}
          title={article.title}
          body={article.body}
          href={`/article/${article.id}`}
          onDelete={() => {
            handleDelete(article.id, index);
          }}
        />
      ))}
    </>
  );
};

export default ArticlePreviewSection;
