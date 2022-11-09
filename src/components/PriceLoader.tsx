import * as React from 'react'
import { BeatLoader } from "react-spinners";
import { useMainPageContext } from '../context/MainPageContext';

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};


const Loader = () => {
  const { priceLoading, setPriceLoading } = useMainPageContext();
  let [color, setColor] = React.useState("#ffffff");

    return priceLoading ? (
        <div className='overlay-content'>
            <div>
                <BeatLoader
                  color={color}
                  loading={priceLoading}
                  cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                    />
            </div>
        </div>
    ) : null
};

export default Loader;