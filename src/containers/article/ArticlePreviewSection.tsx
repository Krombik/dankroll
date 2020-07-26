import { ArticleType } from "../../types/article";
import React, { FC } from "react";
import ArticlePreview from "../../components/article/ArticlePreview";

type Props = {
  articles: ArticleType[];
};

const ArticlePreviewSection: FC<Props> = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => (
        <ArticlePreview
          key={index}
          title={article.title}
          body={article.body}
          href={"/articles/" + article.id}
        />
      ))}
    </>
  );
};

export default ArticlePreviewSection;
