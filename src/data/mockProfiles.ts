export interface LanguageStat {
  rank: number;
  name: string;
  share: number; // percentage
  reposCount: number;
  starsCount: number;
  status: 'LEADER' | 'RISING' | 'STABLE' | 'CLIMBING';
}

export interface ContributionPoint {
  day: string;
  commits: number;
}

export interface PopularRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  htmlUrl: string;
  homepage: string | null;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitTimesProfile {
  username: string;
  fullName: string;
  avatarUrl: string;
  profileUrl?: string;
  followersUrl?: string;
  followingUrl?: string;
  reposUrl?: string;
  joinedDate: string;
  location: string;
  hasPageTwo?: boolean;
  volumeNo: string;
  issueNo: string;
  dateStr: string;
  headline: string;
  subHeadline: string;
  bioArticle: string[];
  caption: string;
  statsManifest: {
    totalRepos: number;
    totalStars: number;
    totalFollowers: number;
    totalFollowing?: number;
    currentStreak: number;
    totalCommitsYear: number;
    pullRequestsMerged: number;
  };
  contributionChart: ContributionPoint[];
  contributionsGrid?: ContributionDay[];
  popularRepos?: PopularRepo[];
  languages: LanguageStat[];
  weatherActivity: {
    forecastSummary: string;
    peakHour: string;
    temperature: string; // e.g. "HOT (89°F)" or "STORMING"
    humidity: string;
  };
  pullQuote: {
    quote: string;
    author: string;
    handwrittenNote: string;
  };
  classifieds: Array<{
    title: string;
    description: string;
    contact: string;
  }>;
  featureStory: {
    title: string;
    author: string;
    content: string[];
  };
  horoscope: {
    sign: string;
    prediction: string;
    luckyTool: string;
  };
}

