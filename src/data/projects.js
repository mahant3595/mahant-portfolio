/**
 * Project inventory.
 *
 * Only verified projects are listed. Nothing here is embellished: every
 * feature, technology and result below comes from the uploaded project
 * report for SkyPredict AI.
 *
 * To add a project, copy the object shape and fill in the fields.
 * Set `deployment` to null when a project is not publicly deployed —
 * the UI then shows a status badge instead of a fake demo link.
 */
export const projects = [
  {
    slug: 'skypredict-ai',
    title: 'SkyPredict AI',
    subtitle: 'On-device machine-learning weather prediction for Android',
    category: 'Android · Machine Learning',
    year: '2026',
    status: 'Completed',
    deployment: null, // No public deployment / store listing was provided.
    repo: 'https://github.com/mahant3595/SkyPredict-AI',
    reportFile: 'docs/sky-predict-ai-report.pdf',
    cover: 'images/projects/skypredict-1.jpg',
    accent: 'from-[#132030] via-[#16263a] to-[#0f1720]',
    summary:
      'An offline-first Android app that predicts temperature, humidity and rain probability on the device itself using a bundled historical dataset and a local k-NN regression engine.',

    overview:
      'SkyPredict AI is an offline-first Android weather prediction application written in Java and XML. It bundles a historical weather dataset and runs a multivariate k-Nearest Neighbours regression engine directly on the phone to predict temperature, relative humidity and precipitation probability. Results are presented through cards, 24-hour and seven-day forecasts, and interactive charts, then stored in a local Room database so predictions can be reviewed and shared later.',

    problem:
      'Most mobile weather apps depend on a live online service. The project brief was to build an app that predicts local weather from historical data using machine learning, shows temperature, humidity and precipitation graphically, and lets the user save and share predictions.',

    solution:
      'A self-contained Android application that accepts a city and a prediction date, runs a lightweight k-NN regression over bundled historical records, and renders the forecast as cards and charts. Every prediction is persisted locally with Room and can be shared as text, an image, a CSV export or the APK itself through Android FileProvider.',

    features: [
      'City search with auto-complete plus an A–Z dropdown of 100+ cities',
      'On-device 24-hour and seven-day weather prediction',
      'Interactive temperature, humidity and rain-probability charts',
      'Severity advisory badges such as Heat Warning or Heavy Rain Risk',
      'Automatic prediction history saved with Room over SQLite',
      'CSV export, image sharing and forecast sharing via FileProvider',
      'Celsius / Fahrenheit switching and pull-to-refresh',
    ],

    stack: [
      'Java 17',
      'Android SDK (API 24+)',
      'XML Views',
      'Material Components',
      'k-NN Regression',
      'Room / SQLite',
      'MPAndroidChart',
      'Retrofit',
      'Android Studio',
    ],

    screenshots: [
      { src: 'images/projects/skypredict-1.jpg', alt: 'SkyPredict AI home dashboard with city search and current weather for Mumbai' },
      { src: 'images/projects/skypredict-3.jpg', alt: 'SkyPredict AI 24-hour and seven-day prediction screen' },
      { src: 'images/projects/skypredict-5.jpg', alt: 'SkyPredict AI temperature, humidity and rain chart screens' },
      { src: 'images/projects/skypredict-6.jpg', alt: 'SkyPredict AI saved prediction history screen with CSV export' },
    ],

    architecture: [
      {
        step: '01',
        title: 'User input',
        detail: 'The user searches for or selects a city and a prediction date on the dashboard.',
      },
      {
        step: '02',
        title: 'Local prediction engine',
        detail:
          'WeatherPredictor runs multivariate k-NN regression (k = 4) with inverse-distance weighting over the bundled CSV dataset.',
      },
      {
        step: '03',
        title: 'Feature distance',
        detail:
          'Day-of-year (with year-end wrapping) and a city modifier are normalised to 0–1, then weighted as 1 / (distance + 0.01).',
      },
      {
        step: '04',
        title: 'Persistence',
        detail: 'Each prediction is written to a Room SQLite table on a background thread.',
      },
      {
        step: '05',
        title: 'Presentation & sharing',
        detail:
          'Cards, forecast lists and MPAndroidChart views render the results; text, PNG, CSV and APK are shared via content URIs.',
      },
    ],

    contribution:
      'Sole developer — application architecture, the k-NN regression engine, Java/XML interface, Room persistence layer, chart integration, sharing flows and the JUnit test suite.',

    challenges: [
      'Keeping predictions meaningful without a live meteorological feed, solved by normalising both features and weighting by inverse distance.',
      'Keeping the interface responsive while writing history records, solved by moving database work to background threads.',
      'Sharing generated files safely, solved with FileProvider content URIs so raw file paths are never exposed.',
    ],

    learnings: [
      'Applied a real regression algorithm inside a mobile app instead of calling a remote model.',
      'Designed a Room entity/DAO/database layer and verified it with JUnit tests.',
      'Balanced offline-first constraints against forecast quality, and documented the limits honestly.',

    ],

    metrics: [
      { label: 'JUnit tests', value: '5 / 5 passing' },
      { label: 'Inference time', value: '< 15 ms' },
      { label: 'Cities supported', value: '100+' },
      { label: 'Network required', value: 'None' },
    ],
  },
  {
    slug: 'crystalwall-new-tab',
    title: 'CrystalWall New Tab Dashboard',
    subtitle: 'A Chrome new-tab dashboard with wallpaper management, instant search and a focus timer',
    category: 'Browser Extension · Frontend',
    year: '2026',
    status: 'Released (v1.2.1)',
    // Published as a static GitHub Pages demo; also installable as an unpacked
    // extension from the repository.
    deployment: {
      url: 'https://mahant3595.github.io/CrystalWall-newTab-chromeExtension/',
      label: 'Live demo',
    },
    repo: 'https://github.com/mahant3595/CrystalWall-newTab-chromeExtension',
    reportFile: '',
    cover: 'images/projects/crystalwall-1.jpg',
    accent: 'from-[#0f2b2c] via-[#123033] to-[#0a1418]',
    summary:
      'A Manifest V3 Chrome extension that replaces the new tab with a calm dashboard: live clock, Google search with suggestions, shortcut tiles, a focus timer, optional local weather and a full wallpaper manager that accepts uploads, pasted images and media fetched from the web.',

    overview:
      'CrystalWall is a Manifest V3 Chrome extension that overrides the browser new tab with a single-screen dashboard: a live clock and date, a Google search field with suggestions, shortcut tiles, a 25-minute focus timer, music controls and optional local weather. Its centrepiece is the wallpaper manager, which treats wallpapers as a managed collection — separate system and uploaded libraries, drag-to-reposition with live preview, click-to-top and keyboard reordering, plus import from a file, the clipboard or a URL. All uploads and preferences are stored locally in the browser.',

    problem:
      'A default new tab is an empty page. Most new-tab extensions either put customisation behind an account or reduce wallpaper handling to a static image picker — no video, no reordering, and no way to bring in media from the web.',

    solution:
      'One local dashboard that manages wallpapers properly: collapsible system and uploaded libraries that scroll independently, drag and keyboard reordering, clipboard paste, direct image/video URL import and Open Graph or Twitter media extraction from page links — combined with search, shortcuts, a focus timer and weather, with no account and only the permissions the features actually need.',

    features: [
      'Wallpaper library split into collapsible System and Uploaded sections that scroll independently',
      'Drag to reposition a wallpaper with live preview; click to move it to the top; arrow-key reordering',
      'Import media by file upload, clipboard paste (Ctrl+V) or by fetching an image/video URL or page Open Graph media',
      'Image and video uploads stored locally in the browser, with optional deletion on reset',
      'Search suggestions render recent or cached matches instantly while fresh results load',
      'Focus timer with start, reset and edit controls alongside new-tab music controls',
      'Optional location-based weather via Open-Meteo, off by default and cached for 30 minutes',
      'Minimal Manifest V3 permissions — activeTab and clipboard read/write only',
    ],

    stack: [
      'JavaScript (ES modules)',
      'HTML5',
      'CSS3',
      'Chrome Extensions API',
      'Manifest V3',
      'Open-Meteo API',
    ],

    screenshots: [
      {
        src: 'images/projects/crystalwall-1.jpg',
        alt: 'CrystalWall new tab dashboard with live clock, date, greeting, search field, shortcut tiles and a 25-minute focus timer',
      },
      {
        src: 'images/projects/crystalwall-live.jpg',
        alt: 'The deployed CrystalWall dashboard running live on GitHub Pages, showing the clock, search, shortcut tiles and focus timer',
      },
    ],

    architecture: [
      {
        step: '01',
        title: 'New tab override',
        detail:
          'manifest.json sets chrome_url_overrides.newtab to index.html, so every new tab loads the dashboard locally.',
      },
      {
        step: '02',
        title: 'Wallpaper engine',
        detail:
          'Bundled system wallpapers plus browser-stored uploads, with drag repositioning, click-to-top and keyboard reordering rendered over a live preview.',
      },
      {
        step: '03',
        title: 'Media capture',
        detail:
          'Direct image or video URLs, a page\u2019s Open Graph/Twitter media, clipboard paste or file upload; cross-domain redirects are followed through declared host permissions.',
      },
      {
        step: '04',
        title: 'Search layer',
        detail:
          'Results come from the Chrome suggestion endpoint, with cached or recent matches painted immediately while the network request resolves.',
      },
      {
        step: '05',
        title: 'Local-first state',
        detail:
          'Uploads, preferences and a 30-minute weather cache live in the browser, so the dashboard needs no account, backend or database.',
      },
    ],

    contribution:
      'Sole developer — extension architecture and Manifest V3 configuration, wallpaper and media management, search suggestions, focus timer, music and settings interface, local storage and permission handling.',

    challenges: [
      'Supporting image and video wallpapers with no server, solved with local browser storage and an optional cleanup path when a section is reset.',
      'Following cross-domain media redirects safely, solved by declaring only the required host permissions and showing a help popup when a site blocks access or hides media behind sign-in.',
      'Making suggestions feel instantaneous, solved by rendering recent or cached matches before the fresh response arrives.',
    ],

    learnings: [
      'Packaging a Manifest V3 extension with the smallest permission set that still supports the features.',
      'Designing a wallpaper manager that is usable by mouse and keyboard, including drag and arrow-key reordering.',
      'Working within browser storage limits while keeping large media and video responsive.',
    ],

    metrics: [
      { label: 'Version', value: '1.2.1' },
      { label: 'Manifest', value: 'V3' },
      { label: 'Server required', value: 'None' },
      { label: 'Weather cache', value: '30 min' },
    ],
  },
];

export const featuredProject = projects[0];
