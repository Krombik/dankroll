import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import "styled-components/macro";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditableTagList from "../tag/EditableTagList";
import { ArticleEditorType, ArticleObj } from "types/article";
import { createArticle, updateArticle, getArticleUrl } from "api/article";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher, FetchRV, LocationState } from "types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setModal } from "redux/modal/actions";
import { setError } from "redux/error/actions";
import {
  setEditor,
  setCurrentEditor,
  removeEditor,
} from "redux/editor/actions";
import { mutate } from "swr";
import Gutter from "components/common/Gutter";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import { replace, push } from "connected-react-router";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.editor.editors,
  (state: State) => state.editor.current,
  (token, editors, currentEditor) => ({ token, editors, currentEditor })
);

type Props = {
  slug?: string;
};

const Editor: FC<Props> = ({ slug }) => {
  const key = slug ? `_${slug}` : "new";
  const [loading, setLoading] = useState(false);
  const { token, editors, currentEditor } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (!currentEditor || currentEditor.slug !== slug)
      dispatch(setCurrentEditor(key));
  }, []);
  const updatedEditor = editors[key];
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setEditor(key, { [e.target.name]: e.target.value }));
    },
    [key]
  );
  const handleTag = useCallback(
    (tagList: string[]) => {
      dispatch(setEditor(key, { tagList }));
    },
    [key]
  );
  const handleResetEditor = useCallback(() => {
    dispatch(removeEditor(key));
  }, [key]);
  const { state } = useLocation<LocationState>();
  const handleArticleEdit = async () => {
    setLoading(true);
    let data: FetchRV<ArticleObj>;
    if (slug) {
      const updatedArticle: Partial<ArticleEditorType> = {};
      if (updatedEditor.title && currentEditor!.title !== updatedEditor.title)
        updatedArticle.title = updatedEditor.title;
      if (updatedEditor.body && currentEditor!.body !== updatedEditor.body)
        updatedArticle.body = updatedEditor.body;
      if (
        updatedEditor.description &&
        currentEditor!.description !== updatedEditor.description
      )
        updatedArticle.description = updatedEditor.description;
      if (
        updatedEditor.tagList &&
        (updatedEditor.tagList.length !== currentEditor!.tagList.length ||
          updatedEditor.tagList.some(
            (item, index) => item !== currentEditor!.tagList[index]
          ))
      )
        updatedArticle.tagList = updatedEditor.tagList;
      data = await updateArticle(updatedArticle, slug, token);
    } else {
      data = await createArticle(updatedEditor as ArticleEditorType, token);
    }
    setLoading(false);
    if (data.article) {
      dispatch(removeEditor(key));
      if (slug === data.article.slug)
        mutate([getArticleUrl(slug), token], data, false);
      const pathname = `/articles/${data.article.slug}`;
      if (state?.prevLocation) {
        dispatch(
          replace({ pathname, state: { prevLocation: state.prevLocation } })
        );
        dispatch(setModal(true, "article", data.article.slug));
      } else dispatch(push({ pathname }));
    } else {
      dispatch(setError(true, data));
    }
  };
  return (
    <Gutter
      justify="center"
      alignItems="center"
      component={ValidatorForm}
      componentProps={{ onSubmit: handleArticleEdit, autoComplete: "off" }}
      maxWidth="md"
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Editor
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          value={updatedEditor?.title || currentEditor?.title || ""}
          disabled={!currentEditor}
          label="Title"
          name="title"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          value={updatedEditor?.description || currentEditor?.description || ""}
          disabled={!currentEditor}
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          value={updatedEditor?.body || currentEditor?.body || ""}
          disabled={!currentEditor}
          name="body"
          label="Text"
          variant="outlined"
          onChange={handleChange}
          multiline
          fullWidth
          validators={["required"]}
          errorMessages={["this field is required"]}
          rows={15}
        />
      </Grid>
      {currentEditor && (
        <EditableTagList
          tagList={updatedEditor?.tagList || currentEditor.tagList}
          editTags={handleTag}
        />
      )}
      <Grid
        item
        container
        spacing={3}
        justify="center"
        css={`
          overflow-y: hidden;
        `}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={loading || !currentEditor}
            type="submit"
          >
            {`${slug ? "Edit" : "Create"} article`}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={loading || !currentEditor}
            onClick={handleResetEditor}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Gutter>
  );
};

export default Editor;
