import { useState } from 'react';
import { DeskScene } from './components/DeskScene';
import { AudioControls } from './components/AudioControls';
import { MOCK_PROFILES, generateMockProfile, type GitTimesProfile } from './data/mockProfiles';
import { fetchGitHubUserData } from './services/githubService';
import { generateNewspaperProfile } from './services/geminiService';
import { audioEngine } from './services/audioEngine';

export function App() {
  const [activeProfile, setActiveProfile] = useState<GitTimesProfile>({
    ...MOCK_PROFILES.octocat,
    hasPageTwo: true,
  });
  const [history, setHistory] = useState<GitTimesProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearchUsername = async (username: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playPaperRustle();

    try {
      // 1. Fetch real-time live data from GitHub REST API
      const rawGitHubData = await fetchGitHubUserData(username);

      // 2. Generate vintage 1920s newspaper copy via Gemini API + compute page count
      const newProfile = await generateNewspaperProfile(rawGitHubData);

      setHistory((prev) => [...prev, activeProfile]);
      setActiveProfile(newProfile);
      setIsLoading(false);
      audioEngine.playCarriageReturn();
    } catch (err: any) {
      console.warn('Real-time GitHub/Gemini fetch notice:', err?.message);
      
      // Fallback: If GitHub username search failed, generate mock fallback profile
      setTimeout(() => {
        setHistory((prev) => [...prev, activeProfile]);
        const fallback = generateMockProfile(username);
        setActiveProfile({ ...fallback, hasPageTwo: true });
        setIsLoading(false);
        audioEngine.playCarriageReturn();
      }, 1000);
    }
  };

  const handleBack = () => {
    audioEngine.playPaperRustle();
    if (history.length > 0) {
      const prevProfile = history[history.length - 1];
      setHistory((prev) => prev.slice(0, prev.length - 1));
      setActiveProfile(prevProfile);
    } else {
      setActiveProfile({ ...MOCK_PROFILES.octocat, hasPageTwo: true });
    }
  };

  return (
    <div className="relative min-h-screen bg-stone-950 font-body text-ink overflow-x-hidden">
      {/* Vintage Sound & Ambience Audio Controls */}
      <AudioControls />

      {/* Error Toast Notification if any */}
      {errorMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-red-950 text-red-200 border border-red-800 px-4 py-2 rounded-lg font-typewriter text-xs shadow-2xl animate-fadeIn">
          <span>⚠️ {errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-3 font-bold underline">Dismiss</button>
        </div>
      )}

      {/* 3D Desk Scene with Newspaper */}
      <DeskScene
        profile={activeProfile}
        onSearchUsername={handleSearchUsername}
        onBack={handleBack}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
