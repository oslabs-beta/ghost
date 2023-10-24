import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

interface RegionProps {
  currentRegion: string;
  setCurrentRegion: (region: string) => void;
}

export default function RegionComponent({
  currentRegion,
  setCurrentRegion,
}: RegionProps) {
  // list of AWS regions
  const awsRegions = [
    'us-west-1',
    'us-west-2',
    'us-east-1',
    'us-east-2',
    'af-south-1',
    'ap-east-1',
    'ap-south-1',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'cn-north-1',
    'cn-northwest-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'eu-south-1',
    'eu-north-1',
    'me-south-1',
    'sa-east-1',
    'us-gov-east-1',
    'us-gov-west-1',
  ];

  const ITEM_HEIGHT = 48;

  // to capitalize the country code in the region
  const displayCapitalizedRegion = (region: string) => {
    const firstTwoLetters = region.slice(0, 2).toUpperCase();
    const restOfRegion = region.slice(2);
    return firstTwoLetters + restOfRegion;
  };

  const handleRegionClick = (region: any) => {
    fetch('http://localhost:3000/main/changeRegion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ region }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'region changed') {
          setCurrentRegion(region);
        } else alert(data);
      })
      .catch((err) => {
        console.log('Error changing region:', err);
      });
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <div className="flex items-center justify-center">
            <Button
              className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="contained"
              {...bindTrigger(popupState)}
              sx={{
                fontSize: 10,
                px: 8,
                backgroundColor: '#9cb59d',
                borderColor: '#9cb59d',
                color: '#FFFFFF',

                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d',
                },
              }}
            >
              <PublicIcon
                sx={{
                  pr: 0.5,
                }}
              />
              {currentRegion}
            </Button>
          </div>
          <Menu
            sx={{
              width: 'auto',
            }}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 5.5,
              },
            }}
            {...bindMenu(popupState)}
          >
            {awsRegions.map((region) => (
              <MenuItem
                onClick={(event) => {
                  handleRegionClick(region);
                  popupState.close();
                }}
                value={region}
              >
                <span className="capitalize">
                  {displayCapitalizedRegion(region)}
                </span>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
