import React, { FC } from "react";
import ArticlePreview from "../../components/article/ArticlePreview";
import Skeleton from "@material-ui/lab/Skeleton";

type Props = {
  count: number;
};

const ArticlePreviewSkeletonSection: FC<Props> = ({ count }) => (
  <>
    {Array.from(new Array(count)).map((_, index) => (
      <ArticlePreview
        key={index}
        title={<Skeleton animation={false} width="70%" />}
        body={
          <>
            <Skeleton animation={false} width="100%" />
            <Skeleton animation={false} width="95%" />
            <Skeleton animation={false} width="80%" />
          </>
        }
      />
    ))}
  </>
);

export default ArticlePreviewSkeletonSection;
