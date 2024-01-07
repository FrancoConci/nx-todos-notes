import axios from 'axios';
import { login } from './login';
vi.mock('axios');

describe('login', () => {
  beforeEach(() => {
    vi.mocked(axios.post).mockReset();
  });
  it('returns undefined if no username', async () => {
    const loginWithInstance = login(vi.mocked(axios));
    const response = await loginWithInstance(undefined, 'password');
    expect(response).toBe(undefined);
  });
  it('returns undefined if no password', async () => {
    const loginWithInstance = login(vi.mocked(axios));
    const response = await loginWithInstance('username', undefined);
    expect(response).toBe(undefined);
  });
  it('returns undefined if no axiosInstance', async () => {
    const loginWithInstance = login(undefined);
    const response = await loginWithInstance('username', 'password');
    expect(response).toBe(undefined);
  });
  it('posts to endpoint', async () => {
    vi.mocked(axios.post).mockResolvedValue('bananaresponse');
    const loginWithInstance = login(vi.mocked(axios));
    const response = await loginWithInstance('username', 'password');
    expect(response).toBe('bananaresponse');
  });
});
