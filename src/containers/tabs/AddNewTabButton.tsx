import React, {
  useState,
  useRef,
  memo,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  FC,
} from "react";
import "styled-components/macro";
import { ThunkDispatcher, ThemeProps } from "types";
import { useDispatch } from "react-redux";
import { addTab } from "redux/articleTabs/actions";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tab, { TabProps } from "@material-ui/core/Tab";
import TooltipIconButton from "components/common/TooltipIconButton";

const AddNewTabButton: FC<TabProps> = memo((props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const dispatch = useDispatch<ThunkDispatcher>();
  const addNewTab = () => {
    if (isSearchOpen && newTabName.trim() !== "") {
      dispatch(addTab(newTabName));
      setSearchOpen(false);
      setNewTabName("");
    } else ref.current?.focus();
  };
  const handleClickAway = useCallback(() => {
    setSearchOpen(false);
  }, []);
  const handleFocus = () => {
    setSearchOpen(true);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTabName(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") addNewTab();
  };
  return (
    <Tab
      css={`
        min-width: 0;
        .MuiGrid-item {
          width: 0;
          overflow: hidden;
          transition: ${({ theme }: ThemeProps) =>
            theme.transitions.create("width")};
        }
      `}
      disableRipple
      {...props}
      component="div"
      label={
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid item style={isSearchOpen ? { width: "100%" } : {}}>
              <Input
                disableUnderline
                inputRef={ref}
                onFocus={handleFocus}
                value={newTabName}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                startAdornment="#"
              />
            </Grid>
            <TooltipIconButton onClick={addNewTab} tooltip="Add new tab">
              <AddIcon />
            </TooltipIconButton>
          </Grid>
        </ClickAwayListener>
      }
    />
  );
});

export default AddNewTabButton;
