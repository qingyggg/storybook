import React from 'react';
import PropTypes from 'prop-types';
import { JsxElement } from 'typescript';

function Auth({ children }: { children: JSX.Element }) {
  return <div className='flex flex-col w-full items-center'>{children}</div>;
}

export default Auth;
