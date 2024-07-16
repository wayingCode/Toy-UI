import type { Meta, StoryObj } from '@storybook/vue3'
import { YoCollapse, YoCollapseItem} from 'toy-ui'
import 'toy-ui/dist/index.css'

type Story = StoryObj<typeof YoCollapse>

const meta: Meta<typeof YoCollapse> = {
  title: 'Example/Collapse',
  component: YoCollapse,
  subcomponents: { YoCollapseItem },
  tags: ['autodocs']
}

export const Default: Story = {
  render: args => ({
    components: { YoCollapse, YoCollapseItem },
    setup() {
      return {
        args
      }
    },
    template: `
      <yo-collapse accordion v-bind="args">
        <yo-collapse-item name="a" title="Title a">
          <div>this is content a</div>
        </yo-collapse-item>
        <yo-collapse-item name="b" title="title b">
          <div>this is content b</div>
        </yo-collapse-item>
        <yo-collapse-item name="c" title="title c  disable" disabled>
          <div>this is content c</div>
        </yo-collapse-item>
      </yo-collapse>
    `
  }),
  args: {
    accordion: true,
    modelValue: ['a']
  }
}

export default meta