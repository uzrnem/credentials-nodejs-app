'use strict';

function getEnv(envVariable) {
  return process.env[envVariable];
}

const database_name = 'EXP_CONFIG_DATABASE_NAME';
const host_name = 'EXP_CONFIG_HOST_NAME';

var defaultConfig = {
	database_name : 'expense',
	host: 'localhost'
};

module.exports = {
	DATABASE : getEnv(database_name) || defaultConfig.database_name,
	HOST: getEnv(host_name) || defaultConfig.host,
};
