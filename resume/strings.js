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
    'r.photoAlt': 'Photograph of Junsu Kim',

    'r.summary.title': 'Summary',
    'r.summary.body':
      'Frontend developer running web development and operation for My Feed, a feed-management service used on farms. I turn customer enquiries into screen fixes, and cut the monitoring screen from 98 requests to 50 after finding the bottleneck with timing logs.',

    'r.exp.title': 'Experience',
    'r.exp.1.company': 'AimBe Lab',
    'r.exp.1.role': 'Engineer, full-time · web development and operation',
    'r.exp.1.when': '2025.07 — Present',
    'r.exp.1.a':
      '<strong>My Feed</strong> — monitoring screens, admin and web notifications; requests cut from 98 to 50 (staging), and each notification poll from six requests to one.',
    'r.exp.1.c':
      '<strong>Homepage rebuild</strong> — rebuilt for customers, with online enquiries routed to the sales team; contributed to a deal with a feed company.',
    'r.exp.1.d': 'Built a mask-labelling tool for failed segmentations; proposed SAM2, which the AI engineer applied.',
    'r.exp.2.company': 'The Innovators',
    'r.exp.2.role': 'Intern · Frontend · Deployment automation',
    'r.exp.2.when': '2025.03 — 2025.06',
    'r.exp.2.a':
      '<strong>StartupQT</strong> — frontend for a quiz authoring and review SaaS.',
    'r.exp.2.b': 'Deploys on GitHub Actions with a self-hosted EC2 runner; moved to PM2 when the Docker build ran out of disk.',

    'r.proj.title': 'Projects',
    'r.proj.1.desc': 'UI component library on npm. Team of four; my part was the components. 807 weekly peak, 1,477 total (2026.08.11).',
    'r.proj.2.desc': 'Quiz authoring and review SaaS. Frontend and deployment automation.',
    'r.proj.3.desc': 'Diet-tracking PWA. Team of three; planning, UX, API design, frontend, presenting.',
    'r.proj.4.desc': 'Moved a Vue service with poor search visibility to Next.js. Team lead.',

    'r.skills.title': 'Skills',
    'r.skills.main': 'Use most',
    'r.skills.used': 'Have used',
    'r.skills.touched': 'Worked alongside',
    'r.skills.data': 'Analytics',

    'r.edu.title': 'Education',
    'r.edu.school': 'Tech University of Korea',
    'r.edu.major': 'B.S. Computer Engineering, Software major',
    'r.edu.when': '2020.03 — 2026.02',
    'r.edu.gpa': 'GPA 3.45 / 4.5 (major 3.54)',
    'r.edu.military': 'ROK Army, sergeant, completed (2021.06 — 2022.12)',

    'r.awards.title': 'Awards · Certifications',
    'r.awards.0': 'Veritas Alpha Education Article Contest, Excellence Award',
    'r.awards.1': 'Korea Engineering Exhibition, Excellence Award — Eat Fit',
    'r.awards.2': 'Sniper Factory Bootcamp, Excellence Award — Wairi',
    'r.awards.3': 'Woongjin × Udemy Bootcamp, 2nd — Componique',
    'r.certs.label': 'Certified',
    'r.certs.list': 'ADsP (2026.06) · Google Analytics (2025.09) · OPIc English IM1 (2025.02)',
  },
};
