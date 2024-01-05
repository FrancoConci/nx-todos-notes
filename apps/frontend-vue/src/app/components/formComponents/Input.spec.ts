import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input', () => {
  it('should receive values from config', async () => {
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

    const wrapper = mount(Input, {
      props: { inputConfig, value: 'initial' },
      'onUpdate:value': (e: Event) => wrapper.setProps({ value: e }),
    });

    const input = wrapper.find('input');
    expect(input.isVisible()).toBe(true);
    expect(input.element.name).toBe(inputConfig.name);
    expect(input.element.type).toBe(inputConfig.type);
    expect(input.element.checked).toBe(inputConfig.checked);
    expect(input.element.disabled).toBe(inputConfig.disabled);
    expect(Number(input.element.max)).toBe(inputConfig.max);
    expect(Number(input.element.maxLength)).toBe(inputConfig.maxLength);
    expect(Number(input.element.min)).toBe(inputConfig.min);
    expect(Number(input.element.minLength)).toBe(inputConfig.minLength);
    expect(input.element.pattern).toBe(inputConfig.pattern);
    expect(input.element.placeholder).toBe(inputConfig.placeholder);
    expect(input.element.readOnly).toBeDefined();
    expect(input.element.required).toBeDefined();
  });

  it('should not be disabled or readOnly if not specified', async () => {
    const inputConfig = {
      name: 'testname',
    };

    const wrapper = mount(Input, {
      props: { inputConfig, value: 'initial' },
      'onUpdate:value': (e: Event) => wrapper.setProps({ value: e }),
    });

    const input = wrapper.find('input');
    expect(input.isVisible()).toBe(true);
    expect(input.element.readOnly).toBeFalsy();
    expect(input.element.required).toBeFalsy();
  });
});

it('should emit onUpdate when value is changed', async () => {
  const inputConfig = {
    name: 'testname',
  };

  const wrapper = mount(Input, {
    props: { inputConfig, value: 'initial' },
    'onUpdate:value': (e: Event) => wrapper.setProps({ value: e }),
  });

  const input = wrapper.find('input');
  expect(input.isVisible()).toBe(true);
  await input.setValue('something');
  expect(wrapper.emitted()['update:value']).toStrictEqual([['something']]);
});
