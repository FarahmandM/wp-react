import { useContext } from 'react';
import { AuthContext } from '@components/providers/WpAuthProvider';
import { UseAuthResult } from '@models/hooks';

export const useAuth = (): UseAuthResult => {
  return useContext(AuthContext);
};
