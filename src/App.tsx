/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NetworkBar } from './components/NetworkBar';
import { Header } from './components/Header';
import { TalkingManTutor } from './components/TalkingManTutor';
import { GrammarSection } from './components/GrammarSection';
import { VocabularySection } from './components/VocabularySection';
import { SentenceCoachSection } from './components/SentenceCoachSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { Language, StudentLevel } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel>('beginner');
  const [activeTab, setActiveTab] = useState<'grammar' | 'vocab' | 'coach'>('coach');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Sync document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 1. Network Bar linking to previous platform */}
      <NetworkBar 
        currentLang={currentLang} 
        onToggleLang={handleToggleLang} 
      />

      {/* 2. Platform Identity, Hero, Levels, and Section Navigation */}
      <Header
        currentLang={currentLang}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Educational Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 3. The Dedicated Talking Male Tutor ("الرجل يتكلم") */}
        <TalkingManTutor
          currentLang={currentLang}
          selectedLevel={selectedLevel}
          activeTab={activeTab}
        />

        {activeTab === 'grammar' && (
          <GrammarSection 
            currentLang={currentLang} 
            selectedLevel={selectedLevel} 
          />
        )}

        {activeTab === 'vocab' && (
          <VocabularySection 
            currentLang={currentLang} 
            selectedLevel={selectedLevel} 
          />
        )}

        {activeTab === 'coach' && (
          <SentenceCoachSection 
            currentLang={currentLang} 
          />
        )}
      </main>

      {/* 4. Footer & Privacy Section with Founder Taha Setri and 2026 Copyright */}
      <Footer 
        currentLang={currentLang} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
      />

      {/* Privacy Policy & Cookie Compliance Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        currentLang={currentLang}
      />

    </div>
  );
}

