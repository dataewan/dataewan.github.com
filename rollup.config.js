import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import copy from "rollup-plugin-copy";
import svelte from "rollup-plugin-svelte";
import * as matter from "gray-matter";
import {extname, join, basename} from "path";
import {readdirSync, statSync, existsSync} from "fs";
import babel from "@rollup/plugin-babel";
import {terser} from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import {mdsvex} from "mdsvex";

function get_date(dataDate, filepath) {
  if (dataDate) {
    return new Date(dataDate)
  }

  return new Date(statSync(filepath).ctime)
}

function read_svx(filename) {
  const parsed = matter.read(filename)
  const date = get_date(parsed.data.date, filename)
  return {
    data: parsed.data,
    date: date,
  }
}

function get_routes() {
  const blog_path = join(process.cwd(), 'src', 'routes', 'blog');
  const svx_files = readdirSync(blog_path).filter(p => extname(p) === ".svx")
  const isDir = (d) => {
    const stats = statSync(join(blog_path, d))
    return stats.isDirectory()
  }
  const directories = readdirSync(blog_path)
    .filter(p => isDir(p))
    .filter(p => existsSync(join(blog_path, p, "index.svx")))
  const svx_read = svx_files.map(post => {
    const filename = join(blog_path, post)
    const parsed = read_svx(filename)
    return {
      ...parsed,
      slug: basename(filename, ".svx"),
    }
  })
  const directories_read = directories.map(dir => {
    const filename = join(blog_path, dir, "index.svx")
    const parsed = read_svx(filename)
    return {
      ...parsed,
      slug: dir,
    }
  })
  return svx_read.concat(directories_read)
}

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const COPY_IMAGES = {
  targets: [
    {src: "src/routes/**/*.png", dest: "static"},
    {src: "src/routes/**/*.jpg", dest: "static"},
    {src: "src/routes/**/*.gif", dest: "static"},
    {src: "src/routes/**/*.svg", dest: "static"},
  ]
}

const replaceConstants = {
  'process.env.NODE_ENV': JSON.stringify(mode),
  '__ROUTES__': JSON.stringify(get_routes())
}

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

const extensions = [".svelte", ".svx"];
export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        ...replaceConstants,
        "process.browser": true,
      }),
      svelte({
        extensions,
        dev,
        hydratable: true,
        emitCss: true,
        preprocess: mdsvex()
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      image(),
      copy(COPY_IMAGES),
      commonjs(),

      legacy &&
      babel({
        extensions: [".js", ".mjs", ".html", ...extensions],
        babelHelpers: "runtime",
        exclude: ["node_modules/@babel/**"],
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead"
            }
          ]
        ],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",
          [
            "@babel/plugin-transform-runtime",
            {
              useESModules: true
            }
          ]
        ]
      }),

      !dev &&
      terser({
        module: true
      })
    ],

    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        ...replaceConstants,
      }),
      svelte({
        extensions,
        hydratable: true,
        preprocess: mdsvex(),
        generate: "ssr",
        dev
      }),
      resolve({
        dedupe: ['svelte']
      }),
      image(),
      copy(COPY_IMAGES),
      commonjs()
    ],
    external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
    preserveEntrySignatures: 'strict',
    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        ...replaceConstants,
      }),
      image(),
      copy(COPY_IMAGES),
      commonjs(),
      !dev && terser()
    ],
    preserveEntrySignatures: false,
    onwarn
  }
};
