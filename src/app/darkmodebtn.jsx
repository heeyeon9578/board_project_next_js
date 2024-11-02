// app/components/DarkModeBtn.tsx
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import DarkModeIcon from './images/dark-mode-toggle-icon.png';  // 다크 모드 아이콘 경로
import LightModeIcon from './images/light-mode-toggle-icon.png'; // 라이트 모드 아이콘 경로


export default function DarkModeBtn({ mode } ) {
  const [isDarkMode, setIsDarkMode] = useState(mode);

  useEffect(() => {
    // 모드 변경 시 상태 업데이트
    setIsDarkMode(mode);
  }, [mode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // 쿠키에 새로운 모드 설정
    Cookies.set('theme', newMode ? 'dark' : 'light', { expires: 7 });

    // HTML body에 클래스 적용
    document.body.className = newMode ? 'dark' : 'light';
  };

  return (
    <button onClick={toggleDarkMode}>
      <Image
        src={isDarkMode ? DarkModeIcon : LightModeIcon}
        alt="Dark Mode Toggle"
        width={30}
        height={30}
      />
    </button>
  );
}
