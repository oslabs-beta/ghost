import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function UserComponent() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <div className="flex justify-between w-5.5/12">
            <Button 
                variant="contained" {...bindTrigger(popupState)}
                sx = {{
                fontSize: 10,
                color: "#FFFFFF",
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
              }}
            >
              <AccessibilityIcon className="px=0.5"/>
              Username
            </Button>
          </div>
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