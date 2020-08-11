import React, { FC, memo, useCallback } from "react";
import Tab from "@material-ui/core/Tab";
import ArticleList from "containers/article/ArticleList";
import Tabs from "@material-ui/core/Tabs";
import UserSection from "containers/user/UserSection";
import { TabValues } from "utils/constant";
import TabBar from "components/tabs/TabBar";
import Gutter from "components/common/Gutter";
import { parse } from "query-string";
import { useDispatch } from "react-redux";
import { ThunkDispatcher, TabQuery } from "types";
import { setTab } from "redux/articleTabs/actions";

type Props = { search: string; username: string };

const User: FC<Props> = memo(({ search, username }) => {
  let { type, page }: TabQuery = parse(search);
  if (type !== TabValues.FAVORITED) type = TabValues.AUTHOR;
  const currTab = `${type}-${username}`;
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = useCallback((_: any, tabKey: string) => {
    dispatch(setTab(tabKey, true));
  }, []);
  return (
    <>
      <UserSection username={username} />
      <TabBar>
        <Tabs
          value={currTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            value={`${TabValues.AUTHOR}-${username}`}
            label="Last articles"
          />
          <Tab
            value={`${TabValues.FAVORITED}-${username}`}
            label="Favorite articles"
          />
        </Tabs>
      </TabBar>
      <Gutter>
        <ArticleList
          tabKey={currTab}
          value={username}
          type={type}
          page={page as string}
        />
      </Gutter>
    </>
  );
});

export default User;
