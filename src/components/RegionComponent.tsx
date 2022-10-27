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
            <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="contained" {...bindTrigger(popupState)}
              sx = {{     
                fontSize: 10,
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
              }}}
            >
              <PublicIcon sx = {{
                pr: 0.5
              }}/>
              US-West-1
            </Button>
          </div>
          <Menu className="w-5.5/12" {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>US-West-1</MenuItem>
            <MenuItem onClick={popupState.close}>US-West-2</MenuItem>
            <MenuItem onClick={popupState.close}>US-West-3</MenuItem>
          </Menu>

  </React.Fragment>
    )}
</PopupState>
  );
}