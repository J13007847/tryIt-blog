import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import EditPwd from "@/components/editPwd/index";
export default function UserMenu({
  children,
  loginOutHandle,
  uid,
}: {
  children?: any;
  loginOutHandle: Function;
  uid: number;
}) {
  const navigator = useNavigate();

  const [open, setOpen] = useState(false);
  const [dialogShow, setDialogShow] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);
  return (
    <Stack direction="row" spacing={2}>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        {children}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 4 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {uid !== 1 && (
                    <>
                      <MenuItem onClick={() => navigator("/userCenter")}>
                        我的主页
                      </MenuItem>
                      <MenuItem onClick={() => setDialogShow(true)}>
                        修改密码
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={() => loginOutHandle()}>退出登录</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <EditPwd
        dialogShow={dialogShow}
        dialogHandle={(show: boolean) => setDialogShow(show)}
      ></EditPwd>
    </Stack>
  );
}
