'use strict'

const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

const logger = require('tracer').console({
  level: LOG_LEVEL,
  format: [
    '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
    {
      error:
        '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}',
    },
  ],
  dateformat: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
  preprocess: function (data) {
    data.title = data.title.toUpperCase()
  },
})

logger.info('Logger configured.')

module.exports = logger
