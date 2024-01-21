import { mount } from '@vue/test-utils';
import LoginForm from './LoginForm.vue';

const formSelector = '[data-testid="login-form"]';
const usernameSelector = '[data-testid="login-form-username"]';
const passwordSelector = '[data-testid="login-form-password"]';

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
});
