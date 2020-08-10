import { ThunkResult } from "types";
import { ActionTypes, TabPagesType } from "./type";
import { moveFromTo } from "utils/moveFromTo";
import { TabValues } from "utils/constant";
import { push, replace } from "connected-react-router";
import { parse } from "query-string";
import tabKeyToQueryString from "utils/tabKeyToQueryString";

export const setOffset = (offset: number): ThunkResult => (
  dispatch,
  getState
) => {
  const { page } = parse(getState().router.location.search);
  if (page) dispatch(replace({ search: "" }));
  dispatch({
    type: ActionTypes.SET_OFFSET,
    payload: {
      tabPages: {},
      offset,
    },
  });
};

export const setTab = (tabKey: string, skipValue?: boolean): ThunkResult => (
  dispatch,
  getState
) => {
  dispatch(
    push({
      search: tabKeyToQueryString({
        tabKey,
        skipValue,
        page: getState().articleTabs.tabPages[tabKey],
      }),
    })
  );
};

export const addTab = (tag: string): ThunkResult => (dispatch, getState) => {
  const { tabList, tabPages } = getState().articleTabs;
  const tabKey = `${TabValues.TAG}-${tag}`;
  if (!tabList.some((item) => item === tabKey))
    dispatch({
      type: ActionTypes.ADD_TAB,
      payload: tabKey,
    });
  dispatch(
    push({
      pathname: "/",
      search: tabKeyToQueryString({
        type: TabValues.TAG,
        value: tag,
        page: tabPages[tabKey],
      }),
    })
  );
};

export const removeTab = (tab: string): ThunkResult => async (
  dispatch,
  getState
) => {
  const {
    articleTabs: { tabList, tabPages },
    router: {
      location: { search },
    },
  } = getState();
  const { value, type } = parse(search);
  let currTab: string;
  if (value && tab === (currTab = `${type}-${value}`)) {
    let newIndex = tabList.indexOf(currTab) + 1;
    if (newIndex === tabList.length) newIndex -= 2;
    const tabKey = tabList[newIndex] || TabValues.DEFAULT;
    dispatch(
      replace({
        pathname: "/",
        search: tabKeyToQueryString({
          tabKey,
          page: tabPages[tabKey],
        }),
      })
    );
  }
  dispatch({
    type: ActionTypes.REMOVE_TAB,
    payload: tab,
  });
};

export const setPageNumber = (payload: TabPagesType): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.SET_PAGE_NUMBER,
    payload,
  });
};

export const moveTab = (from: number, to: number): ThunkResult => (
  dispatch,
  getState
) => {
  const { tabList } = getState().articleTabs;
  dispatch({
    type: ActionTypes.MOVE_TAB,
    payload: moveFromTo(tabList, from, to),
  });
};
