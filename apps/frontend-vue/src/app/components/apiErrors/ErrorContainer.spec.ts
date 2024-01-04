import { mount } from '@vue/test-utils';
import ErrorContainer from './ErrorContainer.vue';

const message = 'banana message';
const id = 'banana-id';

const buttonSelector = `[data-testid=api-error-close-${id}]`;
const textSelector = `[data-testid=api-error-text-${id}]`;
const spyObj = { close: vi.fn() };
const closeSpy = vi.spyOn(spyObj, 'close');

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('shows the right text, calls the right function, closes after 2s', async () => {
  const wrapper = mount(ErrorContainer, {
    props: {
      message,
      id,
      close: closeSpy as unknown as () => void,
    },
  });

  expect(wrapper.find(textSelector).text()).toBe(message);
  const button = wrapper.find(buttonSelector);
  button.trigger('click');
  expect(closeSpy).toBeCalledTimes(1);

  vi.advanceTimersByTime(2000);
  expect(closeSpy).toBeCalledTimes(2);
});
