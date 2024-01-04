import { createTestingPinia } from '@pinia/testing';
import Page from '../../layouts/page/Page.vue';
import { mount } from '@vue/test-utils';
import { useAlertsStore } from './alerts';

describe('alertsStore', () => {
  it('adds errors', () => {
    const wrapper = mount(Page, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const { errors, addError, deleteError } = useAlertsStore();
    expect(errors).toBeDefined();
    expect(Object.keys(errors).length).toBe(0);
    addError('banana', 'banana message');
    expect(Object.keys(errors).length).toBe(1);
    const error = errors['banana'];
    expect(error).toBe('banana message');
    deleteError('banana');
    expect(Object.keys(errors).length).toBe(0);
  });
});
