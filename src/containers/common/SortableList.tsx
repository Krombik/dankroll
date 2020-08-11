import React from "react";
import { SortableContainer } from "react-sortable-hoc";

const SortableList = SortableContainer(({ children }: any) => <>{children}</>);

export default SortableList;
