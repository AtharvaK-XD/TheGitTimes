import { useState } from 'react';
import { DeskScene } from './components/DeskScene';
import { AudioControls } from './components/AudioControls';
import { MOCK_PROFILES, generateMockProfile, type GitTimesProfile } from './data/mockProfiles';
import { audioEngine } from './services/audioEngine';

export function App() {
  const [activeProfile, setActiveProfile] = useState<GitTimesProfile>(MOCK_PROFILES.octocat);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchUsername = (username: string) => {
    setIsLoading(true);
    audioEngine.playPaperRustle();

    // Simulate vintage typewriter typesetting delay
    setTimeout(() => {
      const nextProfile = generateMockProfile(username);
      setActiveProfile(nextProfile);
      setIsLoading(false);
      audioEngine.playCarriageReturn();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-stone-950 font-body text-ink overflow-x-hidden">
      {/* Vintage Sound & Ambience Audio Controls */}
      <AudioControls />

      {/* 3D Desk Scene with Newspaper */}
      <DeskScene
        profile={activeProfile}
        onSearchUsername={handleSearchUsername}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
