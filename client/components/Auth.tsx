import React from 'react';

function Auth({ children }: { children: JSX.Element }) {
  return <div className='flex flex-col w-full items-center'>{children}</div>;
}

export default Auth;
