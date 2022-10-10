// @ts-check

import svelte from 'rollup-plugin-svelte';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
// import { less } from 'svelte-preprocess-less';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
// import typescript from "rollup-plugin-typescript2";
// import { svelteSVG } from "rollup-plugin-svelte-svg";
// import html from '@web/rollup-plugin-html';
// import html from 'rollup-plugin-template-html';

import { writeFileSync } from 'fs';

// import livereload from 'rollup-plugin-livereload';

let release = false;

release = true;
// const production = !process.env.ROLLUP_WATCH;

let formats = {
  example: {
    input: "./examples/app.js",
    name: 'Datepicker',
    file: './examples/build/app.js',
    sourcemap: true,
    format: 'iife'
  },
  iife: {    
    name: 'Datepicker',
    file: './public/build/bundle.iife.js',
    sourcemap: true,
    format: 'iife'
  },
  umd: {
    name: 'Calendar',
    file: './public/build/bundle.umd.js',
    sourcemap: true,
    format: 'umd'
  },
  esm: {
    name: 'Calendar',
    file: './public/build/bundle.esm.js',
    sourcemap: true,
    format: 'es'
  }
}

const formatInfo = formats.esm;
  

module.exports = {
  input: formatInfo.input ?? "./src/Datepicker.svelte",
  output: {
    format: formatInfo.format,
    name: formatInfo.name,
    file: formatInfo.file,

    // file: './scripts/dialogs_app.js',

    sourcemap: true
    // sourcemapPathTransform: mapfile => `maps/${mapfile}`
  },
  plugins: [
	// svelteSVG({
	// 	// optional SVGO options
	// 	// pass empty object to enable defaults
	// 	svgo: {}
	// }),

    svelte({
      // preprocess: {
      // 	// style: less({}),
      // },
      preprocess: sveltePreprocess({
        sourceMap: !release
      //   defaults: {
      //     style: 'stylus'
      //   }
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !release
      }
		// extensions: ['.svelte', '.ts', '.js', '.svg']
		// extensions: ['.svelte', '.ts', '.svg']
		// extensions: ['.svelte', '.ts']
    }),

    // css
    css({
		    /* eslint-disable-next-line */
        output: function (styles, styleNodes) {
        writeFileSync(formatInfo.input ? 'examples/app.css' : 'public/calendar.css', styles);
		  }
      // output: 'styles/dialog_app.css'
    }),
    // typescript({
    //   // rootDir: './source',
    //   sourceMap: true,
    //   // typescript: require("typescript"),
    //   // verbosity: 3
    // }),
    nodeResolve({
      browser: true,
      dedupe: ['svelte']
    }),
   //  commonjs(),

    release && terser()
  ],
  watch: {
    clearScreen: false
  }
};
