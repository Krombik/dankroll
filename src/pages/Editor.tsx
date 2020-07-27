import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  SyntheticEvent,
} from "react";
import { useParams, useHistory } from "react-router-dom";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { setEditor, createEditor, clearEditor } from "../redux/editor/actions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { editArticle } from "../api/article";
import { setError } from "../redux/error/actions";

const selectData = createSelector(
  (state: State) => state.editor.editors,
  (editors) => ({ editors })
);

const Editor: FC = () => {
  const { postId = "new" } = useParams();
  const [loading, setLoading] = useState(false);
  const { editors } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const history = useHistory();
  const editor = editors[postId];
  useEffect(() => {
    if (!editor) dispatch(createEditor(postId));
  }, []);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setEditor(postId, {
          [e.currentTarget.name]: e.currentTarget.value,
        })
      );
    },
    [postId]
  );
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { res, status } = await editArticle(postId, editor);
    setLoading(false);
    if (status) dispatch(setError(true, status));
    else {
      dispatch(clearEditor(postId));
      history.push(`/article/${res.id}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={editor?.title || ""}
            required
            disabled={!editor}
            label="Title"
            name="title"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={editor?.body || ""}
            required
            disabled={!editor}
            name="body"
            label="Text"
            variant="outlined"
            onChange={handleChange}
            multiline
            fullWidth
            rows={15}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            type="submit"
          >
            {(postId !== "new" ? "Edit" : "Create") + " article"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Editor;
