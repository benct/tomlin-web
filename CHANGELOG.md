# Changelog
All notable changes to this project will be documented in this file.

## [2.10.1] - 2019-07-09
### Changed
- Improve general loading indication
- Refactor api get/post functions
- Rewrite site information text
- Replace some quotes

### Fixed
- Incorrect number formatting on admin stats

### Removed
- Old links page component and content

## [2.10.0] - 2019-07-07
### Added
- Multiple types and TypeScript related packages
- Material Design Icons (MDI) packages
- Loading indication on login request
- Live GitHub data in about section

### Changed
- Rewrite all JavaScript to TypeScript
- Restructure media data and components
- Improve suspended and private route setup
- Replace custom SVG icons with MDI icons
- Rewrite authentication as redux actions
- Several minor code improvements and cleanup
- Capitalize React component files
- Update React refs usage
- Extract babel options to .babelrc
- Upgrade several dependencies

### Fixed
- Invalid values in post API requests

## [2.9.3] - 2019-05-06
### Added
- Administration notes component
- CRUD functionality for notes

### Changed
- Enable React strict mode
- Move file handling under administration
- Refactor common modal component
- Refactor file loading actions
- Upgrade dependencies

### Removed
- Simple file note component

## [2.9.2] - 2019-04-30
### Added
- Tracking of page views / visits
- Administration view for visits
- Navigation sub menu for administration

### Changed
- Separate administration views
- Include referrer in auth query
- Extract sub menu data from nav component
- Upgrade dependencies

## [2.9.1] - 2019-03-10
### Added
- General DB stats in admin view
- IATA data administration
- Stored media search functionality

### Changed
- New API url `api.tomlin.no`
- Update files and auth service parameters
- Minor text changes in admin view
- Simplify and clean up form CSS

## [2.9.0] - 2019-03-03
### Added
- Administration page
- Server logging view
- Media data batch updating functionality
- JS and CSS asset name hashing

### Changed
- Less bold navigation menu
- Move poster update to admin page
- Upgrade dependencies

## [2.8.2] - 2019-02-12
### Added
- Office and storage temperatures

### Changed
- Format home state values
- Small cleanup of home state component
- Upgrade minor dependencies

### Removed
- Upload and download speeds

## [2.8.1] - 2019-01-29
### Added
- Episode stats in media overview
- Icon support in countdown title

### Changed
- Upgrade dependencies
- Set correct main file in package.json
- Update footer/copyright

### Fixed
- Date formatting error after lib update
- Bug in text file previews

## [2.8.0] - 2018-11-25
### Added
- Home status/state component
- Several home status icons
- Time component with locale and timezone support
- Sensor values endpoint in backend API
- Information icon and help text on home status
- Link to employer in cv/about section
- Countdown to something.. quite important

### Changed
- Slight alteration of front page text
- Improve countdown and pagination components
- Extract most icons in to separate SVG files
- Reduce delay on loading indicator
- Header html tags for title and header
- Upgrade several dependencies

## [2.7.4] - 2018-11-05
### Added
- Common media overview/stats page
- Season and episode support for TV media
- Track seen on TV episodes
- Sorting functionality for media lists
- Loading indicator during all async actions
- Common suspense component for lazy loading

### Changed
- Move media components (except stats) behind login
- Refactor media item/modal handling
- Further improve accessibility

### Removed
- Stats in media lists

## [2.7.3] - 2018-10-27
### Added
- Lazy-loading using React.lazy() and Suspense
- Memoization using React.memo() and PureComponent
- Functionality for finding similar and recommended media
- New icons for similar and recommendations
- Tooltips on media links

### Changed
- Upgrade yarn and several packages
- Optimize components using new react features
- Support postfix on pagination path
- Refactor some component prop mappings
- Update manifest and favicon assets
- Default to non-circle social icons
- Improve accessibility

## [2.7.2] - 2018-10-25
### Added
- Media modal for more detailed information
- Updating functionality for media items
- Confirmation dialog when removing media
- TMDb- and remove-icons
- Link to media item at TMDb

### Changed
- Refactor actions in to separate files
- Improve media state handling
- Simplify several components

### Fixed
- Update UI properly on some media state changes
- Prevent search on empty action or type

### Removed
- Menu icon on small screens

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
