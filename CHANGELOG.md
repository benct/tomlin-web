# Changelog
All notable changes to this project will be documented in this file.

## [3.3.0] - 2023-10-05 - *Been, Autocomplete*
### Added
- Been/countries tracker with charts and world map
- Generic autocomplete input component
- IATA/ICAO data search tools using autocomplete
- Sorting functionality for visits tracking

### Changed
- Replace react-vis charts with recharts library
- Use autocomplete component for flight data input
- Restructuring and improvements in backend API

### Fixed
- Missing href on link button components
- Uncontrolled input error on flight form
- Incorrect colour of main loading text

## [3.2.0] - 2023-09-05 - *Roles, Ratings, Tools*
### Added
- Proper handling and administration of user roles
- Simple ratings page and functionality
- Tools page with QR code generator and encoder/decoder
- POC image/art curator functionality using QR codes

### Changed
- Simplified site design for standalone pages
- Improved authentication flow
- Extract theme toggle handling to hook
- Upgrade Next.js and SWR major versions

## [3.1.1] - 2022-10-17 - *More Tailwind*
### Changed
- More restructuring and refactoring of html structures
- CSS class names and styling of all remaining components
- Several styling adjustments for mobile screens
- Move some admin pages to base path
- Move all app code to `src` folder
- Replace home state with current weather data

### Fixed
- Correct GitHub link to changelog
- Correct sort order of media stats graph data
- Ensure menu is not focusable when hidden

## [3.1.0] - 2022-10-06 - *Tailwind*
### Added
- Tailwind CSS and configurations
- Theme handling with Tailwind (dark mode)
- New menu layout and styling

### Changed
- Restructuring and refactoring of html structure
- CSS class names and styling of public components
- Moved theme and version buttons to header
- Improved error handling for SWR requests

### Removed
- All custom CSS modules and code
- Custom themes and theme handling
- Changelog modal component

## [3.0.0] - 2022-09-26 - *Next.js*
### Added
- Next.js framework version 12
- Server data fetching with SWR
- Client side state with Context API
- Custom hooks for handling async requests

### Changed
- Major restructuring and refactoring for Next support
- Several modifications to existing components to support Next
- Replace react-router with Next's route handling
- Replace data state and fetching with SWR hooks

### Removed
- Webpack, loaders and babel configurations
- Redux, redux-thunk and redux-actions
- Changelog view and markdown support

## [2.17.0] - 2021-01-20 - *User Management*
### Added
- Support for proper user management
- Switch-styled checkbox CSS

### Changed
- Use named instead of default imports and exports
- Improve log management actions
- Improve common modal overlay components
- Simplify styling for buttons with icon
- Replace logout image with MDI icon
- Upgrade to React 17, Webpack 5, etc.

## [2.16.0] - 2020-09-30 - *More Hooks, Price Tracker*
### Added
- Implement hooks everywhere possible
- View and manage tracking of price data from a certain site
- Dynamic descriptive site titles on sub pages
- Support simple pages without header/footer

### Changed
- Convert remaining class components to functional components
- Use react hooks for all Router and Redux handling
- Refactor and improve routing components
- Minor code updates and improvements

### Fixed
- Incorrect request method for fetching external media IDs

## [2.15.0] - 2020-02-19 - *Improved Admin*
### Added
- Support pagination for logs and visits
- Database backup functionality in admin view
- List of latest Home Assistant states in admin view
- Caching of several API data endpoints

### Changed
- Improve file preview support
- Custom styling of flight list and form
- Exit icon and text on logout view
- Move GitHub data handling to backend API
- Simplify loading indication on GET requests
- Several admin layout and styling adjustments

### Fixed
- Flight form validation
- Button style inheritance

### Removed
- PureCSS package and CSS styling

## [2.14.0] - 2020-01-31 - *New API, Performance*
### Added
- Full support for new backend API
- Improved HTTP fetching utility functions
- Support new login and authentication handling
- Pre-connect link tag for API endpoint in HTML template
- Proper font-face CSS rules (skip google lookup query)
- Single log-entry deletion support
- Direct download button on file previews

### Changed
- Refactor async actions and calls to support new API
- Update interfaces to represent response data changes
- Replace short circuiting with nullish coalescing operator
- More use of optional chaining operator
- Make about-link text more descriptive
- Specify start_url in manifest.json
- Load day/night icon only when state is known

### Removed
- Most home state temperature and consumption data
- Fetch polyfill package whatwg-fetch

## [2.13.2] - 2019-12-02 - *Changelog View*
### Added
- Changelog view in modal overlay
- Support for markdown content
- No-icon and New Year's countdown options

### Removed
- Redundant dynamic import types

## [2.13.1] - 2019-12-01 - *Theme Persistence*
### Added
- Persist theme selection in localStorage
- Set countdown target from admin control view

### Changed
- Receive and handle site settings in validation response
- Use correct methods for interacting with localStorage
- Rename yarn task for running the app

### Fixed
- Blank background gap on components with low height

