'use strict';

import baseConfig from './base';

let config = {
	appEnv: 'dist',
	rootUrl: baseConfig.distUrl,
	shareUrl: baseConfig.shareDistUrl
};

export default Object.freeze(Object.assign({}, baseConfig, config));
