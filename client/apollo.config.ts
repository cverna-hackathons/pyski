export const apolloConfig = {
  client: {
    service: {
      name: 'pyski',
      url: 'http://localhost:4141/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.tsx',
      'src/**/*.ts',
    ],
  },
}