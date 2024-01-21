import { mount } from '@vue/test-utils';
import LoginForm from './LoginForm.vue';

const formSelector = '[data-testid="login-form"]';
const usernameSelector = '[data-testid="login-form-username"]';
const passwordSelector = '[data-testid="login-form-password"]';
const loginSelector = '[data-testid="login-button"]';
const signupSelector = '[data-testid="signup-button"]';

describe('LoginForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('shows a form with username and password inputs and login and signup buttons', () => {
    const wrapper = mount(LoginForm, {
      global: { provide: { axiosInstance: {} } },
    });

    const form = wrapper.find(formSelector);
    const username = wrapper.find(usernameSelector);
    const password = wrapper.find(passwordSelector);
    const login = wrapper.find(loginSelector);
    const signup = wrapper.find(signupSelector);
    expect(form.exists()).toBeTruthy();
    expect(username.exists()).toBeTruthy();
    expect(password.exists()).toBeTruthy();
    expect(login.exists()).toBeTruthy();
    expect(signup.exists()).toBeTruthy();
    expect(form.isVisible()).toBeTruthy();
    expect(username.isVisible()).toBeTruthy();
    expect(password.isVisible()).toBeTruthy();
    expect(login.isVisible()).toBeTruthy();
    expect(signup.isVisible()).toBeTruthy();
  });
});
