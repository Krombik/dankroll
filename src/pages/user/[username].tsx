import React, { FC, memo } from "react";
import Tab from "@material-ui/core/Tab";
import ArticleList from "containers/article/ArticlesList";
import Tabs from "containers/tabs/Tabs";
import UserSection from "containers/user/UserSection";
import { TabValues } from "utils/constant";
import TabBar from "components/tabs/TabBar";
import Gutter from "components/common/Gutter";
import { RouteComponentProps } from "react-router-dom";
import { parse } from "querystring";
import { TabQuery } from "types/tab";

const UserPage: FC<RouteComponentProps<{ username: string }>> = memo(
  ({
    location: { search },
    match: {
      params: { username },
    },
  }) => {
    const { type = TabValues.AUTHOR, page }: TabQuery = parse(search);
    const currTab = `${type}-${username}`;
    return (
      <>
        <UserSection />
        <TabBar>
          <Tabs currTab={currTab}>
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
  }
);

export default UserPage;
