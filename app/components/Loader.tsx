'use client';
import { TailSpin } from 'react-loader-spinner';

const InfinityLoader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#22c55e"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default InfinityLoader;
