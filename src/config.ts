interface Config {
	ROOT_SERVER_URL?: string;
	ROOT_WS_URL?: string;
	USE_WS_ACTION?: boolean;
	COMMON_AUTHORIZATION_HEADER?: string;
	COMMON_URL_PARAMS?: Array<{ key: string; value: string }>;
	appName?: string;
	API_KEY?: string;
}

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: Function;
	}
}

const initConfig = (): Config => {
	let appConfig: Config = {};

	if (process.env.NODE_ENV === 'development') {
		/* ---------- Config Development --------- */
		appConfig = {
			USE_WS_ACTION: false,
			ROOT_SERVER_URL: 'http://localhost:5555/v1/',
			COMMON_AUTHORIZATION_HEADER: 'uxfauthorization',
			COMMON_URL_PARAMS: [{ key: 'salesChannel', value: 'retail' }],
			ROOT_WS_URL: 'ws://localhost:3030',
			API_KEY: 'b1fdaa13bc3fcfdccc5f3d96033840ab',
		};
	} else if (process.env.NODE_ENV === 'production') {
		/* ---------- Config Production --------- */
		appConfig = {
			USE_WS_ACTION: false,
			ROOT_SERVER_URL: 'http://localhost:5555/v1/',
			COMMON_AUTHORIZATION_HEADER: 'uxfauthorization',
			COMMON_URL_PARAMS: [{ key: 'salesChannel', value: 'retail' }],
			ROOT_WS_URL: 'ws://localhost:3030',
		};
	}

	return appConfig;
};

export const config = initConfig();
