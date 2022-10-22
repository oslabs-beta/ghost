import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function RegionComponent() {
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
                backgroundColor: "#B2CAB3",
                borderColor: "#9cb59d",
              }}
            >
              <PublicIcon className="px=0.5"/>
              US-West-2
            </Button>
          </div>
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