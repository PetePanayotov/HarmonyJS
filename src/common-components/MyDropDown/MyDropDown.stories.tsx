/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { ComponentStory, Meta } from '@storybook/react';
import MyDropDown, { Props as MyDropDownProps } from './index';

export default {
	title: 'Design System/',
	component: MyDropDown,
	argTypes: {

	},
	decorators: [BaseStorybookDecorator],
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof MyDropDown> = (args) => <MyDropDown {...args} />;

export const Default = Template.bind({});
Default.args = {

} as MyDropDownProps;
