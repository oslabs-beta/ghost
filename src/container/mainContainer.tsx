import * as React from 'react'
import FunctionDetails from '../components/FunctionDetails';
import { useFunctionContext } from '../context/FunctionContext';
import Home from '../components/Home';
import { useGraphContext } from '../context/GraphContext';
import CreateGraph from '../components/CreateGraph';
import PricingDetails from '../components/PricingDetails';
import PermissionsDetails from '../components/PermissionsDetails';

const MainContainer = () => {
  const { isMetricsEnabled, isPricingEnabled, isHomeEnabled, isPermissionsEnabled } = useFunctionContext();
  const { createGraphIsShown } = useGraphContext();
  const { functionName } = useFunctionContext();

  const [priceHistoryStats, setPriceHistoryStats] = React.useState({});
  const [defaultFunctionConfig, setDefaultFunctionConfig] = React.useState({});
  const [permissionList, setPermissionList] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/price/defaultConfig',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ functionName: functionName })
        }),
        fetch('http://localhost:3000/permission/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ functionName: functionName })
        })])
      .then(([defaultConfigResponse, permissionListResponse]) => {
        return Promise.all([defaultConfigResponse.json(), permissionListResponse.json()])
      })
      .then(([defaultConfig, permissionList]) => {
        setDefaultFunctionConfig(defaultConfig);
        setPermissionList(permissionList);
      })
    }, [functionName]);

  return (
    <div className="bg-[#d6d4d4] dark:bg-[#191919] min-h-screen w-screen px-4/5">
        {createGraphIsShown ? <CreateGraph /> : null}
        {isMetricsEnabled ? <FunctionDetails /> : null}
        {isPricingEnabled ? <PricingDetails defaultFunctionConfig={defaultFunctionConfig} /> : null}
        {isPermissionsEnabled ? <PermissionsDetails permissionList={permissionList} setPermissionList={setPermissionList} /> : null}
        {isHomeEnabled ? <Home /> : null}
    </div>
  )
}

export default MainContainer;