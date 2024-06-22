'use client';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = ({}) => {
  return (
    <div>
      <InfinitySpin
        // @ts-ignore
        visible={true}
        width="200"
        height="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
