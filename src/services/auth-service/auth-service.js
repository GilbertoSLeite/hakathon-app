import { api } from '../../boot/axios';

export async function authUser(data) {
  try {
    const response = api.post('auth-user/', data);

    return response;
  } catch (error) {
    return error;
  }
}
