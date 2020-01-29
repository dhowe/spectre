module.exports = {
  apps : [{
    name: 'spectre-server',
    log_file: 'spectre.log',
    script: 'server.js',
    node_args: '--require=esm',
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};

// ref: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
