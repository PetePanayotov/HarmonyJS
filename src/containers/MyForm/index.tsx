import * as React from 'react';
import { Dispatch } from 'redux';
import { InjectedFormProps, Form, getFormValues } from 'redux-form';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import MyInputField from 'common-components/MyInputField';
import { email, required } from 'utils/validations';
import MyDropDown, { Option } from 'common-components/MyDropDown';
import { Button } from '@material-ui/core';
import { MyFormActionActions, MyFormActionSelector } from 'actions/myFormAction';
import { MySagaFunction } from 'actions/myFormAction/interface';
import { MoveToNextStepFunction } from 'actions/flowManager/interface';
import { moveToNextStep } from 'actions/flowManager/sagas';
import { FlowManagerActions } from 'actions/flowManager';
import { flowManager } from '@base/features';
// import { MyFormActions, myFormSelector } from 'actions/redux/myForm';

const citiesCollection: Option[] = [
	{
		name: 'Dupnitsa',
	},
	{
		name: 'Sofia',
	},
	// {
	// 	name: 'Florence',
	// },

	// {
	// 	name: 'Vienna',
	// },

	// {
	// 	name: 'Rome',
	// },

	// {
	// 	name: 'Milan',
	// },
	// {
	// 	name: 'Barcelona',
	// },
];

export type Props = {};

export interface OwnProps extends Props {
	formValues: any;
	mySaga: typeof MySagaFunction;
	temp: {};
	city: string;
	moveToNextStep: typeof MoveToNextStepFunction;
}

type FormValues = {};

// export interface OwnProps extends Props, LocalizeContextProps {
// 	formValues: (formName: string) => FormValues;
// }

export class MyForm extends React.Component<OwnProps & InjectedFormProps> {
	mySybmit(values: any) {
		// moveToNextStep();
	}

	componentDidMount() {
		flowManager.endFlow();
	}

	render() {
		return (
			<Form onSubmit={this.props.handleSubmit(this.mySybmit)}>
				<MyInputField name="email" type="email" label="Email" validate={[required, email]} />
				<br></br>
				<MyDropDown
					name="city"
					type="select"
					label="City"
					options={citiesCollection}
					onChange={(event, newValue) => {
						const { mySaga } = this.props;
						const cityName = newValue.props.value;

						mySaga(cityName);
					}}
				/>
				<br></br>
				{this.props.city !== '' && (
					<h1>
						Current Temp in {this.props.city}: {this.props.temp}
					</h1>
				)}
				<Button
					type="submit"
					onClick={() => {
						const { moveToNextStep } = this.props;
						moveToNextStep();
					}}
				>
					Submit
				</Button>
			</Form>
		);
	}

	handleSubmit(formValues: FormValues) {
		// handle submit here
	}
}

export default baseConnectForm<any, any, Props>(
	MyForm,
	(state: ApplicationState) => ({
		formValues: getFormValues('MyForm')(state),
		city: MyFormActionSelector.selectCity(state),
		temp: MyFormActionSelector.selectTemp(state),
	}),
	(dispatch: Dispatch) => ({
		myFormActionSaga: (city: string) => dispatch(MyFormActionActions.mySaga(city)),
		mySaga: (city: string) => dispatch(MyFormActionActions.mySaga(city)),
		moveToNextStep: (step: string) => dispatch(FlowManagerActions.moveToNextStep(step)),
	}),
	{
		form: 'MyForm',
	}
);
