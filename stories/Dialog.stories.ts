import {Meta, Story} from '@storybook/angular/types-6-0';
import {DialogDemoComponent} from '../projects/cms-ui-bs-demo/src/app/modules/dialog-demo/dialog-demo.component';

export default {
  title: 'Example/Dialog',
  component: DialogDemoComponent,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as Meta;

const Template: Story<DialogDemoComponent> = (args: DialogDemoComponent) => ({
  component: DialogDemoComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
};
