import * as React from 'react';
import Button from '@mui/material/Button';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AddchartIcon from '@mui/icons-material/Addchart';
import { useDarkMode } from '../context/DarkModeHooks';
import { useGraphContext } from '../context/GraphContext';
import { useFunctionContext } from '../context/FunctionContext';

interface TopBarProps {
  changeMuiTheme: () => void;
}

function TopBarContainer({ changeMuiTheme }: TopBarProps) {
  const { isHomeEnabled } = useFunctionContext();
  const [isDark, setIsDark] = useDarkMode();
  const toggleDarkMode = (checked: boolean) => {
    setIsDark(checked);
    changeMuiTheme();
  };

  const { createGraphIsShown, setCreateGraphIsShown } = useGraphContext();
  const handleCreateGraph = () => {
    setCreateGraphIsShown?.(!createGraphIsShown);
  };

  const createGraphButton = () => (
    <div className="mr-1">
      <Button
        sx={{
          height: '30px',
          fontSize: 10,
          color: '#FFFFFF',
          backgroundColor: '#e8ad80',
          borderColor: '#e09d69',
          mr: 0.4,
          mt: 0.45,
          '&:hover': {
            borderColor: '#e09d69',
            backgroundColor: '#e09d69',
            color: '#FFFFFF',
          },
        }}
        onClick={handleCreateGraph}
      >
        <AddchartIcon
          sx={{
            mr: 1,
          }}
        />
        Create Graph
      </Button>
    </div>
  );

  const ghostIcon = () => (
    <div className="mr-1">
      <img
        src="https://i.postimg.cc/zf8ZDycV/ghost.png"
        className="object-cover mr-0.5 h-12 transition ease-in-out delay-150 hover:animate-[wiggle_1.5s_ease-in-out_infinite]"
      />
    </div>
  );

  return (
    <div className="flex flex-row justify-end absolute top-5 right-2 w-11/12">
      {!isHomeEnabled ? createGraphButton() : null}

      <div className="mr-1">
        <Button
          sx={{
            maxWidth: '30px',
            minWidth: '30px',
            maxHeight: '30px',
            minHeight: '30px',
            backgroundColor: '#BFBFBF',
            mt: 0.45,
          }}
        >
          <DarkModeSwitch
            style={{
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
            checked={isDark}
            onChange={toggleDarkMode}
            size={25}
          />
        </Button>
      </div>

      {!isHomeEnabled ? ghostIcon() : null}
    </div>
  );
}

export default TopBarContainer;
