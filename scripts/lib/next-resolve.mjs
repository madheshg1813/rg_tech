/*
 * Lets plain node import the project's lib/*.js modules.
 *
 * Next.js resolves extensionless specifiers ("./data") and the "@/" alias; node
 * ESM does neither, so importing lib/stainlessSteel.js from a script fails on
 * its very first import. This hook fills in the rules Next applies, so the
 * audit can read the real exported data instead of regexing the source for it.
 *
 * It also supplies the `with { type: 'json' }` attribute that node now demands
 * and a bundler does not, which lib/cities.js needs for its locations file.
 */
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve as resolvePath } from 'node:path'

const ROOT = resolvePath(fileURLToPath(import.meta.url), '../../..')

export async function resolve(specifier, context, next) {
    let spec = specifier

    // "@/lib/x" -> "<root>/lib/x"
    if (spec.startsWith('@/')) spec = pathToFileURL(resolvePath(ROOT, spec.slice(2))).href

    // "./data" -> "./data.js", and "./x" -> "./x/index.js"
    if (spec.startsWith('.') || spec.startsWith('file:')) {
        const base = spec.startsWith('.')
            ? resolvePath(dirname(fileURLToPath(context.parentURL)), spec)
            : fileURLToPath(spec)
        if (!existsSync(base) || !/\.[mc]?js$/.test(base)) {
            for (const candidate of [`${base}.js`, `${base}.mjs`, `${base}/index.js`]) {
                if (existsSync(candidate)) { spec = pathToFileURL(candidate).href; break }
            }
        }
    }

    return next(spec, context)
}

/** JSON imports in this project are written bundler-style, with no attribute. */
export async function load(url, context, next) {
    if (url.endsWith('.json')) context = { ...context, importAttributes: { type: 'json' } }
    return next(url, context)
}
