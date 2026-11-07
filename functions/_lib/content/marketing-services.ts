import type { RawDetails } from './types.ts'

export const marketingServices: Record<string, RawDetails> = {
  'social-media-manager': {
    overview:
      'You manage social media accounts for small and local businesses: planning content, creating posts, scheduling, responding to comments and reporting results. Business owners know they should be active online but rarely have time. A focused niche — such as restaurants, gyms or real estate agents — makes your content better and your marketing easier.',
    requirements: [
      'Understanding of Instagram, Facebook, TikTok and LinkedIn',
      'Basic content creation skills (Canva, simple video)',
      'Organization to manage several content calendars',
      'Clear communication with clients',
    ],
    tools: [
      ['Canva', 'Create posts, stories and carousels'],
      ['Meta Business Suite', 'Free scheduling for Facebook and Instagram'],
      ['Buffer or Later', 'Multi-platform scheduling'],
      ['CapCut', 'Short-form video'],
      ['Notion or Google Sheets', 'Content calendars and approvals'],
    ],
    steps: [
      ['Pick a niche', 'Choose a type of business you understand, so your content ideas are more relevant.'],
      ['Create sample content', 'Design a month of example posts for a fictional or real business in that niche.'],
      ['Define packages', 'For example: 12 posts per month on two platforms, or full management including community replies.'],
      ['Build a simple onboarding', 'Brand kit, access, goals and an approval process.'],
      ['Reach out locally', 'Find businesses with inactive or inconsistent accounts and send them a sample post made for them.'],
      ['Report monthly', 'Show reach, engagement, follower growth and what you will improve next month.'],
    ],
    firstCustomer: [
      'Look for local businesses whose last post is months old.',
      'Create three sample posts using their branding and send them.',
      'Offer your services to people you know who run businesses.',
    ],
    firstSale: [
      'Offer a one-month trial with a clear set of deliverables.',
      'Meet expectations on consistency — posting reliably is often the main win.',
      'Present results and propose a 3-month package.',
    ],
    mistakes: [
      'Promising follower numbers or viral growth.',
      'Posting without understanding the business\'s goals.',
      'No approval process, leading to off-brand content.',
      'Taking too many clients at a low price and burning out.',
    ],
    scaling: [
      'Add paid ads management or content shoots.',
      'Create templates and content systems per niche.',
      'Hire content creators and become an account manager.',
      'Raise prices as you show measurable results.',
    ],
  },

  'paid-ads-manager': {
    overview:
      'You plan, launch and optimize paid advertising campaigns on platforms like Meta (Facebook and Instagram), Google and TikTok. Businesses spend money on ads and need someone to make that spend profitable. It is a high-value skill, but it requires real learning and careful handling of other people\'s budgets.',
    requirements: [
      'Understanding of ad platforms, targeting and tracking',
      'Analytical thinking and comfort with numbers',
      'Knowledge of creative testing and landing pages',
      'Official platform training (free certifications are available)',
    ],
    tools: [
      ['Meta Ads Manager', 'Facebook and Instagram campaigns'],
      ['Google Ads', 'Search and Performance Max campaigns'],
      ['Google Analytics 4 and Tag Manager', 'Conversion tracking'],
      ['Meta Ad Library', 'Research competitors\' ads'],
      ['Looker Studio', 'Client reporting dashboards'],
    ],
    steps: [
      ['Learn the fundamentals', 'Complete Meta Blueprint and Google Skillshop courses and study campaign structures.'],
      ['Practice with a small budget', 'Run small campaigns for your own project or a friend\'s business to learn hands-on.'],
      ['Choose a niche', 'E-commerce, local services or lead generation each need different expertise.'],
      ['Build a case study', 'Document one campaign\'s setup, tests and results clearly.'],
      ['Offer ad account audits', 'Audit a business\'s current ads and show specific improvements.'],
      ['Manage and report', 'Set clear KPIs, test creatives continuously and report weekly or monthly.'],
    ],
    firstCustomer: [
      'Offer free audits to businesses already running ads (check the Meta Ad Library).',
      'Partner with web designers and agencies that need ads support.',
      'Help a local business run its first campaign at a discount for a case study.',
    ],
    firstSale: [
      'Present an audit with specific problems and a plan.',
      'Propose a monthly management fee with a 3-month minimum to allow testing.',
      'Set realistic expectations — you cannot guarantee specific results.',
    ],
    mistakes: [
      'Launching without proper conversion tracking.',
      'Changing campaigns too often before they gather data.',
      'Ignoring creative quality, which drives most results.',
      'Guaranteeing returns on ad spend.',
    ],
    scaling: [
      'Specialize in one niche to become the go-to expert.',
      'Add creative production services.',
      'Hire junior media buyers and manage strategy.',
      'Offer performance-based pricing once you have a track record.',
    ],
  },

  'seo-consultant': {
    overview:
      'You help businesses get more traffic from search engines by improving their website structure, content and authority. Services include technical audits, keyword research, content strategy and on-page optimization. SEO results take months, so clients value consultants who communicate clearly and report honestly.',
    requirements: [
      'Understanding of how search engines rank pages',
      'Keyword research and content planning skills',
      'Basic technical knowledge (site structure, speed, indexing)',
      'Clear reporting and patience with long timelines',
    ],
    tools: [
      ['Google Search Console', 'Indexing and performance data'],
      ['Screaming Frog (free version)', 'Technical site crawls'],
      ['Ahrefs or Semrush', 'Keyword and competitor research (paid, trials available)'],
      ['Google Analytics 4', 'Traffic and conversion tracking'],
    ],
    steps: [
      ['Learn and practice', 'Study reputable SEO guides and grow a small site of your own to learn by doing.'],
      ['Pick a niche', 'Local businesses, e-commerce or SaaS each have different SEO needs.'],
      ['Create an audit template', 'Cover technical issues, on-page factors, content gaps and quick wins.'],
      ['Offer audits as an entry product', 'A fixed-price audit is an easy first purchase.'],
      ['Turn audits into retainers', 'Implement improvements and content monthly.'],
      ['Report transparently', 'Monthly reports with rankings, traffic and what you did.'],
    ],
    firstCustomer: [
      'Run a mini-audit for a business and send three high-impact fixes.',
      'Partner with web developers who do not offer SEO.',
      'Share SEO tips for your niche on LinkedIn.',
    ],
    firstSale: [
      'Sell a fixed-price audit with a clear deliverable.',
      'Present quick wins first to demonstrate value.',
      'Propose a 6-month retainer with realistic expectations.',
    ],
    mistakes: [
      'Promising first-page rankings or fast results.',
      'Using spammy link building that risks penalties.',
      'Ignoring content quality and user intent.',
      'Reporting vanity metrics instead of business outcomes.',
    ],
    scaling: [
      'Add content writing services.',
      'Specialize in a niche such as local SEO for dentists.',
      'Build a small team of writers and technical specialists.',
      'Create SEO training for in-house teams.',
    ],
  },

  'local-seo': {
    overview:
      'You help local businesses — restaurants, salons, plumbers, dentists — appear in Google Maps and local search results by optimizing their Google Business Profile. Tasks include correcting categories and hours, adding photos, writing descriptions, posting updates and setting up a review request process. It is simple to learn and easy for business owners to understand.',
    requirements: [
      'Basic understanding of Google Business Profile',
      'Comfort reaching out to local businesses',
      'Organization to manage recurring updates',
      'A simple before/after example',
    ],
    tools: [
      ['Google Business Profile', 'The platform you optimize'],
      ['Canva', 'Create post graphics'],
      ['BrightLocal or Local Falcon (trials)', 'Check local rankings'],
      ['Google Sheets', 'Track clients and monthly tasks'],
    ],
    steps: [
      ['Learn the ranking factors', 'Study Google\'s guidelines on relevance, distance and prominence.'],
      ['Optimize a profile for practice', 'Help a friend or family business improve its profile and track the results.'],
      ['Create an optimization checklist', 'Categories, services, photos, description, Q&A, posts and reviews.'],
      ['Find businesses with weak profiles', 'Search Google Maps for profiles with few photos, missing info or no recent posts.'],
      ['Offer a one-time optimization', 'A fixed fee for fixing the profile is an easy yes.'],
      ['Add a monthly plan', 'Weekly posts, photo updates and review management.'],
    ],
    firstCustomer: [
      'Walk into or call local businesses with a printed or emailed list of profile issues.',
      'Start with businesses you are already a customer of.',
      'Ask for referrals from every happy client — local owners know each other.',
    ],
    firstSale: [
      'Show screenshots of their profile next to a competitor\'s stronger one.',
      'Offer a low, fixed price for the initial optimization.',
      'Propose the monthly plan after showing early results.',
    ],
    mistakes: [
      'Creating fake reviews or keyword-stuffing business names — both violate Google\'s policies.',
      'Promising specific rankings.',
      'Neglecting the profile after the first optimization.',
      'Ignoring the business\'s website, which also affects local rankings.',
    ],
    scaling: [
      'Add website and local SEO services.',
      'Specialize in one industry across many cities.',
      'Hire a VA for weekly posts.',
      'Offer review management software setup.',
    ],
  },

  'email-marketing': {
    overview:
      'You build and manage email marketing for online stores and digital businesses: welcome sequences, abandoned-cart flows, post-purchase emails and weekly campaigns. Email performance is easy to measure, so specialists who can show revenue impact are highly valued, especially by e-commerce brands.',
    requirements: [
      'Persuasive writing skills',
      'Understanding of email platforms and automation',
      'Basic design sense for email layouts',
      'Comfort with metrics: open rates, click rates and revenue',
    ],
    tools: [
      ['Klaviyo', 'Leading e-commerce email platform (free tier)'],
      ['Mailchimp or Kit', 'Email for creators and small businesses'],
      ['Figma or Canva', 'Email design'],
      ['Really Good Emails', 'Inspiration library'],
    ],
    steps: [
      ['Learn the core flows', 'Welcome, abandoned cart, browse abandonment, post-purchase and win-back.'],
      ['Create sample emails', 'Design and write a full welcome flow for a fictional or real brand.'],
      ['Choose a niche', 'Such as beauty, fashion, supplements or digital creators.'],
      ['Offer a flow audit', 'Review a brand\'s current emails and show what is missing.'],
      ['Build flows for clients', 'Start with the flows that drive the most revenue.'],
      ['Move to campaigns', 'Manage weekly campaigns on retainer once flows are live.'],
    ],
    firstCustomer: [
      'Sign up for e-commerce brands\' newsletters and note which ones lack key flows.',
      'Send a short teardown of their emails with specific improvements.',
      'Partner with Shopify developers and agencies.',
    ],
    firstSale: [
      'Start with a fixed-price flow setup project.',
      'Report results after 30 days.',
      'Propose a monthly campaign retainer.',
    ],
    mistakes: [
      'Sending to purchased lists or without consent — it violates laws and harms deliverability.',
      'Too many discounts, which trains customers to wait for sales.',
      'Ignoring mobile design.',
      'Not segmenting audiences.',
    ],
    scaling: [
      'Add SMS marketing.',
      'Offer performance-based pricing on email-attributed revenue.',
      'Hire designers and copywriters.',
      'Specialize to become known in one niche.',
    ],
  },

  'pinterest-manager': {
    overview:
      'You manage Pinterest marketing for bloggers, online shops and creators: designing pins, writing keyword-rich titles and descriptions, organizing boards and scheduling content. Pinterest acts like a visual search engine, so good pins can drive traffic for months. It is beginner-friendly and works well as a retainer service.',
    requirements: [
      'Basic design skills in Canva',
      'Understanding of Pinterest SEO and keywords',
      'Consistency and organization',
      'A Pinterest business account to practice with',
    ],
    tools: [
      ['Pinterest Business', 'Analytics and the platform itself'],
      ['Canva', 'Pin design'],
      ['Tailwind', 'Pin scheduling'],
      ['Pinterest Trends', 'Keyword and trend research'],
    ],
    steps: [
      ['Learn Pinterest SEO', 'Understand keywords, boards, fresh pins and how Pinterest distributes content.'],
      ['Grow your own account', 'Practice by pinning consistently for a niche to show results.'],
      ['Create pin templates', 'Design reusable templates for different client types.'],
      ['Define a package', 'For example: account setup + 60 pins per month + monthly report.'],
      ['Find clients', 'Bloggers, Etsy sellers and e-commerce brands with weak or inactive Pinterest accounts.'],
      ['Report traffic', 'Show outbound clicks and website traffic from Pinterest.'],
    ],
    firstCustomer: [
      'Contact bloggers in visual niches like food, home decor, travel and DIY.',
      'Offer a free audit of their Pinterest profile.',
      'Join blogger communities where people ask for Pinterest help.',
    ],
    firstSale: [
      'Offer a starter package with setup and a month of pins.',
      'Show your own account\'s growth as proof.',
      'Set expectations: Pinterest results build over a few months.',
    ],
    mistakes: [
      'Designing pins that are not readable on mobile.',
      'Ignoring keywords in titles and descriptions.',
      'Pinning inconsistently.',
      'Promising immediate traffic.',
    ],
    scaling: [
      'Add blog SEO or email marketing.',
      'Specialize in one niche.',
      'Hire pin designers.',
      'Sell Pinterest templates or courses.',
    ],
  },

  'virtual-assistant': {
    overview:
      'You support busy entrepreneurs, executives and small teams with administrative tasks: managing inboxes and calendars, booking travel, research, data entry, customer support and document preparation. Clients pay for reliability, discretion and initiative. Over time, many VAs specialize — for example in podcast, e-commerce or real estate support — to earn more.',
    requirements: [
      'Strong organization and reliability',
      'Good written communication',
      'Familiarity with Google Workspace or Microsoft 365',
      'A professional way to receive payments',
    ],
    tools: [
      ['Google Workspace', 'Email, calendar and documents'],
      ['Asana, Trello or ClickUp', 'Task management'],
      ['LastPass or 1Password', 'Securely share client logins'],
      ['Toggl', 'Track time for billing'],
      ['Calendly', 'Scheduling'],
    ],
    steps: [
      ['List your services', 'Write down specific tasks you can confidently handle today.'],
      ['Pick a client type', 'For example coaches, real estate agents or e-commerce owners.'],
      ['Create a one-page service sheet', 'Services, hours, pricing and how to get started.'],
      ['Set up professional systems', 'A dedicated email, password manager and time tracker.'],
      ['Find clients', 'Use your network, LinkedIn and platforms like Upwork or OnlineJobs.'],
      ['Deliver beyond the task', 'Suggest small improvements to processes — it makes you indispensable.'],
    ],
    firstCustomer: [
      'Post on LinkedIn and Facebook that you are offering VA services, with specific examples.',
      'Ask small business owners you know what tasks they wish they could hand off.',
      'Join VA directories and entrepreneur communities.',
    ],
    firstSale: [
      'Offer a small monthly hours package to start.',
      'Begin with a trial week focused on one clear task.',
      'Ask for a testimonial after the first month.',
    ],
    mistakes: [
      'Saying yes to tasks you are not qualified for.',
      'Not tracking time and underbilling.',
      'Poor security habits with client data.',
      'Staying a generalist forever at low rates.',
    ],
    scaling: [
      'Specialize in a high-value niche.',
      'Move from hourly to monthly retainers.',
      'Build a small VA agency.',
      'Offer operations management for growing businesses.',
    ],
  },

  bookkeeping: {
    overview:
      'You maintain financial records for small businesses: categorizing transactions, reconciling accounts, managing invoices and preparing monthly reports. Bookkeeping is steady recurring work. Training and a recognized certificate build trust, and knowing the rules where your clients operate is essential. Leave tax advice and filings to qualified professionals unless you are licensed.',
    requirements: [
      'Strong attention to detail and organization',
      'Training in bookkeeping fundamentals (online certificates are available)',
      'Proficiency with QuickBooks Online or Xero',
      'Professional discretion with financial data',
    ],
    tools: [
      ['QuickBooks Online or Xero', 'Accounting software (free ProAdvisor/partner programs)'],
      ['Dext or Hubdoc', 'Receipt capture'],
      ['Google Drive', 'Document organization'],
      ['Calendly', 'Client calls'],
    ],
    steps: [
      ['Get trained', 'Complete a bookkeeping certificate and the free QuickBooks or Xero certifications.'],
      ['Choose a niche', 'For example freelancers, e-commerce, restaurants or contractors.'],
      ['Define packages', 'Price monthly by number of transactions and accounts.'],
      ['Create onboarding', 'Access, document collection and a cleanup assessment.'],
      ['Find clients', 'Network with local business groups, accountants and freelancers.'],
      ['Deliver monthly reports', 'Clear profit-and-loss summaries with notes clients understand.'],
    ],
    firstCustomer: [
      'Partner with accountants who need bookkeepers for their clients.',
      'Offer catch-up bookkeeping for businesses behind on their books.',
      'Join local business networking groups.',
    ],
    firstSale: [
      'Offer a free review of their current books.',
      'Present a fixed monthly price.',
      'Start with a catch-up project, then move to monthly service.',
    ],
    mistakes: [
      'Giving tax advice without qualifications.',
      'Mixing personal and client data or using insecure tools.',
      'Underpricing messy accounts.',
      'Not documenting the work you do.',
    ],
    scaling: [
      'Specialize in a niche to standardize work.',
      'Add payroll and invoicing services.',
      'Hire junior bookkeepers.',
      'Partner with accounting firms.',
    ],
  },

  'community-manager': {
    overview:
      'You run online communities for creators, startups, course businesses and brands on platforms like Discord, Slack, Circle or Skool. Your job is to welcome members, spark discussions, moderate, run events and keep the community valuable and active. Communities are increasingly important to businesses, and few people are good at running them.',
    requirements: [
      'Excellent communication and empathy',
      'Familiarity with Discord, Slack or community platforms',
      'Organization to plan events and content',
      'Good judgment for moderation',
    ],
    tools: [
      ['Discord', 'Popular community platform'],
      ['Circle or Skool', 'Communities for creators and courses'],
      ['Notion', 'Community playbooks and calendars'],
      ['Canva', 'Event graphics and announcements'],
    ],
    steps: [
      ['Join and study great communities', 'Note how they onboard, engage and moderate.'],
      ['Volunteer as a moderator', 'Moderating an existing community builds real experience.'],
      ['Create a community playbook', 'Onboarding, weekly rituals, events, moderation rules and metrics.'],
      ['Pick a client type', 'Course creators, crypto/tech projects, brands or SaaS companies.'],
      ['Pitch with an engagement plan', 'Show a 30-day plan to revive or grow their community.'],
      ['Report engagement', 'Active members, messages, event attendance and retention.'],
    ],
    firstCustomer: [
      'Look for creators with quiet communities and offer to help.',
      'Use your moderator experience as proof.',
      'Network in creator economy groups.',
    ],
    firstSale: [
      'Propose a one-month engagement sprint.',
      'Show early results and move to a monthly retainer.',
      'Define your availability and responsibilities clearly.',
    ],
    mistakes: [
      'Being available 24/7 without boundaries.',
      'Inconsistent moderation.',
      'Measuring member counts instead of engagement.',
      'No clear rules for members.',
    ],
    scaling: [
      'Manage multiple communities.',
      'Add community strategy consulting.',
      'Train and manage moderators.',
      'Launch your own paid community.',
    ],
  },

  'lead-generation': {
    overview:
      'As an appointment setter you help agencies, coaches and B2B companies book sales calls by contacting prospects through email, LinkedIn or Instagram DMs and qualifying them. You are paid per booked appointment, on a base plus commission or on retainer. It suits people who are persuasive, resilient and organized.',
    requirements: [
      'Strong written and verbal communication',
      'Resilience — most outreach will get no reply',
      'Organization to track conversations and follow-ups',
      'Understanding of your client\'s offer and ideal customer',
    ],
    tools: [
      ['LinkedIn (Sales Navigator optional)', 'Prospecting'],
      ['HubSpot CRM (free)', 'Track leads and conversations'],
      ['Calendly', 'Booking calls'],
      ['Apollo.io', 'Find contact information (free tier)'],
    ],
    steps: [
      ['Learn outreach fundamentals', 'Personalization, short messages, follow-ups and qualification questions.'],
      ['Practice scripts', 'Write and refine messages and practice handling common objections.'],
      ['Choose a client type', 'Agencies and coaches with high-ticket offers often hire setters.'],
      ['Agree on terms', 'Define what a qualified appointment is and how you are paid.'],
      ['Run consistent outreach', 'Daily volume with personalization; track replies and bookings.'],
      ['Report weekly', 'Share outreach volume, replies, booked calls and show-up rates.'],
    ],
    firstCustomer: [
      'Find agency owners on LinkedIn who post about growth and offer your help.',
      'Offer a short trial paid only per booked appointment.',
      'Look for "appointment setter" roles in sales communities.',
    ],
    firstSale: [
      'Prove yourself with a handful of booked calls.',
      'Negotiate a base plus commission once you show results.',
      'Get your terms in writing.',
    ],
    mistakes: [
      'Spamming generic messages, which damages your client\'s reputation.',
      'Ignoring email and privacy laws (such as CAN-SPAM and GDPR).',
      'Booking unqualified calls just to hit numbers.',
      'Working without a written agreement.',
    ],
    scaling: [
      'Move into closing for higher commissions.',
      'Build a small appointment-setting team.',
      'Offer outbound strategy consulting.',
      'Specialize in one industry.',
    ],
  },

  'remote-sales-closer': {
    overview:
      'A remote closer takes booked sales calls for coaches, agencies, course creators and B2B companies and helps prospects make a buying decision. Pay is typically commission-based on closed deals. The role rewards excellent listening, honest consultation and handling objections — not pressure tactics.',
    requirements: [
      'Strong communication and listening skills',
      'Sales training (books, courses or prior experience)',
      'Professional video-call setup',
      'A reliable schedule to take calls',
    ],
    tools: [
      ['Zoom or Google Meet', 'Sales calls'],
      ['HubSpot or the client\'s CRM', 'Tracking pipeline'],
      ['Gong or call recordings', 'Reviewing and improving calls'],
      ['Notion', 'Objection notes and call frameworks'],
    ],
    steps: [
      ['Learn a consultative sales framework', 'Study discovery, qualification, presenting value and objection handling.'],
      ['Practice role-plays', 'Record mock calls with friends and review them.'],
      ['Choose offers you believe in', 'Only sell products that genuinely help customers.'],
      ['Find clients', 'Look for coaches and agencies hiring commission-based closers.'],
      ['Learn the offer deeply', 'Study the product, ideal customer and previous sales calls.'],
      ['Review every call', 'Track close rates and improve weekly.'],
    ],
    firstCustomer: [
      'Search for "remote closer" roles on LinkedIn and in sales communities.',
      'Reach out to coaches with high-ticket offers who handle their own calls.',
      'Start as an appointment setter to get your foot in the door.',
    ],
    firstSale: [
      'Ask for call recordings from the client\'s previous sales.',
      'Focus on understanding the prospect\'s problem before presenting.',
      'Follow up promptly and professionally.',
    ],
    mistakes: [
      'Pressure tactics and false urgency.',
      'Selling offers that over-promise results.',
      'Working without a clear commission agreement.',
      'Not reviewing calls to improve.',
    ],
    scaling: [
      'Negotiate higher commissions as you prove results.',
      'Work with multiple compatible clients.',
      'Lead or train a sales team.',
      'Move into sales consulting.',
    ],
  },

  'research-assistant': {
    overview:
      'You provide research services for founders, consultants, content creators and marketing teams: competitor analysis, market overviews, lead lists, fact-checking and summarizing information. If you enjoy digging for answers and presenting them clearly, this is accessible work with steady demand.',
    requirements: [
      'Strong research and critical thinking skills',
      'Clear summarizing and writing',
      'Organization to structure findings',
      'Familiarity with spreadsheets and documents',
    ],
    tools: [
      ['Google Sheets and Docs', 'Organizing and presenting research'],
      ['Notion', 'Research databases'],
      ['Google Scholar', 'Academic sources'],
      ['Similarweb (free)', 'Website traffic estimates for competitor research'],
    ],
    steps: [
      ['Choose research types', 'For example competitor analysis, lead lists or content research.'],
      ['Create sample reports', 'Produce two short reports on public companies or markets.'],
      ['Build templates', 'Standard formats for each research type speed up delivery.'],
      ['Price by project', 'Clear deliverables and turnaround times.'],
      ['Find clients', 'Founders, consultants, agencies and content teams.'],
      ['Deliver insights, not just data', 'Summarize key findings and recommendations.'],
    ],
    firstCustomer: [
      'Offer a free mini-report to a startup founder or consultant.',
      'List your services on Upwork and similar platforms.',
      'Share research summaries on LinkedIn.',
    ],
    firstSale: [
      'Start with a clearly defined report.',
      'Deliver early and include sources.',
      'Propose a recurring monthly research package.',
    ],
    mistakes: [
      'Delivering raw data without analysis.',
      'Using unreliable or unverified sources.',
      'Unclear scope leading to endless research.',
      'Ignoring confidentiality.',
    ],
    scaling: [
      'Specialize in an industry.',
      'Offer recurring market updates.',
      'Hire research assistants.',
      'Sell research reports as digital products.',
    ],
  },

  captioning: {
    overview:
      'You create accurate transcripts and subtitles for videos, podcasts, interviews and online courses. Automatic transcription has made the first draft easy, but creators and businesses still need humans to correct errors, format captions and ensure accessibility. It is flexible, beginner-friendly work that requires focus and attention to detail.',
    requirements: [
      'Strong listening skills and attention to detail',
      'Good spelling and grammar',
      'Fast, accurate typing',
      'Headphones and a quiet environment',
    ],
    tools: [
      ['Descript or oTranscribe', 'Transcription editing'],
      ['Subtitle Edit or Aegisub', 'Free subtitle editing tools'],
      ['YouTube Studio', 'Uploading and syncing captions'],
      ['Rev or similar platforms', 'Platform-based transcription work'],
    ],
    steps: [
      ['Practice transcription', 'Transcribe public videos and compare accuracy.'],
      ['Learn caption formats', 'SRT and VTT formatting, timing and line length.'],
      ['Join platforms', 'Apply to transcription platforms to gain experience.'],
      ['Find direct clients', 'Creators, podcasters and course creators pay more than platforms.'],
      ['Offer packages', 'For example: captions for all weekly YouTube videos.'],
      ['Add translation', 'Subtitles in other languages are valuable if you are bilingual.'],
    ],
    firstCustomer: [
      'Contact YouTubers whose videos have no captions or poor auto-captions.',
      'Offer free captions on one video to show quality.',
      'Join transcription platforms while building direct clients.',
    ],
    firstSale: [
      'Price per minute of audio.',
      'Deliver fast and accurately.',
      'Propose a monthly package for regular uploads.',
    ],
    mistakes: [
      'Delivering uncorrected automatic transcripts.',
      'Ignoring caption timing and readability.',
      'Underestimating time for poor audio.',
      'Missing deadlines.',
    ],
    scaling: [
      'Add translated subtitles.',
      'Offer captioning for courses and businesses.',
      'Build a small team.',
      'Specialize in legal, medical or academic transcription (with training).',
    ],
  },

  'usability-tester': {
    overview:
      'Testing platforms pay people to use websites and apps while thinking out loud, completing tasks and answering questions. Companies use the feedback to improve their products. There is nothing to sell — but income is limited and depends on test availability. It is best viewed as an accessible first step into online work.',
    requirements: [
      'A computer with a microphone, and a smartphone',
      'Clear spoken English (or other test languages)',
      'Ability to describe your thoughts honestly and clearly',
      'Patience with screening questions',
    ],
    tools: [
      ['UserTesting', 'One of the largest testing platforms'],
      ['Userlytics, Trymata and dscout', 'Additional testing platforms'],
      ['A quiet space and headset', 'Good audio quality'],
      ['PayPal', 'Receiving payments'],
    ],
    steps: [
      ['Sign up for several platforms', 'More platforms mean more test opportunities.'],
      ['Complete practice tests', 'Most platforms require a sample test to qualify.'],
      ['Fill out your profile honestly', 'Demographics determine which tests you qualify for.'],
      ['Check for tests regularly', 'Tests go quickly; enable notifications.'],
      ['Give thoughtful feedback', 'Clear, specific feedback leads to higher ratings and more tests.'],
      ['Track earnings', 'See which platforms are worth your time.'],
    ],
    firstCustomer: [
      'Your first "customer" is the platform — pass the qualification test.',
      'Apply to multiple platforms to increase opportunities.',
      'Accept longer studies and interviews, which pay more.',
    ],
    firstSale: [
      'Complete tests promptly and follow instructions carefully.',
      'Maintain high ratings to unlock more tests.',
      'Stay honest — inaccurate screener answers can get you banned.',
    ],
    mistakes: [
      'Lying in screener questions.',
      'Mumbling or giving vague feedback.',
      'Relying on testing as full-time income.',
      'Signing up for sites that ask you to pay to join.',
    ],
    scaling: [
      'Learn UX research and move into UX research assistance.',
      'Offer website feedback and audits directly to businesses.',
      'Combine with other online work for a steady income mix.',
      'Use testing insights to build skills in product design.',
    ],
  },
}
