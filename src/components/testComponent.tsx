import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LambdaFuncList from './LambdaFuncList'

const TestButton = ({ children }) => {
  const [showButtons, setShowButtons] = React.useState(false);
  const handleShowButtons= () => {
    setShowButtons(!showButtons);
    }

  return (

    <ListItemButton onClick={handleShowButtons}>
      { children }
      {showButtons ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>

  )  
}

export default TestButton