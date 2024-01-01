import { mount } from '@vue/test-utils';
import Page from './Page.vue';
import { expect, it } from 'vitest';

it('shows all slots with default value', () => {
  const wrapper = mount(Page, {});

  const container = wrapper.find('[data-testid="page-container"]');
  const header = wrapper.find('[data-testid="page-header"]');
  const main = wrapper.find('[data-testid="page-main"]');
  const footer = wrapper.find('[data-testid="page-footer"]');

  expect(container.exists()).toBe(true);
  expect(header.exists()).toBe(true);
  expect(main.exists()).toBe(true);
  expect(footer.exists()).toBe(true);

  expect(container.element.childNodes.length).toBe(3);

  expect(header.element.innerHTML).toBe('header');
  expect(main.element.innerHTML).toBe('content');
  expect(footer.element.innerHTML).toBe('footer');
});
