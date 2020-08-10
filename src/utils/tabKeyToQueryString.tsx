import { TabQuery } from "types";
import { TabValues } from "./constant";
import { stringify } from "query-string";
import { XOR } from "types";

type Props = XOR<
  { type: string; value: string },
  { tabKey: string; skipValue?: boolean }
> & {
  page?: number;
};

const tabKeyToQueryString = ({
  type,
  value,
  tabKey,
  page,
  skipValue,
}: Props) => {
  let query: TabQuery;
  if (tabKey) {
    const keySeparatorIndex = tabKey.indexOf("-");
    query =
      keySeparatorIndex === -1
        ? { type: tabKey }
        : {
            type: tabKey.slice(0, keySeparatorIndex),
            value: skipValue ? undefined : tabKey.slice(keySeparatorIndex + 1),
          };
  } else {
    query = { type, value };
  }
  if (page) query.page = page + 1;
  if (query.type === TabValues.DEFAULT || query.type === TabValues.AUTHOR)
    delete query.type;
  return "?" + stringify(query);
};

export default tabKeyToQueryString;
