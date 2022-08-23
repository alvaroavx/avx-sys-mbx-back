module.exports = {
  apps : [{
    name: 'MBX',
    script: 'npm run autopull',
  
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  
};
  