export const MOCK_PROFILES: Record<string, GitTimesProfile> = {
  octocat: {
    username: 'octocat',
    fullName: 'The Local Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'OCTOBER 2011',
    location: 'SAN FRANCISCO, CA',
    volumeNo: 'CXLIV',
    issueNo: '84,910',
    dateStr: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(),
    headline: 'LOCAL DEV SHIPS 50TH REPOSITORY AMID NIGHTLY MARATHON',
    subHeadline: 'Eyewitnesses Report Unprecedented Terminal Velocity & Coffee Consumption in Local Borough',
    bioArticle: [
      'In an astounding exhibition of nocturnal endurance, local computer engineer Octocat completed their 50th software repository early Tuesday morning. Neighbors reported the rhythmic clatter of cherry-blue mechanical switches echoing through the dimly lit courtyard until 4:00 AM.',
      'Sources close to the developer confirm that over 1,200 git commits were dispatched to remote branches in recent fortnight. Despite mysterious merge conflicts arising in the main trunk, the developer maintained unwavering composure, deploying hotfixes directly into production with heroic audacity.',
      '"It was pure poetry," remarked a senior colleague. "Where others saw fatal stack traces, Octocat saw a blank canvas waiting for elegant async routines and bulletproof exception handling."'
    ],
    caption: 'Fig. 1 — Octocat captured in deep contemplation at 3:14 AM.',
    statsManifest: {
      totalRepos: 52,
      totalStars: 1840,
      totalFollowers: 640,
      currentStreak: 42,
      totalCommitsYear: 2410,
      pullRequestsMerged: 389,
    },
    contributionChart: [
      { day: 'Mon', commits: 14 },
      { day: 'Tue', commits: 28 },
      { day: 'Wed', commits: 45 },
      { day: 'Thu', commits: 32 },
      { day: 'Fri', commits: 60 },
      { day: 'Sat', commits: 18 },
      { day: 'Sun', commits: 52 },
    ],
    languages: [
      { rank: 1, name: 'TypeScript', share: 48, reposCount: 24, starsCount: 920, status: 'LEADER' },
      { rank: 2, name: 'Rust', share: 22, reposCount: 11, starsCount: 510, status: 'RISING' },
      { rank: 3, name: 'Python', share: 18, reposCount: 9, starsCount: 280, status: 'STABLE' },
      { rank: 4, name: 'CSS / SVG', share: 12, reposCount: 8, starsCount: 130, status: 'CLIMBING' },
    ],
    weatherActivity: {
      forecastSummary: 'SCORCHING HEATWAVE OF COMMITS IN LATE EVENING',
      peakHour: '11:00 PM – 2:00 AM',
      temperature: '89°F (HIGH DENSITY)',
      humidity: '84% (COFFEE VAPORS)',
    },
    pullQuote: {
      quote: 'First, solve the problem. Then, write the code.',
      author: 'John Johnson',
      handwrittenNote: 'Remember to rebase before pushing to main!',
    },
    classifieds: [
      {
        title: 'RUST SORCERER WANTED',
        description: 'Seeking high-level alchemist to convert legacy C++ codebase into thread-safe Rust macros. High bounty.',
        contact: 'Telegraph: @rust_guild',
      },
      {
        title: 'FOR SALE: VINTAGE MECHANICAL KEYBOARD',
        description: 'Hand-crafted brass keys, IBM Model M spring mechanism. Loud clacks guaranteed to disturb neighbors.',
        contact: 'Inquire at Room 4B',
      },
      {
        title: 'LOST: O(1) TIME COMPLEXITY',
        description: 'Last seen near nested loops in production query. Reward for whoever optimizes the database index.',
        contact: 'Box 902, Git Times',
      },
    ],
    featureStory: {
      title: 'THE 3 AM FORCE PUSH MYSTERY & THE GHOST IN THE TREE',
      author: 'By Chief Investigative Correspondent Arthur Pendelton',
      content: [
        'It was a dark and stormy night when a mysterious commit appeared on the staging branch without a signed GPG key. The reflog recorded no author, yet the code cleanly compiled and eliminated three lingering memory leaks.',
        'Senior architects investigated the git blame output only to find the author named as "The Phantom of the Kernel". Legend has it that whenever a build pipeline breaks three times in succession, the phantom wakes to fix the CI runner.'
      ]
    },
    horoscope: {
      sign: 'AQUARIUS (THE ARCHITECT)',
      prediction: 'A surprise pull request review will bring unexpected joy tomorrow. Beware of unhandled promises during mercury retrograde.',
      luckyTool: 'Golden Magnifying Glass'
    }
  },
  torvalds: {
    username: 'torvalds',
    fullName: 'Linus Torvalds',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'SEPTEMBER 2011',
    location: 'PORTLAND, OREGON',
    volumeNo: 'DLXXX',
    issueNo: '994,201',
    dateStr: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(),
    headline: 'TORVALDS DISPATCHES KERNEL V6.12 WITH UNAPOLOGETIC PRECISION',
    subHeadline: 'Maintainers Worldwide Stand at Attention as Git Founder Reviews Patch Submissions',
    bioArticle: [
      'In a resounding declaration from his Oregon sanctuary, Linus Torvalds published the latest Linux kernel release candidate, praising memory management efficiency while dispensing sharp critiques for improper indentation.',
      'Torvalds, creator of both the Linux operating system and the Git version control system itself, has authored over 18,000 commits over three decades. His daily routine remains steadfast: review code, prune redundant branches, and maintain absolute integrity.',
      '"Talk is cheap. Show me the code," Torvalds reportedly stated during the morning patch review, underscoring the philosophy that has driven modern global computing infrastructure.'
    ],
    caption: 'Fig. 1 — Linus Torvalds presiding over kernel tree merges.',
    statsManifest: {
      totalRepos: 18,
      totalStars: 198000,
      totalFollowers: 225000,
      currentStreak: 365,
      totalCommitsYear: 4890,
      pullRequestsMerged: 12400,
    },
    contributionChart: [
      { day: 'Mon', commits: 85 },
      { day: 'Tue', commits: 92 },
      { day: 'Wed', commits: 110 },
      { day: 'Thu', commits: 88 },
      { day: 'Fri', commits: 95 },
      { day: 'Sat', commits: 40 },
      { day: 'Sun', commits: 60 },
    ],
    languages: [
      { rank: 1, name: 'C', share: 85, reposCount: 12, starsCount: 180000, status: 'LEADER' },
      { rank: 2, name: 'Shell / Make', share: 10, reposCount: 4, starsCount: 12000, status: 'STABLE' },
      { rank: 3, name: 'Assembly', share: 3, reposCount: 1, starsCount: 4000, status: 'STABLE' },
      { rank: 4, name: 'Perl', share: 2, reposCount: 1, starsCount: 2000, status: 'STABLE' },
    ],
    weatherActivity: {
      forecastSummary: 'CONSTANT GALE-FORCE WINDS OF CODE REVIEWS',
      peakHour: '7:00 AM – 4:00 PM',
      temperature: '98°F (KERNEL HEAT)',
      humidity: '10% (NO FLUFF)',
    },
    pullQuote: {
      quote: 'Bad programmers worry about the code. Good programmers worry about data structures.',
      author: 'Linus Torvalds',
      handwrittenNote: 'Keep it clean or don\'t bother submitting!',
    },
    classifieds: [
      {
        title: 'PATCH REVIEWERS NEEDED',
        description: 'Must possess sharp eye for memory leaks and zero tolerance for unnecessary abstractions.',
        contact: 'Mail: torvalds@linux-foundation.org',
      },
      {
        title: 'FOUNDATION MEETING',
        description: 'Annual gathering of kernel maintainers. Bring your finest black coffee.',
        contact: 'Portland Convention Center',
      },
    ],
    featureStory: {
      title: 'HOW GIT WAS BORN IN A SINGLE WEEKEND OF GENIUS',
      author: 'Historical Gazette',
      content: [
        'When existing version control software failed to meet the scale of Linux development in 2005, Torvalds spent 10 days writing the core of Git from scratch.',
        'Today, Git powers virtually every software endeavor on Earth, a testament to speed, DAG graph architecture, and raw cryptographic hashing.'
      ]
    },
    horoscope: {
      sign: 'CAPRICORN (THE COMMANDER)',
      prediction: 'Your directness will solve an architectural bottleneck today. Trust your instincts over consensus.',
      luckyTool: 'C Compiler'
    }
  },
  gaearon: {
    username: 'gaearon',
    fullName: 'Dan Abramov',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'MAY 2011',
    location: 'LONDON, UK',
    volumeNo: 'CCCXII',
    issueNo: '412,099',
    dateStr: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(),
    headline: 'REACT PIONEER UNVEILS MIND-BENDING STATE ARCHITECTURE',
    subHeadline: 'Redux Creator Demonstrates Hot Reloading Magic to Amazed Audiences',
    bioArticle: [
      'Dan Abramov, renowned co-creator of Redux and React core alumni, has once again captured the imagination of frontend web developers around the globe.',
      'Known for his lucid explanations and deep architectural essays on Overreacted.io, Abramov has contributed fundamental primitives that shape modern client-side software rendering.',
      '"Components are simply pure functions of state," Abramov reminded attendees at the London Web Symposium, demonstrating live time-travel debugging.'
    ],
    caption: 'Fig. 1 — Dan Abramov sketching state transition diagrams.',
    statsManifest: {
      totalRepos: 280,
      totalStars: 145000,
      totalFollowers: 82000,
      currentStreak: 84,
      totalCommitsYear: 1890,
      pullRequestsMerged: 3100,
    },
    contributionChart: [
      { day: 'Mon', commits: 22 },
      { day: 'Tue', commits: 35 },
      { day: 'Wed', commits: 48 },
      { day: 'Thu', commits: 50 },
      { day: 'Fri', commits: 41 },
      { day: 'Sat', commits: 15 },
      { day: 'Sun', commits: 30 },
    ],
    languages: [
      { rank: 1, name: 'JavaScript', share: 55, reposCount: 140, starsCount: 90000, status: 'LEADER' },
      { rank: 2, name: 'TypeScript', share: 35, reposCount: 90, starsCount: 45000, status: 'RISING' },
      { rank: 3, name: 'HTML/CSS', share: 10, reposCount: 50, starsCount: 10000, status: 'STABLE' },
    ],
    weatherActivity: {
      forecastSummary: 'BRIGHT SUNSHINE WITH OCCASIONAL HOOKS RAIN',
      peakHour: '2:00 PM – 9:00 PM',
      temperature: '76°F (OPTIMAL RE-RENDER)',
      humidity: '40% (CLEAR VIRTUAL DOM)',
    },
    pullQuote: {
      quote: 'UI is a function of state: UI = f(state).',
      author: 'Dan Abramov',
      handwrittenNote: 'Don\'t overthink your state location!',
    },
    classifieds: [
      {
        title: 'FRONTEND ESSAY WRITING',
        description: 'Deep dives into closures, mental models, and async rendering.',
        contact: 'Read overreacted.io',
      },
    ],
    featureStory: {
      title: 'THE ART OF TIME-TRAVEL DEBUGGING',
      author: 'Frontend Chronicle',
      content: [
        'Imagine rewinding the state of your application like a VHS tape. That vision revolutionized front-end debugging in 2015 and continues to inspire developer tools today.'
      ]
    },
    horoscope: {
      sign: 'GEMINI (THE COMMUNICATOR)',
      prediction: 'An elegant mental model will illuminate your complex problem before dusk.',
      luckyTool: 'React DevTools'
    }
  }
};

