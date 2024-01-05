import { mount } from '@vue/test-utils';
import InputContainer from './InputContainer.vue';

const labelSelector = (name: string) =>
  `[data-testid=form-component-label-element-${name}]`;
const inputSelector = (name: string) =>
  `[data-testid=form-component-input-element-${name}]`;
const errorSelector = (name: string) =>
  `[data-testid=form-component-error-element-${name}]`;

describe('InputContainer', () => {
  it('should display a label, an input and an error', async () => {
    const inputConfig = {
      name: 'testname',
      type: 'number',
      checked: true,
      disabled: true,
      max: 123,
      maxLength: 234,
      min: 345,
      minLength: 456,
      pattern: 'pat-tern',
      placeholder: 'testplaceholder',
      readonly: true,
      required: true,
    };

    const wrapper = mount(InputContainer, {
      props: { inputConfig, label: 'initial' },
    });

    const label = wrapper.find(labelSelector(inputConfig.name));
    const input = wrapper.find(inputSelector(inputConfig.name));
    const error = wrapper.find(errorSelector(inputConfig.name));
    expect(label.isVisible()).toBe(true);
    expect(input.isVisible()).toBe(true);
    expect(error.isVisible()).toBe(true);
  });
});
