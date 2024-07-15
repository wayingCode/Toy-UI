import { describe, it, expect, test } from 'vitest'
import type { AlertType } from './types'
import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'
import Icon from '../Icon/Icon.vue'

describe('Alert', () => {
  const title = 'Test Alert'
  const description = 'This is a test description'

  it('should render the alert with default props', () => {
    const wrapper = mount(Alert, {
      props: {
        title
      },
      slots: {
        default: description
      },
      global: {
        stubs: ['YoIcon']
      }
    })
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(description)
    // close icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('xmark')

    const wrapper2 = mount(() => (
      <Alert title={title}>{description}</Alert>
    ))
    expect(wrapper2.text()).toContain(title)
    expect(wrapper2.text()).toContain(description)
  })
})