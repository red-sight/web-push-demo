import { IUserCreateInput, IUserCreateOutput } from '@lib/types';
import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:3000';

export async function api(params: AxiosRequestConfig) {
  try {
    const { data } = await axios({
      ...params,
      baseURL,
    });
    return data;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}

export function newUser(
  data: IUserCreateInput
): Promise<IUserCreateOutput | undefined> {
  return api({ method: 'post', data, url: '/user' });
}
