import { mount } from '@vue/test-utils';
import Header from './Header.vue';
import { expect, it } from 'vitest';

it('shows all slots with default value', () => {
  const wrapper = mount(Header, {});

  const container = wrapper.find('[data-testid="header-container"]');
  const left = wrapper.find('[data-testid="header-left"]');
  const main = wrapper.find('[data-testid="header-main"]');
  const right = wrapper.find('[data-testid="header-right"]');

  expect(container.exists()).toBe(true);
  expect(left.exists()).toBe(true);
  expect(main.exists()).toBe(true);
  expect(right.exists()).toBe(true);

  expect(container.element.children.length).toBe(3);
  expect(left.element.children.length).toBe(0);
  expect(main.element.children.length).toBe(0);
  expect(right.element.children.length).toBe(0);

  expect(left.element.innerHTML).toBe('left toolbar');
  expect(main.element.innerHTML).toBe('main toolbar');
  expect(right.element.innerHTML).toBe('right toolbar');
});
