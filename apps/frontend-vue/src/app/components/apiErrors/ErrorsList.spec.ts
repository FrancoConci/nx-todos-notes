import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import ErrorsList from './ErrorsList.vue';

const id = 'banana-id';

const errorSelector = `[data-testid=api-error-popup-${id}]`;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('shows the errors', async () => {
  const wrapper = mount(ErrorsList, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            alerts: {
              errors: {
                [id]: 'some error',
              },
            },
          },
        }),
      ],
    },
  });

  expect(wrapper.find(errorSelector).isVisible()).toBe(true);
});
