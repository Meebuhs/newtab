# Newtab

A customisable replacement for chrome's new tab page.

Built with:

- Webpack (4.x)
- Babel (7.x)
- Typescript (3.x)
- React (16.x)
- Redux (4.x)
- Reselect
- Sass

Development server using:

- Express
- webpack-dev-middleware & webpack-hot-middleware

Style-checking:

- Prettier
- Tslint
- Stylelint & stylelint-config-sass-guidelines

Tested with:

- Jest
- Enzyme
- redux-mock-store

## Usage

### Download

The extension will be available on the chrome web store after the first release.

### Build

It is also possible to build and load the extension yourself before release.

```
// Clone repository
git clone https://github.com/Meebuhs/newtab

// Install dependencies
cd newtab
yarn

// Pack a production build
yarn build
```

Finally in chrome go to `chrome://extensions` and ensuring developer mode is enabled, load an unpacked extension and choose newtab/build.

## Development

```
git clone https://github.com/Meebuhs/newtab
cd newtab
yarn
```

### Yarn commands

| Command         | Description                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn start`    | Starts a local development server on port 3000 and uses webpack-hot-middleware to rebuild with webpack when changes are made to the project. |
| `yarn lint`     | Runs tslint/prettier and stylelint.                                                                                                          |
| `yarn prettier` | Perform in-place prettier reformat.                                                                                                          |
| `yarn test`     | Runs the test-suite using Jest.                                                                                                              |

## License

This project is released as open source under the [MIT License](https://opensource.org/licenses/MIT)
