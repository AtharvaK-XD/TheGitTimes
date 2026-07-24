import { useState } from 'react';
import { DeskScene } from './components/DeskScene';
import { LandingPage } from './components/LandingPage';
import { AudioControls } from './components/AudioControls';
import { MOCK_PROFILES, type GitTimesProfile } from './data/mockProfiles';
import { fetchGitHubUserData } from './services/githubService';
import { generateNewspaperProfile } from './services/geminiService';
import { audioEngine } from './services/audioEngine';

export function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [activeProfile, setActiveProfile] = useState<GitTimesProfile>({
    ...MOCK_PROFILES.octocat,
    hasPageTwo: true,
  });
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

      setActiveProfile(newProfile);
      setHasSearched(true);
      setIsLoading(false);
      audioEngine.playCarriageReturn();
    } catch (err: any) {
      console.warn('GitHub search error:', err?.message);
      setIsLoading(false);
      // DO NOT generate fake mock profiles — show exact error message that profile does not exist!
      setErrorMessage(err?.message || `GitHub profile "@${username}" does not exist. Please check the spelling.`);
    }
  };

  const handleBack = () => {
    audioEngine.playPaperRustle();
    setErrorMessage(null);
    setHasSearched(false);
  };

  return (
    <div className="relative min-h-screen bg-stone-950 font-body text-ink overflow-x-hidden">
      {/* Vintage Sound & Ambience Audio Controls */}
      <AudioControls />

      {/* Conditionally render Landing Page or 3D Desk Scene */}
      {!hasSearched ? (
        <LandingPage
          onSearch={handleSearchUsername}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      ) : (
        <DeskScene
          profile={activeProfile}
          onSearchUsername={handleSearchUsername}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
