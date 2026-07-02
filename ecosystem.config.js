module.exports = {
    apps: [
        {
            name: 'meu-exame',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            cwd: __dirname,
            exec_mode: 'fork',
            instances: 1,

            env: {
                NODE_ENV: 'production',
                PORT: 8000,
            },
        },
    ],
};
