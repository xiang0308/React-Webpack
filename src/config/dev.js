'use strict';

import baseConfig from './base';

let config = {
	appEnv: 'dev',
	rootUrl: baseConfig.devUrl,
	shareUrl: baseConfig.shareDevUrl
};

export default Object.freeze(Object.assign({}, baseConfig, config));
