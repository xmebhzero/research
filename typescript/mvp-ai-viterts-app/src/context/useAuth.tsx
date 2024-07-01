import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

interface IUserProfile {
  userName: string;
  email: string;
}

type UserContextType = {
  user: IUserProfile | null;
  token: string | null;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [userState, setUserState] = useState<IUserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUserState(JSON.parse(user));
      setTokenState(token);

      axios.defaults.headers.common.Authorization = token;
    }
    setIsReady(true);
  }, []);

  // TODO: Implement login mechanism
  const loginUser = async (email: string, password: string) => {
    const dummyUsername = 'populix';
    const dummyEmail = 'admin@populix.co';
    const dummyPassword = 'Populix123@';
    const dummyToken = 'DUMMY_TOKEN';

    if (email === dummyEmail && password === dummyPassword) {
      localStorage.setItem('token', dummyToken);

      const userObj = {
        userName: dummyUsername,
        email: dummyEmail,
      };

      localStorage.setItem('user', JSON.stringify(userObj));

      setTokenState(dummyToken!);

      setUserState(userObj!);

      toast.success('Login Success!');

      navigate('/dashboard');
    } else {
      toast.error(`Login failed`);
    }
  };

  const isLoggedIn = () => {
    return !!userState;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState(null);
    setTokenState('');
    navigate('/');
  };

  return (
    <UserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ loginUser, user: userState, token: tokenState, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
