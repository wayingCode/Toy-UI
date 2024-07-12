import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { YoButton } from 'toy-ui'

type Story = StoryObj<typeof YoButton> & { argTypes?: ArgTypes }

const meta: Meta<typeof YoButton> = {
  title: 'Example/Button',
  component: YoButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large']
    },
    disabled: {
      control: { type: 'boolean'}
    },
    loading: {
      control: { type: 'boolean' }
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    }
  },
  args: { onClick: fn() }
}

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args) => ({
    components: { YoButton },
    setup() {
      return { args };
    },
    template: container(
      `<yo-button v-bind="args">{{args.content}}</yo-button>`
    ),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.tripleClick(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

// export const Circle: Story = {
//   args: {
//     icon: "search",
//   },
//   render: (args) => ({
//     components: { YoButton },
//     setup() {
//       return { args };
//     },
//     template: container(`
//       <yo-button circle v-bind="args"/>
//     `),
//   }),
//   play: async ({ canvasElement, args, step }) => {
//     const canvas = within(canvasElement);
//     await step("click button", async () => {
//       await userEvent.click(canvas.getByRole("button"));
//     });

//     expect(args.onClick).toHaveBeenCalled();
//   },
// };

// Circle.parameters = {};

export default meta;