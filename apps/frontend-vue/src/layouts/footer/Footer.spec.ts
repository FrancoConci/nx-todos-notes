import { mount } from '@vue/test-utils';
import Footer from './Footer.vue';
import { expect, it } from 'vitest';

it('shows all slots with default value', () => {
  const wrapper = mount(Footer, {});

  const footer = wrapper.find('[data-testid="footer"]');

  expect(footer.exists()).toBe(true);

  expect(footer.element.children.length).toBe(0);

  expect(footer.element.innerHTML).toBe('footer');
});
