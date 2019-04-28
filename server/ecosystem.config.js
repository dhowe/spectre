module.exports = {
  apps : [{
    name: 'spectre-server',
    script: 'server.js',
    instances: 1,
    node_args: '-r esm',
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
