import React, { memo } from "react";
import { SortableElement } from "react-sortable-hoc";

const SortableItem = memo(
  SortableElement(({ children }: any) => <>{children}</>)
);

export default SortableItem;
