import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { registerApi } from '@/api/user';
import { useRequest } from '../../hooks/useRequest';
import { usePassword } from '../../hooks/usePassword';
import { useRouter } from 'next/router';
import useStatelessStorage from '../../hooks/useStatelessStorage';
import { useRecoilState } from 'recoil';
import { authState } from '../../store/auth';
import Auth from '../../components/Auth';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { registerI } from '@/api/user/reqTypes';
import md5 from 'md5';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function Register() {
  const router = useRouter();
  const [, setUserId] = useStatelessStorage('userId');
  const [auth, setAuth] = useRecoilState(authState);
  const [register, setRegister] = useState(false);
  const registerReq = useRequest(registerApi(auth), async (ud) => {
    setUserId(ud!);
    router.push('/profileEdit/' + ud);
  });
  useMemo(() => {
    if (register) {
      registerReq();
    }
  }, [register]);
  const [form] = Form.useForm();
  const onFinish = (values: registerI) => {
    setAuth({ Email: values.Email, Password: md5(values.Password) });
    setRegister(true);
  };
  return (
    <Stack spacing={2} alignItems='center'>
      <Typography variant='h1'>register</Typography>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        style={{ minWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name='Email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='Password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button htmlType='submit'>Register</Button>
          <Link href='/login'>
            <span className='italic'>
              &nbsp;&nbsp;you have an account ?please login it
            </span>
          </Link>
        </Form.Item>
      </Form>
    </Stack>
  );
}
