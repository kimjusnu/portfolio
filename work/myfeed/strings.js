/**
 * English strings for the My Feed case. Loaded before i18n.js, which merges
 * them into its dictionary. Korean lives in the markup.
 */
window.i18nStrings = {
  en: {
    'meta.title': 'My Feed | Junsu Kim · Frontend Developer',
    'meta.description':
      'Screen fixes, request cuts, notifications and AI result screens on My Feed, a feed-management web service used by some 130 farms.',

    'mf.crumb': 'My Feed',
    'mf.label': 'AimBe Lab · My Feed',
    'mf.title': 'Farm screens,<br>lighter and easier to read.',
    'mf.sub':
      'My Feed is a feed-management web service used by some 130 farms as of July 2026. I handle its web development and operation, building and fixing the farm monitoring screens, the admin and the web notifications.',
    'mf.role': 'Web development and operation · monitoring screens · admin · web notifications',
    'mf.gallery': 'My Feed screens',
    'mf.tab1': 'Farm monitoring',
    'mf.tab2': 'Dashboard',
    'mf.tab3': 'Ordering',
    'mf.tab4': 'Notifications',
    'mf.cap1': "Each bin's latest interior photo, remaining feed, temperature and humidity",
    'mf.cap2': 'The share of bins needing an order, and the bin location map',
    'mf.cap3': 'Ordering: pick a bin, a quantity and a delivery date',
    'mf.cap4': 'The notification list with unread alerts and filters by type',
    'mf.me.h': 'Junsu Kim · web development and operation',
    'mf.me.p':
      'Monitoring screens, admin and web notifications; fewer requests and smaller responses; consolidated shared UI; language packs; the mask-labelling tool.',
    'mf.others.h': 'Who I worked with',
    'mf.others.p':
      'I worked out requirements and screens with the app developer. The AI engineer applied the SAM2 model.',
    'mf.ui.label': 'Screen fixes',
    'mf.ui.title': 'Start from the enquiry,<br>finish on the screen.',
    'mf.ui.1.h': 'Menus that are easy to find',
    'mf.ui.1.p':
      'Customer enquiries showed people struggled to find menus, so I reworked the paths to the main tasks and made the screens easier to read.',
    'mf.ui.2.h': 'Shared UI fixed in one place',
    'mf.ui.2.p': 'Consolidated shared UI that had been copied across pages, so it can be changed in one place.',
    'mf.ui.3.h': 'Text as per-language keys',
    'mf.ui.3.p':
      'Moved screen text to per-language key–value packs, replacing a flow that waited on a translation API.',
    'mf.perf.label': 'Fewer requests',
    'mf.perf.title': 'Find the slow stage first,<br>then cut.',
    'mf.perf.sub': 'I added per-stage timing logs to pin down the bottleneck before fixing it.',
    'mf.nt.label': 'Notifications',
    'mf.nt.title': 'Two polls,<br>opposite policies.',
    'mf.nt.a.label': 'Unread count',
    'mf.nt.a.h': 'Pauses when nobody is looking',
    'mf.nt.a.p': 'Cut each poll from six requests to one, and stopped it in hidden tabs.',
    'mf.nt.b.label': 'Covering dropped push notifications',
    'mf.nt.b.h': 'Keeps running in hidden tabs',
    'mf.nt.b.p':
      'I narrowed down notifications not showing on one browser by comparing it with others, and left this check running.',
    'mf.nt.cap1': 'Notification settings',
    'mf.nt.cap2': 'Per-bin notification settings',
    'mf.ai.label': 'AI result screens',
    'mf.ai.title': 'What the AI produces,<br>made judgeable by people.',
    'mf.ai.1.h': 'A supporting view',
    'mf.ai.1.p':
      'Customers found the remaining-feed number alone hard to judge, so I built a supporting view of the bin interior and gathered feedback from a few farms.',
    'mf.ai.2.h': 'Mask-labelling tool',
    'mf.ai.2.p':
      'Built a mask-labelling tool so images the segmentation model failed on could be reused, and supplied the data.',
    'mf.ai.3.h': 'Proposing SAM2',
    'mf.ai.3.p': 'Researched and proposed switching to SAM2. The AI engineer applied the model.',
    'mf.limit.h': 'About the numbers and scope',
    'mf.limit.1':
      'The request, size and check counts are values confirmed in the change commits, not a measure of perceived speed across every user environment.',
    'mf.limit.2':
      'The supporting view is at a pilot stage on a few farms. It does not make the remaining-feed estimate more accurate.',
    'mf.limit.3': 'It is an internal service, so there is no public link.',
    'mf.next.title': 'Next: the company homepage rebuild',
    'mf.next.sub': 'Turning a company-profile site into a service-first landing page.',
  },
};
