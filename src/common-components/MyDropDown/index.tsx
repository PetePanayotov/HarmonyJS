import * as React from 'react';
import { Field, BaseFieldProps, WrappedFieldProps, change } from 'redux-form';
import { Select, SelectProps, MenuItem } from '@material-ui/core';
import { Store } from '@base/features';

export type Option = {
	name: string;
};

type SelcetProps = {
	options: Option[];
	label: string;
} & WrappedFieldProps &
	SelectProps;

export type Props = {
	options: Option[];
	label: string;
} & BaseFieldProps &
	SelectProps;

const renderSelect = (props: SelcetProps) => {
	const {
		label,
		options,
		input,
		meta: { touched, error, warning },
		...rest
	} = props;

	const { onChange } = input;

	const errorMessage = touched ? warning || error : undefined;
	return (
		<Select
			{...input}
			id="select"
			label={label}
			value={input.value}
			{...rest}
			error={errorMessage}
			onChange={(event, newValue) => {
				onChange(newValue);
			}}
		>
			{options.map(({ name }, index) => (
				<MenuItem key={index} value={name}>
					{name}
				</MenuItem>
			))}
		</Select>
	);
};

const MyDropDown: React.FC<Props> = (props: Props) => {
	return <Field {...(props as BaseFieldProps)} component={renderSelect} />;
};

export default MyDropDown;
