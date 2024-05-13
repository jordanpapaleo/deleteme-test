const esbuild = require('esbuild')
const pkg = require('./package.json')

/**
 * @type {esbuild.BuildOptions}
 */
const defaultConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: false,
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
  ],
}

// Ecma script modules build
esbuild
  .build({
    ...defaultConfig,
    outfile: './dist/index.mjs',
    format: 'esm',
  })
  .catch((err) => {
    console.log('ESM build error', err)
  })

// common js build
esbuild
  .build({
    ...defaultConfig,
    outfile: './dist/index.js',
    format: 'cjs',
  })
  .catch((err) => {
    console.error('CJS build error', err)
    throw err
  })
