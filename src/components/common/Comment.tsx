import React, { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

type Props = {
  body: string;
};

const Comment: FC<Props> = ({ body }) => (
  <Card>
    <CardContent>
      <Typography variant="body1">{body}</Typography>
    </CardContent>
  </Card>
);

export default Comment;