## [2.13.0] - 2019-11-28 - *Themes, Dark Mode*
### Added
- Basic CSS theming support
- Dark mode theme (midnight)

### Changed
- Use React's useRef rather than createRef
- Refactor and use more React Hooks
- Improve webpack bundling of CSS assets
- Refactor header and footer as separate components
- Refactor and replace many media icons

### Fixed
- Not possible to save new notes

### Removed
- Circle version and toggling of social icons
- Home state and media icon files

## [2.12.0] - 2019-10-21 - *Redux Boilerplate, React Hooks*
### Added
- Redefined actions using redux-actions package
- Proper typing for redux-thunk actions

### Changed
- Refactor several classes to functions using React Hooks
- Make on-mount action calls handle logged-in state change
- Multiple redux-related TS interfaces and types
- Move types and interfaces to declarations file
- Update countdown timer with new target

### Fixed
- Undefined path value in media search pagination
- Missing recommended eslint-settings

### Removed
- Custom redux action boilerplate handlers

## [2.11.1] - 2019-07-21 - *Form Improvements*
### Added
- Swapping of airport input values on flights form
- Set flight arrival date when setting departure date

### Changed
- Extract loading indicators to common component
- Separate loading state for login requests
- Improve controlled inputs on flights form

## [2.11.0] - 2019-07-19 - *Flight Tracking*
### Added
- Personal flight tracking components
- CRUD functionality for flights
- Grouping of flights as trips
- Try out React Hooks

### Changed
- Replace Normalize.css with PureCSS
- Refactor and clean up most CSS
- Change default date format

## [2.10.1] - 2019-07-09 - *Better Loading*
### Changed
- Improve general loading indication
- Refactor api get/post functions
- Rewrite site information text
- Replace some quotes

### Fixed
- Incorrect number formatting on admin stats

### Removed
- Old links page component and content

## [2.10.0] - 2019-07-07 - *TypeScript, MDI, GitHub*
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

### Fixed
- Invalid values in post API requests

## [2.9.3] - 2019-05-06 - *Notes*
### Added
- Administration notes component
- CRUD functionality for notes

### Changed
- Enable React strict mode
- Move file handling under administration
- Refactor common modal component
- Refactor file loading actions

### Removed
- Simple file note component

## [2.9.2] - 2019-04-30 - *Page Views*
### Added
- Tracking of page views / visits
- Administration view for visits
- Navigation sub menu for administration

### Changed
- Separate administration views
- Include referrer in auth query
- Extract sub menu data from nav component

## [2.9.1] - 2019-03-10 - *Database Stats*
### Added
- General DB stats in admin view
- IATA data administration
- Stored media search functionality

### Changed
- New API url: api.tomlin.no
- Update files and auth service parameters
- Minor text changes in admin view
- Simplify and clean up form CSS

## [2.9.0] - 2019-03-03 - *Administration*
### Added
- Administration page
- Server logging view
- Media data batch updating functionality
- JS and CSS asset name hashing

### Changed
- Less bold navigation menu
- Move poster update to admin page

## [2.8.2] - 2019-02-12 - *New Sensors*
### Added
- Office and storage temperatures

### Changed
- Format home state values
- Small cleanup of home state component

### Removed
- Upload and download speeds

## [2.8.1] - 2019-01-29 - *Minor Fixes*
### Added
- Episode stats in media overview
- Icon support in countdown title

### Changed
- Set correct main file in package.json
- Update footer/copyright

### Fixed
- Date formatting error after lib update
- Bug in text file previews

## [2.8.0] - 2018-11-25 - *Smart Home*
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

## [2.7.4] - 2018-11-05 - *Stats, Seasons, Episodes, Loading*
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

## [2.7.3] - 2018-10-27 - *Lazy, Memo*
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

## [2.7.2] - 2018-10-25 - *Improved Media*
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

## [2.7.1] - 2018-10-21 - *Redux*
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

## [2.7.0] - 2018-10-16 - *Media, Toast, Tooltip*
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

## [2.6.1] - 2018-09-18 - *Social Links*
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

## [2.6.0] - 2018-09-16 - *Resume, Menus*
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

## [2.5.0] - 2018-09-15 - *Router Upgrades*
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

## [2.4.0] - 2018-09-14 - *Prettier*
### Added
- Prettier code style

### Changed
- Site title to Ben Tomlin
- Replace NPM with Yarn
- Upgrade eslint and plugins
- Upgrade to Webpack 4
- Rewrite webpack configs to match v4 specs
- Run prettier on all JS code
- New favicon

### Removed
- Remove package-lock file

## [2.3.0] - 2018-01-18 - *Navigation*
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

## [2.2.0] - ? - *Unknown?*
### Changed
- Not quite sure...
- Probably upgrades and cleanup

## [2.1.0] - 2018-01-14 - *Package Upgrades*
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

## [2.0.0] - 2017-12-28 - *New Stuff*
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

## [1.0.0] - 2016-2017 - *Old Stuff*
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
