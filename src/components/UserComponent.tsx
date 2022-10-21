import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function UserComponent() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button 
              variant="contained" {...bindTrigger(popupState)}
              style = {{
              color: "#FFFFFF",
              backgroundColor: "#9cb59d",
              borderColor: "#9cb59d",
            }}
            >
            Permissions
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Pee</MenuItem>
            <MenuItem onClick={popupState.close}>Poo</MenuItem>
            <MenuItem onClick={popupState.close}>Peepeepoopoo</MenuItem>
          </Menu>

  </React.Fragment>
    )}
</PopupState>
  );
}