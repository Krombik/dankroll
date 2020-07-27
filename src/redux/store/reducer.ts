import { StoreActionTypes, StoreActions } from "./type";
import { ArticlesObj, ArticleType } from "../../types/article";

type State = {
  articlePages: ArticlesObj;
  articles: ArticleType[];
};

const initialState: State = {
  articlePages: null,
  articles: null,
};

export default function reducer(
  state = initialState,
  action: StoreActions
): State {
  switch (action.type) {
    case StoreActionTypes.SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case StoreActionTypes.SET_ARTICLE:
      return {
        ...state,
        articlePages: {
          ...state.articlePages,
          ...action.payload,
        },
      };
    case StoreActionTypes.REMOVE_ARTICLE:
      return {
        ...state,
        articlePages: (({ [action.payload]: _, ...rest }) => rest)(
          state.articlePages
        ),
      };
    case StoreActionTypes.ADD_COMMENT:
      return {
        ...state,
        articlePages: {
          ...state.articlePages,
          [action.payload.key]: {
            ...state.articlePages[action.payload.key],
            comments: [
              action.payload.comment,
              ...state.articlePages[action.payload.key].comments,
            ],
          },
        },
      };
    default:
      return state;
  }
}
