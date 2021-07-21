import * as React from 'react';
import { BaseFieldProps, Field, WrappedFieldProps } from 'redux-form';
import { TextField, TextFieldProps } from '@material-ui/core';

export type Props = {} & BaseFieldProps & TextFieldProps;

const MyTextField = (props: WrappedFieldProps) => {
	const { input, meta, ...rest } = props;
	const { touched, error, warning } = meta;
	const errorMessage = touched ? warning || error : undefined;

	return <TextField {...input} {...rest} helperText={errorMessage} error={errorMessage} />;
};

const MyInputField: React.FC<Props> = (props: Props) => {
	return <Field {...(props as BaseFieldProps)} component={MyTextField} />;
};

export default MyInputField;
