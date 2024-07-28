const { build } = require('esbuild');
build({
  entryPoints: ['src/lambda.ts'],
  bundle: true,
  platform: 'node',
  // minify: true, 
  outfile: './cdk/bundle/bundle.js',
}).catch(() => process.exit(1));