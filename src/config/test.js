'use strict';

import baseConfig from './base';

let config = {
	appEnv: 'test',
	rootUrl: baseConfig.qaUrl,
	shareUrl: baseConfig.shareQaUrl
};

export default Object.freeze(Object.assign(baseConfig, config));
