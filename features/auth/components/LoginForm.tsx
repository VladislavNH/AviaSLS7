import { useLoginUserMutation } from '../api/authApi';
import styles from './LoginForm.module.scss';
import { useAuthToken } from '@/shared/hooks/useAuthToken';
import { Form, Input, Button, Alert } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LoginFormFields = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setToken, setRefreshToken } = useAuthToken();

  const onFinish: FormProps<LoginFormFields>['onFinish'] = async (values) => {
    setErrorMessage(null);
    try {
      const res = await loginUser({ username: values.email, password: values.password }).unwrap();
      setToken(res.access_token);
      setRefreshToken(res.refresh_token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage('Неверный логин или пароль');
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.title}>Вход</div>
      {errorMessage && (
        <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 16 }} />
      )}
      <Form<LoginFormFields> name="login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите email' }]}
        >
          <Input placeholder="Введите почту" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 5, message: 'Пароль должен быть не менее 5 символов' },
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>
        <Form.Item className={styles.registerLink}>
          Еще нет аккаунта? <Link to="#">Зарегистрируйтесь</Link>
        </Form.Item>
        <Form.Item className={styles.centeredButton}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
