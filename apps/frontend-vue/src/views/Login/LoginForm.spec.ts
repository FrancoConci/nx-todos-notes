import { mount } from '@vue/test-utils';
import LoginForm from './LoginForm.vue';

const formSelector = '[data-testid="login-form"]';
const usernameSelector = '[data-testid="login-form-username"]';
const passwordSelector = '[data-testid="login-form-password"]';

const mocks = vi.hoisted(() => ({
  login: vi.fn(),
}));

const spiedLogin = mocks.login;

vi.mock('../../api/auth/login', async () => {
  return {
    login: () => spiedLogin,
  };
}); // do not disturb the real api while testing

describe('LoginForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('shows a form with username and password inputs', () => {
    const wrapper = mount(LoginForm);

    const form = wrapper.find(formSelector);
    const username = wrapper.find(usernameSelector);
    const password = wrapper.find(passwordSelector);
    expect(form.exists()).toBeTruthy();
    expect(username.exists()).toBeTruthy();
    expect(password.exists()).toBeTruthy();
    expect(form.isVisible()).toBeTruthy();
    expect(username.isVisible()).toBeTruthy();
    expect(password.isVisible()).toBeTruthy();
  });
  it('calls the api on submission', async () => {
    const axiosInstance = { post: vi.fn() };
    const wrapper = mount(LoginForm, {
      global: {
        provide: {
          axiosInstance,
        },
      },
    });

    const form = wrapper.find(formSelector);
    const username = wrapper.find(usernameSelector);
    const password = wrapper.find(passwordSelector);
    const usernameInput = username.find('input');
    const passwordInput = password.find('input');
    expect(username.exists()).toBeTruthy();
    await usernameInput.setValue('banana');
    await passwordInput.setValue('secretbanana');

    expect(usernameInput.element.value).toBe('banana');
    expect(passwordInput.element.value).toBe('secretbanana');

    form.trigger('submit');

    expect(spiedLogin).toHaveBeenCalledTimes(1);
  });
});
