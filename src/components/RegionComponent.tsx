import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function RegionComponent() {

  // const handleRegionClick = (event: React.ChangeEvent<{ name?: string; value: value }>) => {
  //   props.input.onChange(event.target.value);
  // };

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

          <MenuItem onClick={popupState.close} value={"us-east-1"}>US-East-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"us-east-2"}>US-West-2</MenuItem>
          <MenuItem onClick={popupState.close} value={"us-west-1"}>US-West-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"us-west-2"}>US-West-2</MenuItem>
          <MenuItem onClick={popupState.close} value={"af-south-1"}>AF-South-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-east-1"}>AP-East-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-southeast-3"}>AP-Southeast-3</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-south-1"}>AP-South-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-northeast-2"}>AP-Northeast-2</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-northeast-3"}>AP-Northeast-3</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-southeast-1"}>AP-Southeast-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-southeast-2"}>AP-Southeast-2</MenuItem>
          <MenuItem onClick={popupState.close} value={"ap-northeast-1"}>AP-Northeast-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"ca-central-1"}>CA-Central-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"eu-central-1"}>EU-Central-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"eu-west-1"}>EU-West-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"eu-west-2"}>EU-West-2</MenuItem>
          <MenuItem onClick={popupState.close} value={"eu-south-1"}>EU-South-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"eu-west-3"}>EU-West-3</MenuItem>
          <MenuItem onClick={popupState.close} value={"eu-north-1"}>EU-North-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"me-south-1"}>ME-South-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"me-central-1"}>ME-Central-1</MenuItem>
          <MenuItem onClick={popupState.close} value={"sa-east-1"}>SA-East-1</MenuItem>

          </Menu>

  </React.Fragment>
    )}
</PopupState>
  );
}