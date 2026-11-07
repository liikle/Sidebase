import type { RawDetails } from './types.ts'

export const educationCommerce: Record<string, RawDetails> = {
  'online-tutor': {
    overview:
      'You teach students one-to-one or in small groups over video calls — school subjects, university courses, test preparation or practical skills like coding or music theory. Tutoring rewards deep subject knowledge and patience. Many tutors start on platforms to get students, then build a direct client base through referrals to keep more of each fee.',
    requirements: [
      'Strong knowledge of at least one subject',
      'Patience and clear explanations',
      'A reliable internet connection, webcam and headset',
      'Any local requirements for working with minors (such as background checks)',
    ],
    tools: [
      ['Zoom or Google Meet', 'Lessons'],
      ['Miro or a digital whiteboard', 'Interactive explanations'],
      ['Preply, Wyzant or Superprof', 'Platforms for finding students'],
      ['Calendly', 'Booking lessons'],
      ['Stripe or PayPal', 'Direct payments'],
    ],
    steps: [
      ['Choose subjects and levels', 'Focus on what you can teach confidently, such as high school math or SAT preparation.'],
      ['Create a teaching approach', 'Plan a first-lesson assessment and a simple structure for each session.'],
      ['Join a platform', 'Create a profile with a short intro video and clear subject list.'],
      ['Set your rates', 'Start competitively to win reviews, then raise rates.'],
      ['Build direct referrals', 'Ask satisfied parents and students to recommend you.'],
      ['Offer packages', 'Monthly lesson packages create predictable income.'],
    ],
    firstCustomer: [
      'Platforms bring students who are already searching for tutors.',
      'Tell friends, family and local schools or community groups.',
      'Offer a discounted first session.',
    ],
    firstSale: [
      'Run an excellent first lesson with a clear plan for improvement.',
      'Share progress updates with parents.',
      'Offer a package of sessions after the first lesson.',
    ],
    mistakes: [
      'Teaching without understanding the student\'s level and goals.',
      'Inconsistent scheduling.',
      'Promising specific grades or scores.',
      'Staying on platforms with high fees forever.',
    ],
    scaling: [
      'Run small group classes.',
      'Create study guides and courses.',
      'Hire tutors and run a tutoring agency.',
      'Specialize in high-value test preparation.',
    ],
  },

  'language-teacher': {
    overview:
      'You teach your native language — or one you speak fluently — to learners worldwide through online lessons. Many students want conversation practice rather than grammar lectures, so you do not always need formal teaching credentials to start, although a teaching certificate helps you charge more.',
    requirements: [
      'Native or fluent level in the language you teach',
      'Patience and good listening skills',
      'A webcam, headset and quiet space',
      'A basic lesson structure and materials',
    ],
    tools: [
      ['Preply or italki', 'Platforms with students looking for teachers'],
      ['Zoom or Google Meet', 'Lessons outside platforms'],
      ['Google Slides', 'Lesson materials'],
      ['Quizlet', 'Vocabulary practice'],
    ],
    steps: [
      ['Define your offer', 'Conversation practice, business language, exam preparation or beginner courses.'],
      ['Create a profile and intro video', 'Show your personality and teaching style.'],
      ['Prepare lesson templates', 'Warm-up, topic, practice and feedback.'],
      ['Start with competitive rates', 'Earn your first reviews quickly.'],
      ['Track student goals', 'Personalize lessons to keep students coming back.'],
      ['Build direct clients over time', 'Develop your own website and referrals.'],
    ],
    firstCustomer: [
      'Platforms are the fastest way to find first students.',
      'Offer trial lessons.',
      'Share language tips on social media.',
    ],
    firstSale: [
      'Make the trial lesson personal and focused on the student\'s goals.',
      'Propose a weekly schedule.',
      'Offer lesson packages.',
    ],
    mistakes: [
      'Talking too much instead of letting students speak.',
      'No lesson structure.',
      'Inconsistent availability.',
      'Undervaluing your time long-term.',
    ],
    scaling: [
      'Run group conversation classes.',
      'Create courses and learning materials.',
      'Specialize in business language or exam preparation.',
      'Build an audience on YouTube or TikTok.',
    ],
  },

  'online-course': {
    overview:
      'You turn a skill you know well into an online course that helps people achieve a specific result — for example, "edit your first YouTube video" or "build a budget in 30 days". Courses can be sold repeatedly, but the real work lies in choosing a clear outcome, validating demand and building an audience. Pre-selling before recording reduces risk.',
    requirements: [
      'Expertise in a specific, teachable skill',
      'A microphone and screen recording or camera setup',
      'An audience or a plan to build one',
      'A course platform',
    ],
    tools: [
      ['Teachable, Thinkific or Podia', 'Course hosting and sales'],
      ['Loom or OBS Studio', 'Recording lessons'],
      ['Notion', 'Course planning'],
      ['Kit (ConvertKit)', 'Email marketing'],
    ],
    steps: [
      ['Define a clear outcome', 'The course should promise a specific, realistic result for a specific person.'],
      ['Validate demand', 'Talk to potential students and pre-sell a beta version.'],
      ['Outline the course', 'Break the outcome into modules and short lessons.'],
      ['Run a live beta', 'Teach it live to early buyers and improve based on feedback.'],
      ['Record the final version', 'Short, focused lessons with practical exercises.'],
      ['Market consistently', 'Share free content related to the course and build an email list.'],
    ],
    firstCustomer: [
      'Pre-sell to your network or audience at a founding-member price.',
      'Share valuable free content to attract students.',
      'Partner with creators in your niche.',
    ],
    firstSale: [
      'Offer a beta with live sessions and a discount.',
      'Use testimonials from beta students.',
      'Offer a clear refund policy to reduce risk.',
    ],
    mistakes: [
      'Building the whole course before validating demand.',
      'Too much content and not enough results.',
      'No marketing plan.',
      'Promising income or results you cannot guarantee.',
    ],
    scaling: [
      'Add a premium coaching tier.',
      'Create more courses for different levels.',
      'Run cohort-based versions.',
      'Partner with affiliates.',
    ],
  },

  'paid-community': {
    overview:
      'You host a paid membership community around a shared goal or interest — learning a skill, growing a business, staying accountable or connecting with peers. Members pay monthly for access to discussions, events, resources and each other. It works best when you already have an audience and can bring consistent value.',
    requirements: [
      'An audience or the ability to build one',
      'A clear purpose and member benefit',
      'Consistency to run events and content',
      'Community management skills',
    ],
    tools: [
      ['Circle, Skool or Discord', 'Community platforms'],
      ['Stripe', 'Membership payments'],
      ['Zoom', 'Live events and workshops'],
      ['Notion', 'Resource libraries'],
    ],
    steps: [
      ['Define the promise', 'Who is this for and what will they achieve or get?'],
      ['Validate with a waitlist', 'Gauge interest before launching.'],
      ['Design weekly rituals', 'Live calls, challenges, Q&A and discussion prompts.'],
      ['Launch with founding members', 'A small group at a discounted price.'],
      ['Gather feedback', 'Adjust content and events based on member needs.'],
      ['Grow through content and referrals', 'Share wins and invite members to bring others.'],
    ],
    firstCustomer: [
      'Invite your most engaged followers or customers first.',
      'Run a free event to showcase the community experience.',
      'Partner with creators to co-host sessions.',
    ],
    firstSale: [
      'Offer founding-member pricing.',
      'Communicate the value of being early.',
      'Make cancellation easy to build trust.',
    ],
    mistakes: [
      'Launching without enough engagement or audience.',
      'Inconsistent events.',
      'Too broad a topic.',
      'Ignoring churn and member feedback.',
    ],
    scaling: [
      'Add premium tiers with coaching.',
      'Create courses inside the community.',
      'Host paid workshops and events.',
      'Hire community managers.',
    ],
  },

  'stock-photography': {
    overview:
      'You license your photos and video clips through stock platforms such as Adobe Stock, Shutterstock and Pond5. Businesses and creators buy licenses to use them, and you earn a royalty per download. Earnings per image are small, so results come from a large portfolio of commercially useful images built consistently over time.',
    requirements: [
      'A camera or high-quality smartphone',
      'Photo editing skills',
      'Understanding of what buyers need (commercial, authentic, diverse)',
      'Model and property releases when photographing people or private property',
    ],
    tools: [
      ['Adobe Stock, Shutterstock and Pond5', 'Stock marketplaces'],
      ['Adobe Lightroom', 'Editing and keywording'],
      ['Model release apps', 'Collect releases digitally'],
      ['Google Trends', 'Spot topics in demand'],
    ],
    steps: [
      ['Research demand', 'Study best-selling stock images and current visual trends.'],
      ['Plan themed shoots', 'For example remote work, healthy food, local landmarks or business concepts.'],
      ['Shoot and edit carefully', 'Stock platforms have strict quality standards.'],
      ['Keyword thoroughly', 'Accurate titles and keywords are how buyers find your work.'],
      ['Upload consistently', 'Aim for a steady weekly volume of new images.'],
      ['Analyze sales', 'Do more of what sells.'],
    ],
    firstCustomer: [
      'Upload to several platforms to maximize exposure.',
      'Focus on underserved topics with less competition.',
      'Submit video clips, which often earn more than photos.',
    ],
    firstSale: [
      'Upload a large initial batch to increase the odds of first sales.',
      'Use accurate, specific keywords.',
      'Be patient — first sales can take weeks.',
    ],
    mistakes: [
      'Uploading images with logos, trademarks or recognizable people without releases.',
      'Poor keywording.',
      'Shooting what you like instead of what buyers need.',
      'Giving up after a small portfolio.',
    ],
    scaling: [
      'Expand into stock video.',
      'Shoot in series around popular topics.',
      'Sell prints or presets alongside stock.',
      'Offer custom photography to businesses.',
    ],
  },

  'product-photographer': {
    overview:
      'You photograph products for online stores, Amazon sellers and brands — white-background shots, lifestyle images and detail photos. Clients usually ship products to you. Great product photos directly influence sales, so brands are willing to pay for quality and consistency.',
    requirements: [
      'A camera (or high-end smartphone) and a tripod',
      'Basic lighting setup and backdrop',
      'Photo editing and retouching skills',
      'A portfolio of product shots',
    ],
    tools: [
      ['Adobe Lightroom and Photoshop', 'Editing and retouching'],
      ['Softboxes or LED panels', 'Consistent lighting'],
      ['Light tent and backdrops', 'Clean product backgrounds'],
      ['Shopify and Amazon image guidelines', 'Knowing marketplace requirements'],
    ],
    steps: [
      ['Set up a home studio', 'A small table, lighting, backdrop and tripod are enough to start.'],
      ['Build a portfolio', 'Photograph everyday products to show white-background and lifestyle styles.'],
      ['Define packages', 'Price per image with options for lifestyle and retouching.'],
      ['Find e-commerce brands', 'Look for stores with low-quality product photos.'],
      ['Streamline logistics', 'Clear process for shipping products, turnaround and returns.'],
      ['Deliver marketplace-ready images', 'Follow Amazon and Shopify specifications.'],
    ],
    firstCustomer: [
      'Offer to reshoot one product for an Etsy or Shopify seller with weak photos.',
      'Contact local brands and makers.',
      'Join e-commerce communities and show before/after examples.',
    ],
    firstSale: [
      'Show their current photo next to your improved version.',
      'Offer a starter package for a few products.',
      'Deliver quickly and propose ongoing work for new products.',
    ],
    mistakes: [
      'Inconsistent lighting across a product line.',
      'Ignoring marketplace image requirements.',
      'Underpricing retouching time.',
      'No clear process for product returns.',
    ],
    scaling: [
      'Add lifestyle and video content.',
      'Offer monthly content packages for brands.',
      'Hire an editor or assistant.',
      'Expand into a small studio.',
    ],
  },

  'photo-retoucher': {
    overview:
      'You edit and retouch photos remotely for photographers, real estate agents, e-commerce brands and agencies. Typical work includes color correction, background removal, skin retouching and real estate enhancements. Clients outsource to save time, which makes this steady, repeatable work.',
    requirements: [
      'Proficiency in Photoshop or Lightroom',
      'An eye for detail and color',
      'A portfolio of before/after examples',
      'Reliable turnaround times',
    ],
    tools: [
      ['Adobe Photoshop and Lightroom', 'Retouching and editing'],
      ['Photopea', 'Free alternative for basic edits'],
      ['Dropbox or Google Drive', 'File transfer'],
      ['A calibrated monitor (later)', 'Accurate color'],
    ],
    steps: [
      ['Choose a niche', 'Wedding, real estate, e-commerce or portrait retouching.'],
      ['Create before/after samples', 'Use free raw images to show your work.'],
      ['Define pricing', 'Per image or bulk packages.'],
      ['Set up workflows', 'Presets and actions to speed up repetitive edits.'],
      ['Find clients', 'Photographers, real estate agencies and online stores.'],
      ['Deliver consistently', 'Same style, same quality, every time.'],
    ],
    firstCustomer: [
      'Offer free test edits to photographers in your niche.',
      'Join photographer communities.',
      'Contact real estate photographers who shoot many properties.',
    ],
    firstSale: [
      'Do a small paid test batch.',
      'Match their style precisely.',
      'Offer bulk pricing for ongoing work.',
    ],
    mistakes: [
      'Over-retouching.',
      'Inconsistent edits across a set.',
      'Missing deadlines in busy seasons.',
      'Not asking for style references.',
    ],
    scaling: [
      'Build a team of editors.',
      'Offer specialized services like virtual staging.',
      'Sell presets and actions.',
      'Partner with photography studios.',
    ],
  },

  'online-reselling': {
    overview:
      'You buy items below their market value — at thrift stores, garage sales, clearance sales or online — and resell them for a profit on marketplaces like eBay, Vinted, Depop, Poshmark or Facebook Marketplace. Reselling teaches valuable e-commerce skills quickly. Profit depends on knowing what sells and at what price.',
    requirements: [
      'A small starting budget for inventory',
      'Research skills to check sold prices',
      'A smartphone for photos',
      'Space to store items and shipping supplies',
    ],
    tools: [
      ['eBay sold listings', 'Research real market prices'],
      ['Vinted, Depop or Poshmark', 'Fashion resale marketplaces'],
      ['Facebook Marketplace', 'Local sales without shipping'],
      ['A shipping scale and supplies', 'Accurate shipping costs'],
    ],
    steps: [
      ['Pick a category', 'Clothing, books, electronics, toys or collectibles — learn one category deeply.'],
      ['Learn to research prices', 'Always check sold, not listed, prices before buying.'],
      ['Source carefully', 'Buy only items with a clear profit margin after fees and shipping.'],
      ['Take great photos', 'Clean background, good light and multiple angles.'],
      ['Write clear listings', 'Accurate titles, measurements and condition notes.'],
      ['Reinvest profits', 'Grow inventory gradually as you learn.'],
    ],
    firstCustomer: [
      'Start by selling items you already own to learn the platforms.',
      'Price competitively for your first sales to build feedback.',
      'Use local marketplaces to avoid shipping at first.',
    ],
    firstSale: [
      'Respond to messages quickly.',
      'Ship promptly with tracking.',
      'Ask for feedback after each sale.',
    ],
    mistakes: [
      'Buying without checking sold prices.',
      'Forgetting to include fees and shipping in pricing.',
      'Buying counterfeit or prohibited items.',
      'Letting unsold inventory pile up.',
    ],
    scaling: [
      'List on multiple platforms using cross-listing tools.',
      'Build an online store for a niche.',
      'Source in bulk from liquidation sales.',
      'Hire help for photography and listing.',
    ],
  },

  dropshipping: {
    overview:
      'You run an online store where a supplier ships products directly to customers, so you do not hold inventory. The model is competitive, margins can be thin, and most successful stores need a meaningful advertising budget and excellent customer service. A curated, branded niche store with reliable suppliers has much better odds than a generic store.',
    requirements: [
      'A budget for store setup, samples and advertising',
      'Marketing skills, especially paid ads and creative testing',
      'Reliable suppliers with reasonable shipping times',
      'Customer service and refund handling',
    ],
    tools: [
      ['Shopify', 'Store platform'],
      ['Reliable supplier platforms (e.g., Spocket, Zendrop, or direct suppliers)', 'Product sourcing'],
      ['Meta and TikTok Ads', 'Advertising'],
      ['Klaviyo', 'Email marketing'],
    ],
    steps: [
      ['Choose a niche', 'A specific audience with problems you can solve with products.'],
      ['Vet suppliers', 'Order samples to check product quality and shipping times.'],
      ['Build a trustworthy store', 'Clear policies, real product photos and honest shipping times.'],
      ['Test products with small budgets', 'Run small ad tests and track profitability carefully.'],
      ['Set up email flows', 'Recover abandoned carts and build repeat purchases.'],
      ['Scale only what is profitable', 'Increase budgets slowly on proven products.'],
    ],
    firstCustomer: [
      'Create short-form content showing the product solving a problem.',
      'Run small, targeted ad tests.',
      'Partner with micro-creators in your niche.',
    ],
    firstSale: [
      'Offer clear shipping times and a fair return policy.',
      'Use real customer-style videos and photos.',
      'Follow up with buyers to ensure satisfaction.',
    ],
    mistakes: [
      'Selling low-quality products with long, undisclosed shipping times.',
      'Spending on ads before testing the store and offer.',
      'Ignoring consumer protection laws on refunds and advertising.',
      'Copying trending products without differentiation.',
    ],
    scaling: [
      'Build a brand with custom packaging and private label products.',
      'Expand into new channels like Amazon or retail.',
      'Grow email and SMS for repeat sales.',
      'Hire customer service support.',
    ],
  },

  'amazon-fba': {
    overview:
      'You create your own branded product, manufacture it (often through suppliers found on platforms like Alibaba), and sell it on Amazon using Fulfillment by Amazon (FBA), where Amazon stores, packs and ships your orders. It requires significant upfront investment, product research and careful cost management, but can grow into a brand with real value.',
    requirements: [
      'Significant capital for inventory, samples and launch',
      'Strong product research and negotiation skills',
      'Understanding of Amazon fees, rules and advertising',
      'Patience for longer timelines',
    ],
    tools: [
      ['Amazon Seller Central', 'Selling on Amazon'],
      ['Helium 10 or Jungle Scout', 'Product research'],
      ['Alibaba', 'Finding manufacturers'],
      ['Freight forwarders', 'Shipping inventory'],
    ],
    steps: [
      ['Research products', 'Look for steady demand, manageable competition and room for improvement.'],
      ['Calculate profitability', 'Include manufacturing, shipping, Amazon fees, advertising and returns.'],
      ['Find and vet suppliers', 'Order samples from several manufacturers.'],
      ['Create your brand', 'Logo, packaging and professional product photos.'],
      ['Launch your listing', 'Optimized title, images and descriptions, plus Amazon PPC ads.'],
      ['Manage inventory', 'Avoid running out of stock or overstocking.'],
    ],
    firstCustomer: [
      'Amazon PPC ads bring initial visibility.',
      'Optimize your listing for relevant keywords.',
      'Use Amazon Vine (where available) for early reviews.',
    ],
    firstSale: [
      'Price competitively at launch.',
      'Ensure professional images and clear benefits.',
      'Monitor reviews and customer questions closely.',
    ],
    mistakes: [
      'Underestimating fees and total costs.',
      'Choosing highly competitive products.',
      'Skipping sample checks and quality control.',
      'Violating Amazon\'s rules, which can suspend your account.',
    ],
    scaling: [
      'Add product variations and complementary products.',
      'Sell on your own website and other marketplaces.',
      'Expand to international Amazon marketplaces.',
      'Build a brand that could eventually be sold.',
    ],
  },

  'shopify-setup': {
    overview:
      'You help new brands, creators and small businesses launch Shopify stores: choosing and customizing themes, adding products, configuring payments, shipping, taxes and essential apps. Many people want to sell online but feel overwhelmed by setup. You can offer ongoing support and improvements after launch.',
    requirements: [
      'Strong Shopify knowledge (learnable through Shopify\'s free resources)',
      'An eye for clean design',
      'Organization to manage launches',
      'Basic understanding of e-commerce',
    ],
    tools: [
      ['Shopify Partner account', 'Build development stores for free'],
      ['Shopify themes', 'Store design'],
      ['Canva', 'Banners and graphics'],
      ['Loom', 'Training videos for clients'],
    ],
    steps: [
      ['Join the Shopify Partner Program', 'Build practice stores free of charge.'],
      ['Build demo stores', 'Create two or three demo stores in different niches.'],
      ['Define packages', 'For example: basic setup, full launch or launch + marketing setup.'],
      ['Create a launch checklist', 'Payments, shipping, taxes, legal pages, testing and analytics.'],
      ['Find clients', 'Creators, small brands and businesses moving to Shopify.'],
      ['Offer ongoing support', 'Monthly updates and improvements.'],
    ],
    firstCustomer: [
      'Offer your services to local businesses selling only in person.',
      'Help creators who want to sell merchandise.',
      'Join e-commerce communities where people ask for setup help.',
    ],
    firstSale: [
      'Show demo stores to prospects.',
      'Offer a clear fixed-price package.',
      'Deliver a training video at handover.',
    ],
    mistakes: [
      'Overloading stores with unnecessary apps.',
      'Skipping testing of checkout and shipping.',
      'Not providing training.',
      'Ignoring legal pages and policies.',
    ],
    scaling: [
      'Add email marketing and conversion optimization.',
      'Specialize in a niche such as food or fashion brands.',
      'Hire developers for custom work.',
      'Create Shopify templates for your niche.',
    ],
  },

  'website-flipping': {
    overview:
      'You buy existing online businesses — content websites, newsletters, small e-commerce stores, micro-SaaS products — improve them and either keep them for the monthly income or sell them for more than you paid. It is closer to investing than to a side hustle: due diligence is essential, and you take on real financial risk.',
    requirements: [
      'Capital to purchase a site',
      'Skills to improve traffic, content or conversion',
      'Due diligence ability: verifying traffic and revenue',
      'Comfort with financial risk',
    ],
    tools: [
      ['Flippa, Empire Flippers and Acquire.com', 'Marketplaces for buying and selling'],
      ['Google Analytics and Search Console', 'Verifying traffic'],
      ['Ahrefs or Semrush', 'SEO due diligence'],
      ['Escrow services', 'Secure transactions'],
    ],
    steps: [
      ['Learn valuation', 'Understand how sites are valued (usually a multiple of monthly profit).'],
      ['Define criteria', 'Niche, price range, monetization type and improvement potential.'],
      ['Do careful due diligence', 'Verify traffic, revenue, traffic sources and risks.'],
      ['Buy through escrow', 'Never send funds directly without protection.'],
      ['Improve the business', 'Update content, improve conversions or add new revenue streams.'],
      ['Decide to keep or sell', 'Hold for monthly income or list once value has grown.'],
    ],
    firstCustomer: [
      'Your first "deal" should be small to learn the process.',
      'Join communities of site investors to learn from experienced buyers.',
      'Watch listings for weeks before buying to understand the market.',
    ],
    firstSale: [
      'Keep detailed records of improvements and earnings.',
      'Prepare clear documentation for buyers.',
      'List on reputable marketplaces with verified data.',
    ],
    mistakes: [
      'Skipping due diligence or trusting screenshots.',
      'Buying sites with fake or spammy traffic.',
      'Overpaying for sites that depend on one traffic source.',
      'Investing money you cannot afford to lose.',
    ],
    scaling: [
      'Build a portfolio of sites.',
      'Partner with writers and developers.',
      'Specialize in one asset type.',
      'Offer site improvement services to other investors.',
    ],
  },

  'affiliate-reviews': {
    overview:
      'You create honest product review videos on YouTube or TikTok within a specific category — for example, tech accessories, kitchen gear, outdoor equipment or software tools — and earn affiliate commissions when viewers buy through your links. Trust is everything: real testing, clear pros and cons and transparent disclosures make viewers come back.',
    requirements: [
      'Comfort presenting on camera or recording voice-overs',
      'Basic video editing',
      'Access to products you can genuinely test',
      'Knowledge of the category you review',
    ],
    tools: [
      ['Smartphone or camera with a clip-on mic', 'Recording'],
      ['DaVinci Resolve or CapCut', 'Editing'],
      ['Amazon Associates and brand affiliate programs', 'Monetization'],
      ['TubeBuddy or vidIQ', 'Keyword research for YouTube'],
    ],
    steps: [
      ['Pick a category', 'Choose products you know and that viewers actively research before buying.'],
      ['Plan review topics', 'Best-of lists, comparisons and long-term reviews perform well.'],
      ['Create honest reviews', 'Show real use, strengths and weaknesses.'],
      ['Add affiliate links', 'Join relevant affiliate programs and disclose clearly.'],
      ['Publish consistently', 'Weekly uploads help the algorithm learn your audience.'],
      ['Update and expand', 'Refresh popular reviews as new products launch.'],
    ],
    firstCustomer: [
      'Target search terms like "best X for Y" and "X vs Y".',
      'Share short-form versions of reviews.',
      'Engage with comments and questions.',
    ],
    firstSale: [
      'Place affiliate links in descriptions and pinned comments.',
      'Explain who the product is right for — and who it is not for.',
      'Always disclose affiliate links and sponsorships.',
    ],
    mistakes: [
      'Reviewing products you have not actually used.',
      'Only positive reviews, which destroy trust.',
      'Missing disclosures, which breaks platform and advertising rules.',
      'Choosing a category with few affiliate programs.',
    ],
    scaling: [
      'Build a companion review website.',
      'Work with brands on disclosed sponsorships.',
      'Expand to adjacent product categories.',
      'Create comparison guides and buying checklists.',
    ],
  },
}
