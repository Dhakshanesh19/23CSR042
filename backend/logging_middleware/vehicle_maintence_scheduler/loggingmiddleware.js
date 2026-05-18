const axios = require('axios');

const VALID_STACKS = ['backend', 'frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = {
  backend: ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'],
  frontend: ['api', 'component', 'hook', 'page', 'state', 'style'],
  shared: ['auth', 'config', 'middleware', 'utils']
};

const LOG_API_URL = 'http://4.224.186.213/evaluation-service/logs';


async function Log(stack, level, package, message) {
  try {
    if (!VALID_STACKS.includes(stack)) {
      console.error(`Invalid stack value: ${stack}. Must be one of: ${VALID_STACKS.join(', ')}`);
      return;
    }

    if (!VALID_LEVELS.includes(level)) {
      console.error(`Invalid level value: ${level}. Must be one of: ${VALID_LEVELS.join(', ')}`);
      return;
    }

    const validPackagesForStack = [
      ...VALID_PACKAGES[stack],
      ...VALID_PACKAGES.shared
    ];

    if (!validPackagesForStack.includes(package)) {
      console.error(`Invalid package value: ${package} for stack: ${stack}. Must be one of: ${validPackagesForStack.join(', ')}`);
      return;
    }

    if (typeof message !== 'string' || message.trim() === '') { console.error('Message must be a non-empty string');
      return;
     }
 const logPayload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: package.toLowerCase(),
      message: message
    };

  const response = await axios.post(LOG_API_URL, logPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      console.log(`Log sent successfully: [${level.toUpperCase()}] ${package} - ${message}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error sending log to server: ${error.message}`);
    console.error(`Failed to log: [${level}] ${package} - ${message}`);
  }
}


module.exports = { Log };