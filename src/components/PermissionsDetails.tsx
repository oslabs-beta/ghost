import * as React from 'react'
import {
  Box,
  Typography,
  styled,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Select,
  Tabs,
  Tab
} from '@mui/material'
import { useFunctionContext } from '../context/FunctionContext'

interface PermissionsDetailsProps {
  permissionList: any
  setPermissionList: (arg0: any) => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: '#7f9f80'
  }
})

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

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
  )
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function PermissionsDetails ({
  permissionList,
  setPermissionList
}: PermissionsDetailsProps) {
  // pull current function from context
  const { functionName, functionARN } = useFunctionContext()
  const [value, setValue] = React.useState(0)
  const [statementId, setStatementId] = React.useState('')
  const [action, setAction] = React.useState('')
  const [principal, setPrincipal] = React.useState('')
  const [principalOrgId, setPrincipalOrgId] = React.useState('')
  const [errorText, setErrorText] = React.useState(false)
  const [successText, setSuccessText] = React.useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const addPermission = () => {
    // set error text and success text to false to clear any previous helper texts
    setErrorText(false)
    setSuccessText(false)

    const body = {
      functionName,
      statementId,
      action,
      resource: functionARN,
      principal,
      principalOrgId
    }

    fetch('http://localhost:3000/permission/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.status === 400) {
          // if error, display error message
          setErrorText(true)
        } else {
          // if successful, add the request body to the permissionList state
          setPermissionList([...permissionList, body])
          // display success message
          setSuccessText(true)
        }
      })
      .catch(() => {
        // if error, display error message
        setErrorText(true)
      })
  }

  const removePermission = (statementId: string, index: number) => {
    // user needs to confirm to remove permission
    const answer = confirm(
      `Are you sure you want to remove this permission?\n${statementId}`
    )
    if (answer) {
      fetch('http://localhost:3000/permission/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          functionName,
          statementId
        })
      })
        .then(async (res) => await res.json())
        .then((data) => {
          console.log(data)
        })
      // set a new array to state with the permission removed
      setPermissionList(
        permissionList.filter((permission: any, i: number) => i !== index)
      )
    }
  }

  return (
    <div className="p-5 flex flex-col text-gray-900 dark:text-[#D3D4D4]">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 5 }}>
        <Tabs
          TabIndicatorProps={{ style: { background: '#7f9f80' } }}
          value={value}
          onChange={handleChange}
        >
          <StyledTab label="List of Permissions" {...a11yProps(0)} />
          <StyledTab label="Add New Permission" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* PERMISSIONS LIST */}
      <TabPanel value={value} index={0}>
        <p className="text-gray-700 dark:text-[#D3D4D4] text-lg">
          Viewing permissions for:
        </p>
        <p className="text-gray-900 dark:text-[#D3D4D4] text-4xl mb-2.5 font-bold">
          {functionName}
        </p>
        <br />

        {permissionList && permissionList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {permissionList.map((permission: any, index: number) => (
              <div className="mb-2.5">
                <p className="text-black text-lg dark:text-white">
                  <strong>Statement ID:</strong> {permission.statementId}
                </p>
                <p className="text-gray-900 dark:text-[#D3D4D4]">
                  <strong>Action:</strong> {permission.action}
                </p>
                <p className="text-gray-900 dark:text-[#D3D4D4]">
                  <strong>Resource:</strong> {permission.resource}
                </p>
                <p className="text-gray-900 dark:text-[#D3D4D4]">
                  <strong>Principal:</strong> {permission.principal}
                </p>
                {/* if principalOrgId exists, display it */}
                {permission.principalOrgId && (
                  <p className="text-gray-900 dark:text-[#D3D4D4]">
                    <strong>Principal Organization ID:</strong>{' '}
                    {permission.principalOrgId}
                  </p>
                )}
                <Button
                  className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
                  variant="outlined"
                  disableElevation
                  sx={{
                    mt: 1,
                    backgroundColor: '#9cb59d',
                    borderColor: '#9cb59d',
                    color: '#FFFFFF',
                    '&:hover': {
                      borderColor: '#9cb59d',
                      backgroundColor: '#F5F5F5',
                      color: '#9cb59d'
                    }
                  }}
                  size="small"
                  onClick={() => {
                    removePermission(permission.statementId, index)
                  }}
                >
                  Delete Permission
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-[#D3D4D4] text-lg">
            No permissions found.
          </p>
        )}
      </TabPanel>

      {/* ADD PERMISSIONS */}
      <TabPanel value={value} index={1}>
        <p className="text-gray-700 dark:text-[#D3D4D4] text-lg">
          Add new permission for:
        </p>
        <p className="text-gray-900 dark:text-[#D3D4D4] text-4xl mb-2.5 font-bold">
          {functionName}
        </p>
        <br />
        <Box sx={{ width: '35%' }}>
          <TextField
            id="outlined-basic"
            label="Statement ID"
            required
            variant="outlined"
            value={statementId}
            sx={{ mb: 3, width: '100%' }}
            onChange={(e) => {
              setStatementId(e.target.value)
            }}
          />{' '}
          <br />
          <FormControl sx={{ width: '100%' }}>
            <Select
              native
              value={action}
              required
              onChange={(e) => {
                setAction(e.target.value)
              }}
              inputProps={{
                name: 'action',
                id: 'action'
              }}
            >
              <option aria-label="Action" value="">
                Select action from list
              </option>
              <option value="lambda:InvokeFunctionUrl">
                Invoke Function Url
              </option>
              <option value="lambda:InvokeFunction">Invoke Function</option>
              <option value="lambda:InvokeFunctionAsync">
                Invoke Function Async
              </option>
              <option value="lambda:InvokeAsync">Invoke Async</option>
              <option value="lambda:ListVersionsByFunction">
                List Versions by Function
              </option>
              <option value="lambda:ListTags">List Tags</option>
              <option value="lambda:ListProvisionedConcurrencyConfigs">
                List Provisioned Concurrency Configs
              </option>
              <option value="lambda:ListLayerVersions">
                List Layer Versions
              </option>
              <option value="lambda:ListEventSourceMappings">
                List Event Source Mappings
              </option>
              <option value="lambda:ListAliases">List Aliases</option>
              <option value="lambda:GetProvisionedConcurrencyConfig">
                Get Provisioned Concurrency Config
              </option>
              <option value="lambda:GetPolicy">Get Policy</option>
              <option value="lambda:GetLayerVersion">Get Layer Version</option>
              <option value="lambda:GetFunction">Get Function</option>
              <option value="lambda:GetEventSourceMapping">
                Get Event Source Mapping
              </option>
              <option value="lambda:GetAlias">Get Alias</option>
              <option value="lambda:DeleteProvisionedConcurrencyConfig">
                Delete Provisioned Concurrency Config
              </option>
              <option value="lambda:DeleteFunction">Delete Function</option>
              <option value="lambda:DeleteEventSourceMapping">
                Delete Event Source Mapping
              </option>
            </Select>
          </FormControl>
          <Box sx={{ mb: 3, width: '100%' }} />
          <TextField
            id="outlined-basic"
            label="Principal"
            variant="outlined"
            required
            value={principal}
            sx={{ width: '100%' }}
            onChange={(e) => {
              setPrincipal(e.target.value)
            }}
          />
          <Box sx={{ mb: 3, width: '100%' }} />
          <TextField
            id="outlined-basic"
            label="Principal Organization ID"
            variant="outlined"
            value={principalOrgId}
            sx={{ width: '100%' }}
            onChange={(e) => {
              setPrincipalOrgId(e.target.value)
            }}
          />
          <FormHelperText id="principal-org-id-helper">
            Optional: If principal is part of an AWS Organization, enter the
            organization ID.
          </FormHelperText>
          <br />
          <Button
            className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
            variant="outlined"
            disableElevation
            sx={{
              mb: 3,
              backgroundColor: '#9cb59d',
              borderColor: '#9cb59d',
              color: '#FFFFFF',
              '&:hover': {
                borderColor: '#9cb59d',
                backgroundColor: '#F5F5F5',
                color: '#9cb59d'
              }
            }}
            size="small"
            onClick={addPermission}
          >
            {' '}
            ADD PERMISSION
          </Button>
          <br />
          {errorText
            ? (
            <span className="text-red-600">
              There was an error adding the permission. Please try again.
            </span>
              )
            : null}
          {successText
            ? (
            <span className="text-emerald-700 dark:text-[#7f9f80]">
              Permission added successfully.
            </span>
              )
            : null}
        </Box>
      </TabPanel>
    </div>
  )
}
