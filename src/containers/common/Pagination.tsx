import React, { FC, useCallback } from "react";
import PaginationContainer from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { setPageNumber } from "redux/articleTabs/actions";
import { Link, useLocation } from "react-router-dom";
import { parse, stringify, stringifyUrl } from "query-string";

type Props = {
  page: number;
  count: number;
  tabKey: string;
};

const Pagination: FC<Props> = ({ page, count, tabKey }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { pathname, search } = useLocation();
  const { page: _, ...query } = parse(search);
  const url = `${pathname}?${stringify(query)}`;
  const updatePageNumber = useCallback(
    (_: any, page: number) => {
      dispatch(setPageNumber({ [tabKey]: page - 1 }));
    },
    [tabKey]
  );
  return (
    <PaginationContainer
      page={page}
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={updatePageNumber}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={
            item.page > 1
              ? stringifyUrl({
                  url,
                  query: { page: String(item.page) },
                })
              : url
          }
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
