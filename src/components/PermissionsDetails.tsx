import * as React from 'react'
import { Box, Slider, Typography, styled, Button, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, TextField, FormHelperText, Select, Tabs, Tab, Stack } from '@mui/material'
import { useFunctionContext } from '../context/FunctionContext'

interface PermissionsDetailsProps {
  permissionList: Array<object>,
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#7f9f80"
  }
})

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PermissionsDetails({ permissionList }: PermissionsDetailsProps) {
  // pull current function from context
  const { functionName } = useFunctionContext();
  const [value, setValue] = React.useState(0);
  const [statementId, setStatementId] = React.useState('');
  const [action, setAction] = React.useState('');
  const [principal, setPrincipal] = React.useState('');
  const [principalOrgId, setPrincipalOrgId] = React.useState('');
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addPermission = () => {
    /* to add permissions, post request to /addPermission with the following body:
      functionName, 
      statementId, - unique identifier for the permission, no spaces, input field
      action, - should be dropdown, based on lambda docs
      principal - input field, they would know what this is or copy paste from permission list,
      principalOrgId - input field, optional, they would know what this is */
    fetch('http://localhost:3000/addPermission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          functionName: functionName,
          statementId: statementId,
          action: action,
          principal: principal,
          principalOrgId: principalOrgId
          })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      }
    )
  }

  const removePermission = (statementId) => {
    /* to remove permissions, post request to /removePermission with the following body:
    functionName,
    statementId - unique identifier for the permission, no spaces, input field
    maybe we can just put a remove permission button on each permission with confirmation prompt */
    let answer = confirm('Are you sure you want to remove this permission?\n' + statementId)
    if (answer) {
      fetch('http://localhost:3000/removePermission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          functionName: functionName,
          statementId: statementId
          })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      }
    )}
  }


  return (
    <div className='p-5 flex flex-col text-gray-900 dark:text-[#D3D4D4]'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing permissions for:</p>
      <p className='text-gray-900 dark:text-[#D3D4D4] text-4xl mb-2.5'>{functionName}</p>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 5 }}>
        <Tabs 
          TabIndicatorProps={{style: {background: '#7f9f80'}}}
          value={value}
          onChange={handleChange}>
          <StyledTab label="List of Permissions" {...a11yProps(0)} />
          <StyledTab label="Add New Permission" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* PERMISSIONS LIST */}
      <TabPanel value={value} index={0}>
      { permissionList && permissionList.length > 0 ? (
        <div className='flex flex-col'>
          <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Permissions:</p>
          <div className='flex flex-col'>
            {permissionList.map((permission: any) => (
              <div className='flex flex-row mb-2.5'>
                <p className='text-gray-900 dark:text-[#D3D4D4]'>
                  <strong>Statement ID:</strong> {permission.statementID}
                </p>
                <p className='text-gray-900 dark:text-[#D3D4D4]'>
                  <strong>Action:</strong>  {permission.action}
                </p>
                <p className='text-gray-900 dark:text-[#D3D4D4]'>
                  <strong>Resource:</strong> {permission.resource}
                </p>
                <p className='text-gray-900 dark:text-[#D3D4D4]'>
                  <strong>Principal:</strong> {permission.principal}
                </p>
                <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="outlined"
              disableElevation
              sx={{
                width: '95%',
                mt: 1,
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
                }
              }}
              size="small"
              onClick={() => {
                removePermission(permission.statementID)
              }}
            >
              Delete Permission
            </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>No permissions found.</p>
      )}
      </TabPanel>

      {/* ADD PERMISSIONS */}
      <TabPanel value={value} index={1}>
        <div className='flex flex-col bg-[#B2CAB3] dark:bg-[#313131] p-10'>
          <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Add New Permission:</p>
            <Box sx={{ m: 3 }}>
              <TextField
                id="outlined-basic"
                label="Statement ID"
                required={true}
                variant="outlined"
                onChange={(e) => setStatementId(e.target.value)}
              />
            </Box>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel>Action</FormLabel>
                <Select
                  native
                  value={action}
                  required={true}
                  onChange={(e) => setAction(e.target.value)}
                  inputProps={{
                    name: 'action',
                    id: 'action',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value='lambda:InvokeFunction'>Invoke Function</option>
                  <option value='lambda:InvokeAsync'>Invoke Async</option>
                  <option value='lambda:ListVersionsByFunction'>List Versions by Function</option>
                  <option value='lambda:ListTags'>List Tags</option>
                  <option value='lambda:ListProvisionedConcurrencyConfigs'>List Provisioned Concurrency Configs</option>
                  <option value='lambda:ListLayerVersions'>List Layer Versions</option>
                  <option value='lambda:ListEventSourceMappings'>List Event Source Mappings</option>
                  <option value='lambda:ListAliases'>List Aliases</option>
                  <option value='lambda:GetProvisionedConcurrencyConfig'>Get Provisioned Concurrency Config</option>
                  <option value='lambda:GetPolicy'>Get Policy</option>
                  <option value='lambda:GetLayerVersion'>Get Layer Version</option>
                  <option value='lambda:GetFunction'>Get Function</option>
                  <option value='lambda:GetEventSourceMapping'>Get Event Source Mapping</option>
                  <option value='lambda:GetAlias'>Get Alias</option>
                  <option value='lambda:DeleteProvisionedConcurrencyConfig'>Delete Provisioned Concurrency Config</option>
                  <option value='lambda:DeleteFunction'>Delete Function</option>
                  <option value='lambda:DeleteEventSourceMapping'>Delete Event Source Mapping</option>
                  </Select>
              </FormControl>

            <Box sx={{ m: 3 }}>
              <TextField
                id="outlined-basic"
                label="Principal"
                variant="outlined"
                required={true}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </Box>

            <Box sx={{ m: 3 }}>
              <TextField
                id="outlined-basic"
                label="Principal Organization ID"
                variant="outlined"
                onChange={(e) => setPrincipalOrgId(e.target.value)}
              />
              <FormHelperText id="principal-org-id-helper">
                Optional: If principal is part of an AWS Organization, enter the organization ID.
              </FormHelperText>
            </Box>
            <Button variant="contained" onClick={addPermission}>Add Permission</Button>
        </div>
      </TabPanel>
    </div>
  )
}