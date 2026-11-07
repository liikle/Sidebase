import type { RawDetails } from './types.ts'

export const creative: Record<string, RawDetails> = {
  'freelance-video-editor': {
    overview:
      'You edit raw footage into finished videos for YouTubers, coaches, agencies and small brands. Clients send you files through Google Drive or Frame.io; you return a polished video with cuts, pacing, music, captions and color. The best editors specialize — for example in talking-head YouTube videos or short ad creatives — because specialists are easier to find, easier to trust and can charge more.',
    requirements: [
      'A computer that can handle 1080p editing (16 GB RAM recommended)',
      'Working knowledge of one editing program, or 3–4 weeks to learn one',
      'A portfolio of 3–5 sample edits (you can create these from free stock footage)',
      'A reliable way to receive and deliver large files',
    ],
    tools: [
      ['DaVinci Resolve', 'Free, professional-grade editing and color software'],
      ['CapCut Desktop', 'Fast editing with auto-captions for short-form work'],
      ['Frame.io or Google Drive', 'Share drafts and collect timestamped feedback'],
      ['Epidemic Sound or YouTube Audio Library', 'Licensed music and sound effects'],
      ['Notion or Trello', 'Track client projects and deadlines'],
    ],
    steps: [
      ['Pick a niche', 'Choose one type of video to start with: YouTube talking-head videos, podcasts, real-estate tours or social ads. A clear niche makes your portfolio and outreach far more convincing.'],
      ['Build three portfolio pieces', 'Download free footage from Pexels or re-edit a public interview (for portfolio use only). Show a before/after so prospects can see the value you add.'],
      ['Set simple starter pricing', 'Offer one clear package, for example "one 10-minute YouTube video edited in 72 hours". Price modestly for your first 3 clients in exchange for testimonials.'],
      ['Create a one-page portfolio', 'Use a free Notion page, Framer site or Google Drive folder with your best work, your package and a contact link.'],
      ['Start outreach daily', 'Send 10 personalized messages a day to creators in your niche who post regularly but have weak editing. Mention one specific improvement you would make.'],
      ['Systemize delivery', 'Create a project template, an intake form and a revision policy (for example, two rounds included) before you get busy.'],
    ],
    firstCustomer: [
      'Find YouTubers with 1,000–50,000 subscribers who upload consistently — they have budget but usually no editor yet.',
      'Offer to edit one short section of a recent video for free so they can see your style with their own footage.',
      'Check job boards such as YouTube Jobs (ytjobs.co), Upwork and creator Discord communities daily.',
    ],
    firstSale: [
      'Send a short Loom video walking through the edit you made for them and explaining your choices.',
      'Make the next step simple: one fixed price, one delivery date and a payment link (Stripe, PayPal or Wise).',
      'Ask for 50% upfront for new clients to protect yourself, and deliver on time to earn the retainer.',
    ],
    mistakes: [
      'Trying to serve every niche at once, which makes your portfolio look unfocused.',
      'Unlimited revisions — always define what is included.',
      'Underpricing for too long; raise your rate after every three happy clients.',
      'Ignoring audio quality — viewers forgive average visuals but not bad sound.',
    ],
    scaling: [
      'Move clients from per-video pricing to monthly retainers for predictable income.',
      'Create reusable templates, presets and caption styles to cut editing time.',
      'Hire a junior editor for rough cuts while you handle final polish and clients.',
      'Productize into packages such as "4 YouTube videos + 12 shorts per month".',
    ],
  },

  'clip-editor': {
    overview:
      'You take long-form content — podcasts, livestreams, webinars, YouTube videos — and turn the best moments into vertical clips for TikTok, Instagram Reels and YouTube Shorts. Each clip gets a strong hook, captions and clean framing. Creators value this because clips are the main way new viewers discover long-form shows, yet producing them is repetitive work they would rather outsource.',
    requirements: [
      'A computer or a capable phone for editing',
      'An eye for strong moments: surprising statements, stories and clear advice',
      'Basic familiarity with TikTok, Reels and Shorts formats',
      'Three sample clips made from public long-form content (for portfolio only)',
    ],
    tools: [
      ['CapCut', 'Free editor with automatic captions and vertical templates'],
      ['DaVinci Resolve', 'More control for reframing and audio cleanup'],
      ['Descript', 'Edit video by editing the transcript — great for finding moments fast'],
      ['Google Drive', 'Receive source files and deliver finished clips'],
    ],
    steps: [
      ['Study what works', 'Watch 50 high-performing clips in your target niche and note the hook in the first two seconds, caption style and length.'],
      ['Make three sample clips', 'Pick a public podcast episode and create three clips with different hook styles. Post them to a portfolio account to show results.'],
      ['Define a simple package', 'For example: "10 clips per episode, captions included, delivered in 48 hours". Packages are easier to sell than hourly work.'],
      ['Build a clip workflow', 'Transcript → mark moments → cut → reframe to 9:16 → captions → hook text → export. Keep a checklist so quality stays consistent.'],
      ['Reach out to podcasters', 'Find shows that publish weekly but post few or weak clips. Send them one finished clip from their own episode.'],
      ['Report results', 'Each month, share which clips got the most views so clients see the value of continuing.'],
    ],
    firstCustomer: [
      'Search Spotify or YouTube for podcasts with consistent uploads but no clips on their social profiles.',
      'Send a free sample clip made from their latest episode — it shows value instantly.',
      'Post your best clips on your own account and tag the creator; some will reach out.',
    ],
    firstSale: [
      'Offer a low-risk paid trial, for example one episode turned into clips, before proposing a monthly plan.',
      'Show the clip performance numbers once they post your work.',
      'Convert happy trial clients into monthly packages tied to their publishing schedule.',
    ],
    mistakes: [
      'Cutting clips that make sense only with context — each clip must stand alone.',
      'Weak first two seconds; the hook decides whether anyone keeps watching.',
      'Captions with typos or poor timing — they are the first thing viewers notice.',
      'Using footage you do not have permission to use for anything beyond your portfolio.',
    ],
    scaling: [
      'Build caption and hook templates for each client to speed up delivery.',
      'Offer a premium tier that includes posting and scheduling the clips.',
      'Train an assistant to handle the first cut while you focus on hooks and quality control.',
      'Expand into full long-form editing for your best clip clients.',
    ],
  },

  'faceless-youtube': {
    overview:
      'You run a YouTube channel built around a specific topic — history, personal finance basics, science explained, software tutorials — where the content is narration, screen recordings, stock footage and graphics instead of a person on camera. The channel earns from YouTube ads once it joins the Partner Program, plus sponsorships and affiliate links. It is a long game: most channels need dozens of videos before they gain traction.',
    requirements: [
      'A topic you can research deeply and keep making videos about',
      'A decent USB microphone or a clear voice-recording setup',
      'Basic video editing skills',
      'Patience for a 6–12 month ramp before meaningful income',
    ],
    tools: [
      ['DaVinci Resolve or CapCut', 'Editing your videos'],
      ['Audacity', 'Free audio recording and cleanup'],
      ['Canva or Photopea', 'Designing thumbnails'],
      ['Pexels, Pixabay and Storyblocks', 'Royalty-free stock footage'],
      ['vidIQ or TubeBuddy (free tiers)', 'Topic and keyword research'],
    ],
    steps: [
      ['Choose a focused niche', 'Pick a topic with proven demand (similar channels get views) and where you can add a clear angle or better explanations.'],
      ['Plan 20 video ideas', 'Use YouTube search suggestions and competitor channels to list 20 topics people are already searching for.'],
      ['Write tight scripts', 'Open with a hook in the first 15 seconds, deliver on the title quickly and keep pacing tight. Aim for 6–12 minute videos.'],
      ['Produce your first 10 videos', 'Record narration, edit with visuals that change every few seconds and design thumbnails that are readable on a phone.'],
      ['Publish on a schedule', 'Upload one or two videos per week consistently. Track click-through rate and audience retention in YouTube Studio.'],
      ['Monetize step by step', 'Add affiliate links in descriptions early, apply for the YouTube Partner Program once eligible and approach sponsors when you have steady views.'],
    ],
    firstCustomer: [
      'Your "customers" are viewers first: focus on videos that answer specific search queries in your niche.',
      'Share videos in relevant communities (Reddit, forums, Discord) where they genuinely help — not as spam.',
      'Turn your best moments into Shorts that link back to the full video.',
    ],
    firstSale: [
      'Add relevant affiliate links (Amazon Associates or software affiliate programs) from your first video.',
      'Create a simple media kit with your views and audience to pitch small sponsors once you have consistent traffic.',
      'Disclose sponsorships and affiliate links clearly to keep viewer trust and follow platform rules.',
    ],
    mistakes: [
      'Choosing a niche only because it pays well, then running out of motivation.',
      'Low-effort, reused or AI-spun content — YouTube limits monetization for repetitive or reused material.',
      'Ignoring thumbnails and titles, which decide whether anyone clicks.',
      'Quitting after 10 videos; most channels take far longer to find their audience.',
    ],
    scaling: [
      'Hire freelance scriptwriters, voice actors or editors once the channel earns enough to fund them.',
      'Launch a second channel in an adjacent niche using the same production system.',
      'Create a digital product, such as a guide or template, for your audience.',
      'Repurpose videos into a newsletter, blog posts and Shorts for more reach.',
    ],
  },

  'ugc-creator': {
    overview:
      'User-generated content (UGC) creators make short, natural-looking videos for brands — product demos, unboxings, testimonials, "how I use it" clips. Brands run these on their own social accounts or as paid ads. Unlike influencers, you do not need followers; brands pay for the content itself. A phone, good natural light and the ability to speak comfortably on camera are enough to start.',
    requirements: [
      'A recent smartphone with a good camera',
      'Natural light or an inexpensive ring light',
      'Comfort speaking to the camera in a natural, friendly way',
      'A portfolio of 3–5 sample videos using products you already own',
    ],
    tools: [
      ['CapCut', 'Editing, captions and quick cuts'],
      ['Canva', 'Build a simple UGC portfolio and rate card'],
      ['A clip-on microphone', 'Clear audio makes videos feel professional'],
      ['Notion or Google Sheets', 'Track brands, pitches and deliverables'],
    ],
    steps: [
      ['Pick 2–3 product categories', 'Focus on categories you naturally fit — skincare, tech accessories, home goods, fitness, apps.'],
      ['Create sample videos', 'Film 3–5 short videos with products you own: a hook, a problem, the product in use and a clear benefit.'],
      ['Build a portfolio page', 'Host your videos on a simple Canva website or Notion page with a short bio and contact info.'],
      ['Set your rates and terms', 'Decide on a per-video price and a separate fee for paid ad usage rights. Put both in writing for every deal.'],
      ['Pitch brands daily', 'Find brands running ads (Meta Ad Library, TikTok Creative Center) and email or DM them with your portfolio.'],
      ['Deliver professionally', 'Send files on time, with hook variations, and ask for feedback and permission to use the content in your portfolio.'],
    ],
    firstCustomer: [
      'Look for small and mid-sized brands that already run UGC-style ads — they understand the value.',
      'Join UGC platforms and creator marketplaces such as Billo, Insense or Collabstr to find brand briefs.',
      'Offer a first video with two hook variations so brands can test what performs.',
    ],
    firstSale: [
      'Keep your pitch short: who you are, a link to samples, what you would make for their product.',
      'Quote clearly: price per video, number of revisions, delivery time and usage rights.',
      'Ask for payment upfront or through a platform that holds payment securely.',
    ],
    mistakes: [
      'Sounding scripted or salesy — UGC works because it feels authentic.',
      'Forgetting to charge for usage rights when brands run your video as an ad.',
      'Poor lighting or audio that makes otherwise good videos unusable.',
      'Making claims about products you have not used or that are not true.',
    ],
    scaling: [
      'Offer monthly content packages to brands you work well with.',
      'Raise prices as your portfolio includes recognizable brands.',
      'Add editing services, providing multiple cuts and hooks per video.',
      'Grow your own audience over time to add influencer deals on top.',
    ],
  },

  'niche-social-page': {
    overview:
      'You build a TikTok, Instagram or YouTube Shorts page around a specific theme — for example study tips, budget travel, home organization or productivity tools — and grow an engaged audience by posting valuable content consistently. Once the page has a loyal following, it can earn from brand deals, affiliate links and your own digital products. Growth is uncertain, so treat it as an asset you build over months.',
    requirements: [
      'A niche you can create content about consistently',
      'A smartphone for creating and posting content',
      'Willingness to post several times a week for months',
      'Comfort studying analytics and adjusting',
    ],
    tools: [
      ['CapCut', 'Short-form video editing'],
      ['Canva', 'Carousels, covers and graphics'],
      ['Meta Business Suite or TikTok scheduler', 'Plan and schedule posts'],
      ['Beacons or Linktree', 'A link-in-bio page for offers'],
      ['Notion', 'Content ideas bank and posting calendar'],
    ],
    steps: [
      ['Define the niche and audience', 'Write one sentence: "This page helps [who] with [what]". Everything you post should fit it.'],
      ['Study 10 successful pages', 'Note their formats, hooks, posting frequency and which posts got outsized reach.'],
      ['Create 3–4 repeatable formats', 'For example: "3 tools for…", "mistakes to avoid", "before/after". Formats make consistency easy.'],
      ['Post consistently for 60 days', 'Aim for one post a day if possible. Treat the first 60 days as an experiment, not a verdict.'],
      ['Double down on winners', 'Each week, review what got the most saves and shares and make more variations of it.'],
      ['Add monetization', 'Add affiliate links in your bio, create a simple digital product and pitch relevant brands once you have engagement.'],
    ],
    firstCustomer: [
      'Your first "customers" are followers — reply to every comment and DM early on to build loyalty.',
      'Collaborate with similar-size pages on joint posts to share audiences.',
      'Brands in your niche often reach out once you consistently get engagement; have a simple media kit ready.',
    ],
    firstSale: [
      'Start with affiliate products you genuinely use and can demonstrate in your content.',
      'Create a small digital product (a guide, checklist or template) your audience keeps asking about.',
      'Always disclose sponsorships and affiliate links as required by the platforms and advertising rules.',
    ],
    mistakes: [
      'Changing niche every few weeks before any format has time to work.',
      'Chasing follower counts instead of engagement and trust.',
      'Copying other creators instead of adding your own angle.',
      'Relying on a single platform — collect emails when you can.',
    ],
    scaling: [
      'Repurpose content across TikTok, Reels, Shorts and Pinterest.',
      'Build an email list to own your audience relationship.',
      'Launch more digital products, or a paid community, for your most engaged followers.',
      'Hire an editor or designer to increase output.',
    ],
  },

  'youtube-thumbnails': {
    overview:
      'You design the thumbnail images that appear next to YouTube videos. Thumbnails strongly influence how many people click, so creators who care about growth will pay for good ones. The work is quick, visual and repeatable: a creator might need one to three thumbnails every week, which makes it a natural fit for ongoing packages.',
    requirements: [
      'Basic graphic design skills: typography, contrast, cutting out subjects',
      'Photoshop, Photopea or Canva',
      'A portfolio of 6–10 thumbnails (redesigns of existing videos work well)',
      'An understanding of what makes people click on YouTube',
    ],
    tools: [
      ['Photopea', 'Free browser-based Photoshop alternative'],
      ['Adobe Photoshop', 'Industry standard if you have it'],
      ['Canva', 'Fast layouts and fonts'],
      ['remove.bg', 'Quick background removal'],
      ['ThumbsUp.tv', 'Preview thumbnails in a realistic YouTube layout'],
    ],
    steps: [
      ['Study top thumbnails', 'Collect 50 high-performing thumbnails in one niche and note the patterns: faces, emotion, text length, colors.'],
      ['Redesign 8 thumbnails', 'Pick real videos with weak thumbnails and design better versions. Show before/after side by side.'],
      ['Create a portfolio', 'Build a simple gallery page on Notion, Behance or a free Framer site.'],
      ['Package your offer', 'For example: single thumbnail, a pack of four per month or a channel bundle with banner and avatar.'],
      ['Reach out to creators', 'DM or email creators who upload consistently with weak thumbnails, attaching a redesign of one of their videos.'],
      ['Deliver variations', 'Provide two options per video so creators can A/B test with YouTube\'s Test & Compare feature.'],
    ],
    firstCustomer: [
      'Target small to mid-sized creators (5k–100k subscribers) who are clearly trying to grow.',
      'Join creator communities and Discord servers, and check ytjobs.co and X (Twitter) for thumbnail requests.',
      'Lead with a free redesign of one of their recent thumbnails.',
    ],
    firstSale: [
      'Offer a low-cost trial pack of two thumbnails to start the relationship.',
      'Turn ongoing work into a monthly package with a set number of thumbnails.',
      'Ask clients to share click-through-rate improvements to use as proof.',
    ],
    mistakes: [
      'Too much text — thumbnails must read on a small phone screen.',
      'Designing in a style that does not fit the creator\'s brand.',
      'Using copyrighted images without permission.',
      'Not checking how the design looks at small sizes and in dark mode.',
    ],
    scaling: [
      'Sell monthly packages instead of one-off designs.',
      'Build template systems per client so each new thumbnail is faster.',
      'Add channel branding, banners and title consulting as upsells.',
      'Bring in junior designers and manage quality as a small studio.',
    ],
  },

  'podcast-production': {
    overview:
      'You handle the post-production of podcasts for business owners, coaches and companies: cleaning up audio, removing mistakes and long pauses, adding intro/outro music, writing show notes and publishing episodes. Because podcasts publish on a schedule, satisfied clients usually become recurring monthly revenue.',
    requirements: [
      'Basic audio editing skills (learnable in a few weeks)',
      'Decent headphones to hear audio problems',
      'Good organization to manage weekly deadlines',
      'Clear writing for show notes and episode descriptions',
    ],
    tools: [
      ['Audacity or Reaper', 'Affordable audio editing'],
      ['Descript', 'Transcript-based editing and filler-word removal'],
      ['Adobe Podcast Enhance', 'Improve poor-quality recordings'],
      ['Buzzsprout, Spotify for Creators or Transistor', 'Podcast hosting and publishing'],
      ['Trello or Notion', 'Episode pipeline per client'],
    ],
    steps: [
      ['Learn the core workflow', 'Practice noise reduction, leveling, cutting filler and adding music using free sample episodes.'],
      ['Create before/after samples', 'Edit a few rough recordings and present the before and after audio side by side.'],
      ['Define packages', 'For example: "audio edit only", "edit + show notes", "full production incl. publishing and clips".'],
      ['Set up a smooth intake', 'Create a form where clients upload raw files and note anything to cut or emphasize.'],
      ['Find podcasters', 'Look for business podcasts with inconsistent audio quality or irregular publishing.'],
      ['Deliver on schedule', 'Reliability is your product — agree on turnaround times and always meet them.'],
    ],
    firstCustomer: [
      'Search Apple Podcasts and Spotify for business or niche shows with fewer than 100 episodes and inconsistent quality.',
      'Offer to clean up the audio on one episode for free so they hear the difference.',
      'Reach out to coaches and consultants who mention "starting a podcast" on LinkedIn.',
    ],
    firstSale: [
      'Present a monthly package aligned with their publishing schedule (for example, four episodes).',
      'Include show notes in your offer — it saves them time and makes the package feel complete.',
      'Use simple invoicing with monthly upfront payment.',
    ],
    mistakes: [
      'Over-processing audio until voices sound robotic.',
      'Missing deadlines — podcasters have audiences expecting new episodes.',
      'Not agreeing on what to cut, then removing content the host wanted.',
      'Pricing per hour instead of per episode, which caps your income as you get faster.',
    ],
    scaling: [
      'Add video podcast editing and short clips for social media.',
      'Offer launch packages for new podcasts: artwork, trailer, setup and distribution.',
      'Hire an editor and move into the producer role.',
      'Create templates and presets per show to speed up every episode.',
    ],
  },

  'freelance-graphic-designer': {
    overview:
      'As a freelance graphic designer you create visual assets for businesses: social media graphics, ad creatives, presentations, flyers, menus and simple brand materials. Many small businesses need a steady flow of designs but cannot justify a full-time designer, which creates room for project work and monthly design retainers.',
    requirements: [
      'Design fundamentals: layout, typography, color and hierarchy',
      'Proficiency in Figma, Adobe tools or Canva',
      'A portfolio of 6–10 pieces focused on one or two services',
      'Clear communication to understand briefs and handle feedback',
    ],
    tools: [
      ['Figma', 'Free, professional design tool'],
      ['Canva Pro', 'Fast production and brand kits for clients'],
      ['Adobe Express or Photopea', 'Image editing'],
      ['Behance or Dribbble', 'Showcase your portfolio'],
      ['Google Fonts and Unsplash', 'Free fonts and photography'],
    ],
    steps: [
      ['Choose a focus', 'Pick a service and a client type, such as "social media graphics for restaurants" or "pitch decks for startups".'],
      ['Build a focused portfolio', 'Create 6–10 pieces for realistic (or self-initiated) briefs in that niche.'],
      ['Write a clear offer', 'List exactly what clients get, how fast and for how much — for example, "20 social graphics per month".'],
      ['Create a portfolio site', 'Use Behance, a Framer template or a Notion page with your work, services and contact link.'],
      ['Start outreach', 'Contact 10 businesses per day whose visuals could clearly improve, with one specific suggestion.'],
      ['Set up a feedback process', 'Use a brief form and limit revisions to keep projects profitable.'],
    ],
    firstCustomer: [
      'Start with your network: friends who run businesses, local shops, clubs and nonprofits.',
      'Redesign one of a prospect\'s existing posts and send the improved version.',
      'Use freelance platforms such as Upwork or Contra while building direct relationships.',
    ],
    firstSale: [
      'Offer a small, fixed-price starter project to reduce risk for the client.',
      'Deliver early and slightly above expectations, then propose an ongoing package.',
      'Collect a testimonial and permission to show the work in your portfolio.',
    ],
    mistakes: [
      'A portfolio that tries to show everything instead of what you want to sell.',
      'No written scope, leading to endless changes.',
      'Competing purely on price on large marketplaces.',
      'Using fonts or images without proper commercial licenses.',
    ],
    scaling: [
      'Offer an unlimited-requests design subscription with one active request at a time.',
      'Create reusable templates for recurring clients.',
      'Specialize in a higher-value niche such as ad creatives or pitch decks.',
      'Partner with marketing agencies that need white-label design.',
    ],
  },

  'brand-identity-studio': {
    overview:
      'You design complete brand identities for new and growing businesses: logo, color palette, typography, brand patterns and usage guidelines. Brand projects have higher fees than one-off graphics because they shape how a business presents itself everywhere. Success depends on a strong portfolio, a clear process and the ability to guide clients through decisions.',
    requirements: [
      'Strong design skills, especially typography and logo design',
      'A structured process: discovery, concepts, refinement, delivery',
      'A portfolio of 3–5 complete brand case studies',
      'Confidence presenting and explaining design decisions',
    ],
    tools: [
      ['Figma', 'Design, presentation and brand guidelines'],
      ['Adobe Illustrator', 'Vector logo work'],
      ['Notion', 'Client discovery questionnaires and project hubs'],
      ['Behance', 'Publish brand case studies'],
      ['Mockup templates', 'Show brands in realistic context'],
    ],
    steps: [
      ['Create 3 case studies', 'Design complete identities for fictional or real small businesses, showing your thinking from brief to final system.'],
      ['Design your process', 'Write out each phase, timeline and what clients receive. A clear process justifies premium pricing.'],
      ['Price by package', 'Offer two or three tiers, for example "logo suite", "full identity" and "identity + launch assets".'],
      ['Publish case studies', 'Share them on Behance, Dribbble, LinkedIn and your site with the story behind each decision.'],
      ['Build referral partners', 'Connect with web designers, developers and marketers who need branding for their clients.'],
      ['Deliver a brand guide', 'Always finish with a clear guidelines document and organized files — it sets you apart.'],
    ],
    firstCustomer: [
      'New businesses register every day — look at local startup groups, incubators and founder communities.',
      'Offer a reduced rate to one or two early clients in exchange for a detailed case study.',
      'Ask web developers if they have clients launching without a brand.',
    ],
    firstSale: [
      'Run a short discovery call and send a proposal within 24 hours.',
      'Present clear packages, a timeline and a 50% deposit requirement.',
      'Show similar case studies to help the client visualize the result.',
    ],
    mistakes: [
      'Presenting too many concepts, which overwhelms clients.',
      'Skipping discovery and designing based on personal taste.',
      'Delivering a logo without guidelines or properly exported files.',
      'Starting without a signed agreement and deposit.',
    ],
    scaling: [
      'Raise prices as your case studies improve.',
      'Add launch packages: website design, social templates and pitch decks.',
      'Bring in freelance designers and act as creative director.',
      'Productize a "brand sprint" with a fixed scope delivered in two weeks.',
    ],
  },

  'canva-templates': {
    overview:
      'You design editable Canva templates — Instagram post packs, carousel templates, media kits, ebook layouts, presentation decks — and sell them as digital downloads. Buyers receive a link that copies the template into their own Canva account. Products are created once and can be sold indefinitely, but you need to research demand and market consistently for sales to build.',
    requirements: [
      'Canva skills and a good eye for layout',
      'Research into what buyers search for on Etsy and other marketplaces',
      'A storefront: Etsy, Gumroad, Payhip or your own site',
      'Mockups and product images that show the templates clearly',
    ],
    tools: [
      ['Canva Pro', 'Design and share template links (check Canva\'s license terms for templates)'],
      ['Etsy', 'Marketplace with built-in buyer traffic'],
      ['Gumroad or Payhip', 'Sell directly with automated delivery'],
      ['eRank or Etsy search suggestions', 'Keyword research'],
      ['Pinterest', 'Free traffic to your listings'],
    ],
    steps: [
      ['Research demand', 'Find template categories with steady sales but room for better design, for example templates for a specific profession.'],
      ['Pick a target audience', 'Design for one audience at a time — realtors, coaches, fitness trainers — so your listings speak directly to them.'],
      ['Design your first 5 products', 'Create cohesive packs (for example 30 posts per pack) with consistent fonts and colors.'],
      ['Create listing images', 'Show the templates in mockups, explain what is included and how editing works.'],
      ['Write keyword-rich listings', 'Use the exact phrases buyers search for in titles, tags and descriptions.'],
      ['Promote and expand', 'Share designs on Pinterest and Instagram, then add new products every week based on what sells.'],
    ],
    firstCustomer: [
      'Etsy brings built-in traffic — optimized listings are your main way to find first buyers.',
      'Pin each listing to Pinterest with multiple pin designs.',
      'Share free sample templates in communities for your target audience to build credibility.',
    ],
    firstSale: [
      'Price introductory products competitively while you collect your first reviews.',
      'Include clear instructions so buyers succeed and leave good reviews.',
      'Bundle related templates to increase the value of each order.',
    ],
    mistakes: [
      'Designing what you like rather than what buyers search for.',
      'Copying existing best-sellers — it risks takedowns and does not build a brand.',
      'Poor listing images that do not show what is included.',
      'Giving up after a few weeks; digital shops usually take months to gain momentum.',
    ],
    scaling: [
      'Build bundles and higher-priced complete brand kits.',
      'Move loyal customers to your own store and email list.',
      'Offer custom template design for businesses at premium rates.',
      'Expand into adjacent tools such as Notion or Google Slides templates.',
    ],
  },

  'printables-shop': {
    overview:
      'You create printable digital products — planners, habit trackers, budget sheets, meal planners, worksheets, wall art — and sell them as instant downloads, mainly on Etsy. Customers download a PDF and print it at home. It is one of the most accessible digital product businesses, but the market is crowded, so a clear niche and good design matter.',
    requirements: [
      'A design tool (Canva is enough to start)',
      'An Etsy seller account (small listing fees apply)',
      'Research into specific niches and buyer needs',
      'Consistency to keep adding products',
    ],
    tools: [
      ['Canva', 'Design printables and export print-ready PDFs'],
      ['Etsy', 'Marketplace with buyers already searching'],
      ['eRank', 'Etsy keyword research (free tier)'],
      ['Pinterest', 'Free traffic for printables'],
      ['Placeit or free mockups', 'Attractive listing photos'],
    ],
    steps: [
      ['Pick a specific niche', 'Instead of "planners", choose something like "ADHD-friendly weekly planners" or "wedding budget trackers".'],
      ['Check demand on Etsy', 'Look at best-seller badges, review counts and search suggestions to confirm buyers exist.'],
      ['Create 5–10 products', 'Design a small, cohesive collection with consistent style and practical layouts.'],
      ['Make strong listings', 'Use mockups, show every page, state sizes (A4/US Letter) and explain how printing works.'],
      ['Optimize for search', 'Use all 13 Etsy tags and put the most important keywords at the start of the title.'],
      ['Add products weekly', 'Expand the collections that sell, and create bundles from best-sellers.'],
    ],
    firstCustomer: [
      'Etsy search is your main channel — keyword-optimized listings bring first buyers.',
      'Create several Pinterest pins per product linking to your listings.',
      'Share a free sample printable in a relevant Facebook group or subreddit (follow community rules).',
    ],
    firstSale: [
      'Offer both A4 and US Letter sizes to avoid losing international buyers.',
      'Use a launch discount to encourage first reviews.',
      'Send a friendly thank-you message with printing tips after each order.',
    ],
    mistakes: [
      'Choosing a niche that is too broad to stand out.',
      'Using fonts or graphics without commercial licenses.',
      'Uploading products and never improving listings.',
      'Expecting quick results — most shops build slowly over months.',
    ],
    scaling: [
      'Create large bundles of related printables at higher prices.',
      'Open your own store on Shopify or Payhip and build an email list.',
      'Expand into digital planners for tablets such as GoodNotes.',
      'Sell printables on multiple marketplaces.',
    ],
  },

  'print-on-demand': {
    overview:
      'You design products — t-shirts, hoodies, mugs, posters, phone cases — and sell them through a store connected to a print-on-demand provider. When a customer orders, the provider prints and ships the product, and you keep the difference between your price and their cost. There is no inventory, but margins are thinner than with digital products, so niche focus and design quality matter.',
    requirements: [
      'Design skills or the ability to create text-based designs',
      'A specific community or niche to design for',
      'A store (Etsy, Shopify) or marketplace account',
      'Sample orders to check quality (optional but recommended)',
    ],
    tools: [
      ['Printful or Printify', 'Printing, fulfillment and shipping'],
      ['Etsy or Shopify', 'Your storefront'],
      ['Canva, Figma or Illustrator', 'Design creation'],
      ['Placeit', 'Product mockups'],
      ['Pinterest and TikTok', 'Organic marketing'],
    ],
    steps: [
      ['Choose a passionate niche', 'Pick a community with strong identity: a hobby, profession or interest people love to show off.'],
      ['Research what sells', 'Study best-sellers on Etsy and Amazon Merch to learn which styles and phrases resonate.'],
      ['Design 10–20 products', 'Create original designs in a consistent style for your niche.'],
      ['Connect your store', 'Set up Printful or Printify with Etsy or Shopify and calculate prices that leave a healthy margin.'],
      ['Order samples', 'Check print quality and use your own photos in listings.'],
      ['Market to your community', 'Share designs where your niche gathers, and create short videos showing the products.'],
    ],
    firstCustomer: [
      'Share your designs in niche communities and ask for feedback before pushing sales.',
      'Optimize Etsy listings with niche-specific keywords.',
      'Post short-form videos of products in use, aimed at the community you design for.',
    ],
    firstSale: [
      'Price for profit: include production, shipping and platform fees.',
      'Offer a launch discount to your first followers.',
      'Use real photos of samples — they convert better than generic mockups.',
    ],
    mistakes: [
      'Using trademarked names, characters or logos — this leads to takedowns and legal trouble.',
      'Generic designs aimed at everyone and no one.',
      'Pricing too low to cover fees and returns.',
      'Never ordering samples and receiving complaints about quality.',
    ],
    scaling: [
      'Expand winning designs onto more product types.',
      'Build a brand with its own website and email list.',
      'Run small paid-ad tests on proven designs.',
      'Launch seasonal and limited-edition drops.',
    ],
  },

  'lightroom-presets': {
    overview:
      'You package your photo-editing style into Lightroom presets, LUTs for video or editing packs and sell them to photographers and content creators. Buyers want a consistent look with less effort. This works best if you have a recognizable style and an audience that has seen your work, because presets are sold mainly through trust and visual examples.',
    requirements: [
      'A distinctive and consistent editing style',
      'Adobe Lightroom (desktop or mobile)',
      'Before/after examples across different lighting conditions',
      'A sales channel: your own store, Etsy or Gumroad',
    ],
    tools: [
      ['Adobe Lightroom', 'Create and export presets (.xmp and .dng)'],
      ['Gumroad or Payhip', 'Sell with automated delivery'],
      ['Instagram and TikTok', 'Show before/after transformations'],
      ['Canva', 'Product images and instructions PDF'],
    ],
    steps: [
      ['Define your style', 'Choose one look you are known for — moody, film-inspired, bright and airy — and refine it.'],
      ['Test across photos', 'Make sure presets work on different lighting, skin tones and cameras; create variations.'],
      ['Package professionally', 'Include desktop and mobile versions, installation instructions and tips for adjusting.'],
      ['Create before/after content', 'Short videos and carousels showing transformations are your best marketing.'],
      ['Launch your store', 'Set up Gumroad or Payhip with clear product images and examples.'],
      ['Grow with content', 'Post editing tutorials regularly and link to your presets.'],
    ],
    firstCustomer: [
      'Share before/after edits on Instagram and TikTok with a link to your store.',
      'Offer a free preset in exchange for an email address to build a list.',
      'Partner with small photography creators for honest reviews.',
    ],
    firstSale: [
      'Bundle 5–10 presets in a pack rather than selling single presets.',
      'Show results on real-world photos, not only perfect shots.',
      'Use launch pricing for your first week to collect reviews.',
    ],
    mistakes: [
      'Presets that only work on your specific photos.',
      'No installation guide, leading to refund requests.',
      'Trying to sell without showing enough examples.',
      'Copying popular creators\' looks instead of developing your own.',
    ],
    scaling: [
      'Add video LUTs for creators and filmmakers.',
      'Create editing courses or tutorials for your style.',
      'Release seasonal collections.',
      'Offer custom preset creation for brands and photographers.',
    ],
  },
}
