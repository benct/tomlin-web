# Changelog
All notable changes to this project will be documented in this file.

## [2.7.1] - 2018-10-21
### Added
- App-wide state handling using Redux
- Proper pagination with page numbers
- Upload notice while uploading file
- Packages: redux, redux-thunk, react-redux, redux-devtools-extension

### Changed
- Refactor components to handle Redux state
- Clean up countdown and quote component
- Select media search field text on focus

### Fixed
- Handle missing external IDs for media

## [2.7.0] - 2018-10-16
### Added
- Site title in header section
- Media components
    - Movies
    - TV-Shows
    - Watchlist
    - Search (Admin)
- Toast component
- Pagination component
- Tooltip functionality
- API functions for querying [TMDb](https://developers.themoviedb.org)
- Service tag on post requests
- Packages: date-fns, iso-639-1

### Changed
- Substantial refactoring of backend API
- Improve promise handling in client api
- CSS cleanup of several components
- Refactor navigation component
- Refactor private routes
- Rename about-me section
- Probably lots more...

### Removed
- Unnecessary extra font

## [2.6.1] - 2018-09-18
### Added
- Social links in CV component

### Changed
- Make quotes a little less random

### Fixed
- Hot module replacement (HMR)
- Incorrect method binding
- Minor CSS issues

### Removed
- Back button in file component

## [2.6.0] - 2018-09-16
### Added
- New navigation layout and styling
- Menu icon for small screens
- Warning above login when trying to access restricted page
- Simple about me / CV component
- Faded refresh icon on quotes component

### Changed
- Several code optimizations
- Refactor and redesign navigation component
- Move navigation in to header section
- Extract SVGs to separate component
- Clean up CSS content
- New color palette
- Rewrite about section

### Removed
- Unused CSS classes

## [2.5.0] - 2018-09-15
### Added
- GitHub Badges in README.md
- CHANGELOG.md

### Changed
- Upgrade react-router and react-router-dom to version 4
- Rewrite routing to match react-router v4 specs
- Reorganize react component file structure
- Rename entry.js to index.js
- Replace old react lifecycle methods
- Update README.md

### Removed
- Removed unnecessary main.js setup file
- Transition effects on components

## [2.4.0] - 2018-09-14
### Added
- Prettier code style

### Changed
- Site title to Ben Tomlin
- Replace NPM with Yarn
- Upgrade eslint and plugins
- Upgrade several dependencies
- Upgrade to Webpack 4
- Rewrite webpack configs to match v4 specs
- Run prettier on all JS code
- New favicon

### Removed
- Remove package-lock file

## [2.3.0] - 2018-01-18
### Added
- Compress images with webpack-image-loader
- Navigation component
- Notes data component

### Changed
- Small font and alignment adjustments
- Improve file-loader configs
- Caching and compression optimizations in .htaccess
- Make site crawlable

### Removed
- Link to invalid path

## [2.2.0] - ?
### Changed
- Not quite sure...

## [2.1.0] - 2018-01-14
### Added
- Links data component
- UglifyJS webpack plugin

### Changed
- Update README.md with lint task
- Update about text
- Update copyright
- Upgrade react, react-dom, react-transition-group
- Upgrade eslint, plugins and config
- Upgrade to Webpack 3
- Upgrade to Babel 7
- Upgrade several dependencies

## [2.0.0] - 2017-12-28
### Added
- New site design
- Quotes component
- Package-lock file

### Changed
- Several major layout and structure changes
- Reorganize and rename several files
- Clean up svg files
- Update about text

### Removed
- Duplicate dependencies
- Unused background images
- Side navigation panel

## [1.0.0] - 2016-2017
- Early versions of this app

### Added
- Webpack setup and configs
- Node/NPM setup and package file
- Basic React app setup
- Home/Index component
- Countdown component
- About component
- Authentication
- Login/logout components
- File system components
- Transition effects
- Icons, images, favicon
- Apache config
- README.md
- Licence
- Lots more...
