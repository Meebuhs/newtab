# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.4.0 - 2019-12-24

## Added

- Added ability to export and import configuration.

## 0.3.0 - 2019-12-20

## Added

- Added gradient display mode for tiles.
- Added ability to configure page background.
  - Added colour, gradient, user image, unsplash and animation display modes.

## 0.2.0 - 2019-12-13

### Added

- Added base functionality of tile grid.
  - Added ability to add tiles and columns.
  - Added ability to customise appearance of tiles.
  - Added ability to reorder tiles and columns using drag and drop.
  - Added ability to remove columns and tiles in editable-grid.
  - Added sidebar which enables grid editing when open.
- Added redux-mock-store, react-beautiful-dnd and react-modal.
- Added local storage persistence of redux store.

### Changed

- Changed from sass-lint to stylelint + stylelint-config-sass-guidelines.
- Changed from express and webpack-dev-middleware/webpack-hot-middleware to webpack-dev-server.

## 0.1.1 - 2018-11-27

### Added

- Added enzyme testing support.
- Added reselect for selector creation.

## 0.1.0 - 2018-11-26

### Added

- Added boilerplate for development with webpack, babel, react, redux, typescript and sass.
- Added development server using express and webpack-dev-middleware/webpack-hot-middleware.
- Added style checking with prettier, tslint and sass-lint.
- Added testing with jest.
