import React, { memo } from "react";
import { SortableContainer } from "react-sortable-hoc";

const SortableList = memo(
  SortableContainer(({ children }: any) => <>{children}</>)
);

export default SortableList;
