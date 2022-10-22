import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function RegionComponent() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button 
              variant="contained" {...bindTrigger(popupState)}
              style = {{
                color: "#FFFFFF",
                backgroundColor: "#B2CAB3",
                borderColor: "#9cb59d",
              }}
              >
              US-West-1
          </Button>

          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>pee</MenuItem>
            <MenuItem onClick={popupState.close}>poo</MenuItem>
            <MenuItem onClick={popupState.close}>peepeepoo</MenuItem>
          </Menu>

  </React.Fragment>
    )}
</PopupState>
  );
}