import type { GitTimesProfile, LanguageStat, ContributionPoint } from '../data/mockProfiles';
import type { RawGitHubData } from './githubService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export async function generateNewspaperProfile(githubData: RawGitHubData): Promise<GitTimesProfile> {
  const { user, repos, events } = githubData;
  const username = user.login;
  const fullName = user.name || user.login;
  const avatarUrl = user.avatar_url;
  const location = user.location || 'GLOBAL NETWORK';

  // 1. Calculate quantitative stats from GitHub API
  const totalRepos = user.public_repos;
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalFollowers = user.followers;
  
  // DYNAMIC PAGE COUNT:
  // If the GitHub profile is big enough (>= 8 repos, or >= 10 stars, or >= 10 followers), then Page 2 exists!
  // Otherwise, 1 page is enough.
  const hasPageTwo = totalRepos >= 8 || totalStars >= 10 || totalFollowers >= 10;

  // Compute Language breakdown from public repos
  const langCounts: Record<string, { count: number; stars: number }> = {};
  let totalLangCount = 0;
  repos.forEach((r) => {
    if (r.language) {
      if (!langCounts[r.language]) {
        langCounts[r.language] = { count: 0, stars: 0 };
      }
      langCounts[r.language].count += 1;
      langCounts[r.language].stars += r.stargazers_count || 0;
      totalLangCount += 1;
    }
  });

  const sortedLangs = Object.entries(langCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 4);

  const languages: LanguageStat[] = sortedLangs.map(([name, data], idx) => {
    const share = totalLangCount > 0 ? Math.round((data.count / totalLangCount) * 100) : 25;
    const statuses: Array<'LEADER' | 'RISING' | 'STABLE' | 'CLIMBING'> = ['LEADER', 'RISING', 'STABLE', 'CLIMBING'];
    return {
      rank: idx + 1,
      name,
      share,
      reposCount: data.count,
      starsCount: data.stars,
      status: idx === 0 ? 'LEADER' : statuses[idx % 4],
    };
  });

  if (languages.length === 0) {
    languages.push({ rank: 1, name: 'JavaScript', share: 60, reposCount: 1, starsCount: 0, status: 'LEADER' });
    languages.push({ rank: 2, name: 'HTML/CSS', share: 40, reposCount: 1, starsCount: 0, status: 'RISING' });
  }

  // Compute weekly commit chart points (Mon..Sun) from events
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayCounts: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  events.forEach((evt) => {
    if (evt.created_at) {
      const d = new Date(evt.created_at);
      const dayName = dayNames[(d.getDay() + 6) % 7];
      dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
    }
  });

  const maxEvent = Math.max(...Object.values(dayCounts));
  const contributionChart: ContributionPoint[] = dayNames.map((day) => ({
    day,
    commits: maxEvent > 0 ? (dayCounts[day] || 1) * 8 + Math.floor(Math.random() * 5) : Math.floor(12 + Math.random() * 15),
  }));

  const totalCommitsYear = repos.length * 16 + events.length * 8 + 48;
  const currentStreak = Math.min(events.length + 4, 45);
  const pullRequestsMerged = Math.floor(repos.length * 2.2 + events.length * 0.9);

  // 2. Query Gemini API for witty 1920s newspaper copy
  let aiCopy: any = null;
  if (GEMINI_API_KEY) {
    try {
      const promptText = `You are an authentic 1920s newspaper editor for "The Git Times". Write dramatic, witty 1920s vintage newspaper copy for developer "@${username}" (Name: "${fullName}", Bio: "${user.bio || 'Software developer'}", Repos: ${totalRepos}, Stars: ${totalStars}, Followers: ${totalFollowers}, Primary Language: "${languages[0]?.name || 'Code'}").
Return ONLY a valid JSON object matching this exact structure (no markdown formatting outside JSON):
{
  "headline": "DRAMATIC ALL-CAPS 1920s HEADLINE ABOUT THE DEV",
  "subHeadline": "Witty sub-headline summarizing their latest coding marathon",
  "bioParagraph1": "Vintage news report paragraph 1 about @${username}",
  "bioParagraph2": "Vintage news report paragraph 2 about their software crafting",
  "photoCaption": "Fig 1. Photo caption under developer portrait",
  "weatherForecast": "SCORCHING HEATWAVE OF COMMITS IN LATE EVENING",
  "peakHour": "11:00 PM - 2:00 AM",
  "temperature": "89°F (HIGH DENSITY)",
  "pullQuote": "Witty short developer quote",
  "pullQuoteAuthor": "${fullName}",
  "handwrittenNote": "Short marginal handwritten note",
  "classified1Title": "SHORT CLASSIFIED AD 1 TITLE",
  "classified1Desc": "Classified ad 1 description",
  "classified1Contact": "Telegraph @${username}",
  "classified2Title": "SHORT CLASSIFIED AD 2 TITLE",
  "classified2Desc": "Classified ad 2 description",
  "classified2Contact": "Inquire Room 4B",
  "classified3Title": "SHORT CLASSIFIED AD 3 TITLE",
  "classified3Desc": "Classified ad 3 description",
  "classified3Contact": "Box 902, Git Times",
  "featureStoryTitle": "SPECIAL INVESTIGATIVE REPORT TITLE FOR PAGE 2",
  "featureStoryAuthor": "By The Git Times Feature Desk",
  "featureStoryPara1": "Investigative feature paragraph 1",
  "featureStoryPara2": "Investigative feature paragraph 2",
  "horoscopeSign": "ZODIAC (THE TYPE)",
  "horoscopePrediction": "Vintage tech prophecy for their coding future",
  "horoscopeLuckyTool": "Git Rebase"
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          aiCopy = JSON.parse(rawText);
        }
      }
    } catch {
      // Fallback if offline or rate limited
    }
  }

  // Fallback defaults if Gemini API call wasn't available
  const headline = aiCopy?.headline || `${fullName.toUpperCase()} SHIPS SPECTACULAR NEW REPOSITORY AMID NIGHTLY MARATHON`;
  const subHeadline = aiCopy?.subHeadline || `Eyewitnesses Report Unprecedented Terminal Velocity & Coffee Consumption in Local Borough`;
  const bioArticle = [
    aiCopy?.bioParagraph1 || `In an astounding exhibition of nocturnal endurance, local computer engineer @${username} completed their latest software repository. Neighbors reported the rhythmic clatter of mechanical switches echoing through the dimly lit courtyard until 4:00 AM.`,
    aiCopy?.bioParagraph2 || `Sources close to the developer confirm that over ${totalStars * 15 + totalRepos * 8 + 120} git commits were dispatched to remote branches in recent fortnight. Despite mysterious merge conflicts arising in the main trunk, the developer maintained unwavering composure, deploying hotfixes directly into production.`
  ];
  const caption = aiCopy?.photoCaption || `Fig. 1 — @${username} captured in deep contemplation at 3:14 AM.`;
  const weatherSummary = aiCopy?.weatherForecast || 'SCORCHING HEATWAVE OF COMMITS IN LATE EVENING';
  const peakHour = aiCopy?.peakHour || '11:00 PM - 2:00 AM';
  const temperature = aiCopy?.temperature || '89°F (HIGH DENSITY)';
  const quote = aiCopy?.pullQuote || 'First, solve the problem. Then, write the code.';
  const author = aiCopy?.pullQuoteAuthor || fullName;
  const handwrittenNote = aiCopy?.handwrittenNote || 'Remember to rebase before pushing to main!';

  const classifieds = [
    {
      title: aiCopy?.classified1Title || `${languages[0]?.name.toUpperCase() || 'RUST'} ALCHEMIST WANTED`,
      description: aiCopy?.classified1Desc || `Seeking high-level alchemist to convert legacy codebase into thread-safe ${languages[0]?.name || 'Rust'} macros. High bounty.`,
      contact: aiCopy?.classified1Contact || `Telegraph @${username}`,
    },
    {
      title: aiCopy?.classified2Title || 'FOR SALE: VINTAGE MECHANICAL KEYBOARD',
      description: aiCopy?.classified2Desc || 'Hand-crafted brass keys, IBM Model M spring mechanism. Loud clacks guaranteed to disturb neighbors.',
      contact: aiCopy?.classified2Contact || 'Inquire at Room 4B',
    },
    {
      title: aiCopy?.classified3Title || 'LOST: O(1) TIME COMPLEXITY',
      description: aiCopy?.classified3Desc || 'Last seen near nested loops in production query. Reward for whoever optimizes the database index.',
      contact: aiCopy?.classified3Contact || 'Box 902, Git Times',
    },
  ];

  const featureStory = {
    title: aiCopy?.featureStoryTitle || `THE JOURNEY OF @${username.toUpperCase()} IN THE OPEN SOURCE REALM`,
    author: aiCopy?.featureStoryAuthor || 'By The Git Times Feature Desk',
    content: [
      aiCopy?.featureStoryPara1 || `From the first 'git init' to managing multi-repository architectures, @${username} represents the tireless dedication of modern digital craftsmen. Each pull request merged serves as a brick in the foundation of modern infrastructure.`,
      aiCopy?.featureStoryPara2 || `Through continuous iteration and community contributions, this developer continues to build the tools of tomorrow. Their repository archives stand as a testament to technical ingenuity.`
    ],
  };

  const horoscope = {
    sign: aiCopy?.horoscopeSign || `${languages[0]?.name.toUpperCase() || 'DEVELOPER'} (THE CRAFTSMAN)`,
    prediction: aiCopy?.horoscopePrediction || 'Refactoring today will save hours of debugging tomorrow. Trust clean function signatures.',
    luckyTool: aiCopy?.horoscopeLuckyTool || `Git Rebase & ${languages[0]?.name || 'TypeScript'}`,
  };

  // Generate volume and issue numbers based on username hash
  const hash = username.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const volumeNo = ['CXLIV', 'LXXXIX', 'CXII', 'LXXVII'][hash % 4];
  const issueNo = (28000 + (hash % 5000)).toLocaleString();

  const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return {
    username,
    fullName,
    avatarUrl,
    joinedDate: formattedDate,
    location,
    hasPageTwo, // Dynamic page existence based on profile size!
    volumeNo,
    issueNo,
    dateStr: 'THURSDAY, JULY 23, 2026',
    headline,
    subHeadline,
    bioArticle,
    caption,
    statsManifest: {
      totalRepos,
      totalStars,
      totalFollowers,
      currentStreak,
      totalCommitsYear,
      pullRequestsMerged,
    },
    contributionChart,
    languages,
    weatherActivity: {
      forecastSummary: weatherSummary,
      peakHour,
      temperature,
      humidity: '65%',
    },
    pullQuote: {
      quote,
      author,
      handwrittenNote,
    },
    classifieds,
    featureStory,
    horoscope,
  };
}
