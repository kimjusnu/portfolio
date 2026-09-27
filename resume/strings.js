/**
 * English strings for the resume page.
 *
 * Loaded before i18n.js, which merges these into its dictionary. Korean is not
 * here for the same reason it is not in i18n.js: it already lives in the
 * markup, so there is nothing to keep in sync.
 */
window.i18nStrings = {
  en: {
    'meta.title': 'Junsu Kim — Resume',
    'meta.description':
      'Resume of Junsu Kim, a frontend developer who builds and runs a service real customers use.',

    'r.name': 'Junsu Kim',
    'r.role': 'Frontend Developer',
    'r.print': 'Download PDF',
    'r.pdfHref': 'resume-en.pdf',
    'r.pdfName': 'Junsu-Kim-Resume.pdf',
    'r.backToSite': 'Portfolio',
    'r.photoAlt': 'Photo of Junsu Kim',
    'r.awards.4': 'Excellence Award, Everyday-Flip AI App Idea Contest',
    'r.awards.5': '4th place, Fair Workplace Contest (KOCCA)',
    'r.awards.6': 'Honorable mention, Korail Retail idea contest',
    'r.awards.7': 'Honorable mention, Suncheon youth policy idea contest',

    'r.summary.title': 'Summary',
    'r.summary.body':
      'Frontend developer running My Feed, a feed-management web service used on farms. I ship fixes to permissions, notification requests, mobile screens and AI result screens, and rebuilt the company homepage in Next.js and TypeScript.',

    'r.exp.title': 'Experience',
    'r.exp.1.company': 'AimBe Lab',
    'r.exp.1.role': 'Engineer, full-time · web development and operation',
    'r.exp.1.when': '2025.07 — Present',
    'r.exp.1.a':
      '<strong>Permissions</strong> — a front-end layer (permissions.js) that shows menus by permission; closed a gap where changing the farm ID in the URL opened another farm’s page (production).',
    'r.exp.1.c':
      '<strong>Homepage rebuild</strong> (Next.js · TypeScript) — planned, designed and built it to lead customers to enquiries (server-validated, filed as Flow tasks); contributed to a deal with a feed company.',
    'r.exp.1.d': '<strong>AI result screens</strong> — piloted a 2D feed-level view (S-Ray) on web and app for two farms; built a Canvas editor to re-label failed segmentations for retraining.',
    'r.exp.1.b': '<strong>Fewer requests</strong> — notification-status requests cut from six to one per poll (production), monitoring-screen requests 98 → 50 (staging); a polling fallback where Edge 151 dropped pushes.',
    'r.exp.1.e': '<strong>Screens</strong> — no sideways scrolling on mobile (163px at 375px); per-permission table columns; list-to-detail order.',
    'r.exp.2.company': 'The Innovators',
    'r.exp.2.role': 'Intern · Frontend · Deployment automation',
    'r.exp.2.when': '2025.03 — 2025.06',
    'r.exp.2.a':
      '<strong>StartupQT</strong> — frontend and deploy automation (GitHub Actions, EC2 runner) for a quiz web service; moved to PM2 when Docker builds ran out of disk.',
    'r.exp.2.b': 'Deploys on GitHub Actions with a self-hosted EC2 runner; moved to PM2 when the Docker build ran out of disk.',

    'r.proj.title': 'Projects',
    'r.proj.0.desc': 'Open-source tool: a photo into an animated ASCII portrait SVG for READMEs. Web studio, npm CLI, GitHub Action.',
    'r.proj.1.desc': 'UI component library on npm. Team of four; I designed and built UI components. 807 weekly peak, 1,477 total (2026.08.11).',
    'r.proj.2.desc': 'Quiz authoring and review web service. Frontend and deployment automation.',
    'r.proj.3.desc': 'Diet-tracking PWA. Team of three; planning, UX, API integration, frontend, presenting.',
    'r.proj.4.desc': 'Bootcamp team project that rebuilt a Vue service in Next.js. Team lead; built the Next.js screens from Figma, responsive.',

    'r.skills.title': 'Skills',
    'r.skills.main': 'Use most',
    'r.skills.used': 'Have used',
    'r.skills.touched': 'With the team',
    'r.skills.data': 'Analytics',

    'r.edu.title': 'Education',
    'r.edu.school': 'Tech University of Korea',
    'r.edu.major': 'Computer Engineering, Software major',
    'r.edu.when': '2020.03 — 2026.02',
    'r.edu.gpa': 'GPA 3.45 / 4.5 (major 3.54)',
    'r.edu.military': 'ROK Army, sergeant, completed (2021.06 — 2022.12)',

    'r.awards.title': 'Awards · Training · Certifications',
    'r.awards.0': 'Veritas Alpha Education Article Contest, Excellence Award',
    'r.awards.1': 'Korea Engineering Exhibition, Excellence Award — Eat Fit',
    'r.train.label': 'Training',
    'r.train.list': 'Sniper Factory frontend bootcamp, Excellence Award · Woongjin × Udemy Next.js bootcamp, 2nd · 2024',
    'r.certs.label': 'Certified',
    'r.certs.list': 'ADsP (2026.06) · Google Analytics (2025.09) · OPIc English IM1 (2025.02)',
  },
};
