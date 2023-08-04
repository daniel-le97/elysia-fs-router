import dts from 'bun-plugin-dts'
import pkg from './package.json'

const build = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
  plugins: [dts()]
})