// Generator for arbitrary usernames typed by user
export function generateMockProfile(username: string): GitTimesProfile {
  const cleanName = username.trim().toLowerCase();
  if (MOCK_PROFILES[cleanName]) {
    return MOCK_PROFILES[cleanName];
  }

  const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  const hash = Array.from(cleanName).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const repos = 15 + (hash % 85);
  const stars = 120 + (hash * 37) % 4500;
  const followers = 45 + (hash * 19) % 1800;

  return {
    username: cleanName,
    fullName: `${formattedName} Developer`,
    avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${cleanName}`,
    joinedDate: 'MARCH 2018',
    location: 'GLOBAL NETWORK',
    volumeNo: 'LXXXIX',
    issueNo: `${(hash * 41) % 99999}`,
    dateStr: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(),
    headline: `${formattedName.toUpperCase()} SHIPS SPECTACULAR NEW OPEN-SOURCE PROJECT`,
    subHeadline: `Community Celebrates Outstanding GitHub Activity & Clean Code Architecture`,
    bioArticle: [
      `In a striking milestone recorded on GitHub, ${formattedName} has pushed a series of highly refined commits, demonstrating exceptional mastery in software design.`,
      `With over ${repos} active repositories and thousands of lines of pristine code written this season, colleagues praise ${formattedName} for relentless problem solving and collaborative open-source spirit.`,
      `"Working alongside ${formattedName} is a masterclass in clarity and algorithmic rigor," shared a fellow contributor. "Every pull request is accompanied by thorough tests and impeccable documentation."`
    ],
    caption: `Fig. 1 — ${formattedName} at the command line workstation.`,
    statsManifest: {
      totalRepos: repos,
      totalStars: stars,
      totalFollowers: followers,
      currentStreak: 14 + (hash % 60),
      totalCommitsYear: 450 + (hash % 2200),
      pullRequestsMerged: 42 + (hash % 300),
    },
    contributionChart: [
      { day: 'Mon', commits: 10 + (hash % 15) },
      { day: 'Tue', commits: 18 + (hash % 25) },
      { day: 'Wed', commits: 25 + (hash % 30) },
      { day: 'Thu', commits: 20 + (hash % 22) },
      { day: 'Fri', commits: 35 + (hash % 40) },
      { day: 'Sat', commits: 8 + (hash % 12) },
      { day: 'Sun', commits: 15 + (hash % 20) },
    ],
    languages: [
      { rank: 1, name: 'TypeScript', share: 45, reposCount: Math.floor(repos * 0.45), starsCount: Math.floor(stars * 0.5), status: 'LEADER' },
      { rank: 2, name: 'Python', share: 25, reposCount: Math.floor(repos * 0.25), starsCount: Math.floor(stars * 0.25), status: 'RISING' },
      { rank: 3, name: 'Rust', share: 18, reposCount: Math.floor(repos * 0.18), starsCount: Math.floor(stars * 0.15), status: 'CLIMBING' },
      { rank: 4, name: 'Go / Docker', share: 12, reposCount: Math.floor(repos * 0.12), starsCount: Math.floor(stars * 0.1), status: 'STABLE' },
    ],
    weatherActivity: {
      forecastSummary: 'WARM COMMITTING BREEZE WITH HIGH PRODUCTIVITY',
      peakHour: '8:00 PM – 1:00 AM',
      temperature: '82°F (ACTIVE FOCUS)',
      humidity: '65% (HIGH ENERGY)',
    },
    pullQuote: {
      quote: 'Simplicity is precondition for reliability.',
      author: 'Edsger W. Dijkstra',
      handwrittenNote: `Keep pushing forward, ${formattedName}!`,
    },
    classifieds: [
      {
        title: 'OPEN SOURCE COLLABORATION',
        description: `Looking for contributors to join ${formattedName}'s newest repository project.`,
        contact: `GitHub: @${cleanName}`,
      },
      {
        title: 'CODE REVIEW EXCHANGE',
        description: 'Will review your TypeScript types in exchange for coffee or Rust tips.',
        contact: `Telegraph: @${cleanName}_dev`,
      },
    ],
    featureStory: {
      title: `THE JOURNEY OF ${formattedName.toUpperCase()} IN THE OPEN SOURCE REALM`,
      author: 'By The Git Times Feature Desk',
      content: [
        `From the first 'git init' to managing multi-repository architectures, ${formattedName} represents the tireless dedication of modern digital craftsmen.`,
        `Through continuous iteration and community contributions, this developer continues to build the tools of tomorrow.`
      ]
    },
    horoscope: {
      sign: 'LIBRA (THE BALANCER)',
      prediction: 'Refactoring today will save hours of debugging tomorrow. Trust clean function signatures.',
      luckyTool: 'Git Rebase'
    }
  };
}
