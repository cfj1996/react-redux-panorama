import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  external: Object.keys(pkg.peerDependencies || {}).concat('react-dom'),
  output: {
    format: 'umd',
    name: 'ReactRedux',
    globals: {
      react: 'React',
      redux: 'Redux',
    },
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'runtime',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      preventAssignment: true,
    }),
    commonjs(),
  ],
}

if (env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  )
}

export default config
