import React, { FC } from "react";
import Editor from "containers/modal/Editor";
import { RouteComponentProps } from "react-router-dom";

const EditArticlePage: FC<RouteComponentProps<{ slug: string }>> = ({
  match: {
    params: { slug },
  },
}) => <Editor slug={slug} />;

export default EditArticlePage;
