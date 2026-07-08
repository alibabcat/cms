/**
 * dependency-cruiser configuration — used to generate the codemap
 * (see `pnpm codemap`). Tuned for visualising the source graph of the
 * two apps in this monorepo, not for CI rule enforcement.
 *
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  options: {
    /**
     * Anything matching these paths is left out of the graph entirely.
     * Keeps the codemap focused on hand-written source.
     */
    doNotFollow: {
      path: ['node_modules'],
    },
    exclude: {
      path: [
        'node_modules',
        '\\.next/',
        '(^|/)dist/',
        '(^|/)build/',
        '(^|/)out/',
        '(^|/)coverage/',
        '(^|/)public/',
        // generated + tooling files that add noise, not signal
        'payload-types\\.ts$',
        'payload-generated-schema\\.ts$',
        'importMap\\.js$',
        'next-env\\.d\\.ts$',
        '\\.d\\.ts$',
        '\\.(test|spec)\\.(ts|tsx|js|jsx)$',
        '(^|/)__tests__/',
        '(^|/)__mocks__/',
      ],
    },

    // `includeOnly` / `tsConfig` are intentionally left out here: each
    // app is cruised from its own directory (see the per-app `codemap`
    // scripts) and passes its own `--ts-config`, because the two apps
    // use conflicting `@/*` path-alias roots that a single tsconfig
    // cannot resolve at once.
    tsPreCompilationDeps: true,

    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    reporterOptions: {
      text: {
        highlightFocused: true,
      },
    },
  },
};
