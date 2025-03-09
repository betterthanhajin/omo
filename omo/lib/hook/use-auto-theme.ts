"use client";

import { useState, useEffect } from "react";

// 외부 환경(시간, 날씨, 계절)에 따른 테마 자동 변경 훅
export function useAutoThemeSwitching(
  initialEnabled = false,
  initialMode = "time", // 'time', 'weather', 'season'
  onThemeChange: (theme: string) => void
) {
  const [autoSwitchEnabled, setAutoSwitchEnabled] = useState(initialEnabled);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [currentInfo, setCurrentInfo] = useState<any>(null);

  // 모드 변경 핸들러
  const changeMode = (newMode: string) => {
    if (newMode === "weather" && !weatherData && !userLocation) {
      getUserLocation();
    }
    setCurrentMode(newMode);
  };

  // 날씨에 따른 테마 리턴
  const getThemeByWeather = (condition: string): string => {
    const weatherCondition = condition.toLowerCase();

    switch (weatherCondition) {
      case "clear":
        return "sky";
      case "clouds":
        return "modern";
      case "rain":
      case "drizzle":
      case "shower rain":
        return "ocean";
      case "thunderstorm":
        return "kitsch";
      case "snow":
        return "watercolor";
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
        return "retro";
      default:
        return "modern";
    }
  };

  // 시간에 따른 테마 설정
  const setThemeByTime = () => {
    const hour = new Date().getHours();
    let theme = "modern";
    let period = "";

    if (hour >= 5 && hour < 9) {
      // 이른 아침 (5-9시): 하늘 테마
      theme = "sky";
      period = "아침";
    } else if (hour >= 9 && hour < 13) {
      // 오전 (9-13시): 모던 테마
      theme = "modern";
      period = "오전";
    } else if (hour >= 13 && hour < 17) {
      // 오후 (13-17시): 바다 테마
      theme = "ocean";
      period = "오후";
    } else if (hour >= 17 && hour < 20) {
      // 저녁 (17-20시): 수채화 테마
      theme = "watercolor";
      period = "저녁";
    } else if (hour >= 20 && hour < 23) {
      // 밤 (20-23시): 레트로 테마
      theme = "retro";
      period = "밤";
    } else {
      // 심야 (23-5시): 키치 테마
      theme = "kitsch";
      period = "심야";
    }

    setCurrentInfo({ period, theme });
    onThemeChange(theme);
  };

  // 사용자 위치 정보 가져오기
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("이 브라우저는 위치 정보를 지원하지 않습니다");
      setCurrentMode("time"); // 위치 정보 지원 안할 시 시간 기반으로 폴백
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다:", error);
        setCurrentMode("time"); // 위치 정보 실패 시 시간 기반으로 폴백
      }
    );
  };

  // 날씨 정보 가져오기 (OpenWeatherMap API 이용)
  const fetchWeather = async (lat: number, lon: number) => {
    // 실제 구현 시 API 키는 환경 변수로 보관해야 합니다
    // API 키가 없는 경우 mock 데이터 사용 (테스트용)
    const weatherTypes = [
      "Clear",
      "Clouds",
      "Rain",
      "Thunderstorm",
      "Snow",
      "Mist",
    ];
    const mockWeather = {
      weather: [
        { main: weatherTypes[Math.floor(Math.random() * weatherTypes.length)] },
      ],
      main: { temp: Math.floor(Math.random() * 30) },
    };

    try {
      // API 키를 입력해야 실제 날씨 데이터를 가져올 수 있습니다
      // const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      // const response = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      // );
      //
      // if (response.ok) {
      //   const data = await response.json();
      //   setWeatherData(data);
      //   return data;
      // }

      // 테스트용 mock 데이터 설정
      setWeatherData(mockWeather);
      return mockWeather;
    } catch (error) {
      console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
      setCurrentMode("time"); // 날씨 정보 실패 시 시간 기반으로 폴백
      return null;
    }
  };

  // 날씨에 따른 테마 설정
  const setThemeByWeather = (data: any) => {
    if (!data || !data.weather || !data.weather[0]) return;

    const condition = data.weather[0].main;
    const theme = getThemeByWeather(condition);

    setCurrentInfo({
      condition: condition,
      temp: data.main.temp,
      theme: theme,
    });

    onThemeChange(theme);
  };

  // 계절에 따른 테마 설정
  const setThemeBySeason = () => {
    const month = new Date().getMonth() + 1; // getMonth()는 0-11 반환
    let season = "";
    let theme = "";

    if (month >= 3 && month <= 5) {
      // 봄 (3-5월): 수채화 테마
      season = "봄";
      theme = "watercolor";
    } else if (month >= 6 && month <= 8) {
      // 여름 (6-8월): 바다 테마
      season = "여름";
      theme = "ocean";
    } else if (month >= 9 && month <= 11) {
      // 가을 (9-11월): 키치 테마
      season = "가을";
      theme = "kitsch";
    } else {
      // 겨울 (12-2월): 하늘 테마
      season = "겨울";
      theme = "sky";
    }

    setCurrentInfo({ season, theme });
    onThemeChange(theme);
  };

  // 자동 전환 활성화/비활성화 토글
  const toggleAutoSwitch = () => {
    setAutoSwitchEnabled(!autoSwitchEnabled);
  };

  // 자동 전환 효과
  useEffect(() => {
    if (!autoSwitchEnabled) return;

    // 초기 테마 설정
    if (currentMode === "time") {
      setThemeByTime();
    } else if (currentMode === "season") {
      setThemeBySeason();
    } else if (currentMode === "weather" && !userLocation) {
      getUserLocation();
    }

    // 시간 기반 테마 설정 - 매 시간마다 업데이트
    let timeInterval: NodeJS.Timeout | null = null;
    if (currentMode === "time") {
      // 현재 '분'에 따라 다음 시간 변경 시점까지 대기
      const now = new Date();
      const minutesToNextHour = 60 - now.getMinutes();
      const msToNextHour = minutesToNextHour * 60 * 1000;

      // 다음 시간 변경 시점에 맞춰 타이머 설정
      const timeoutId = setTimeout(() => {
        setThemeByTime();

        // 이후부터는 1시간마다 체크
        timeInterval = setInterval(setThemeByTime, 60 * 60 * 1000);
      }, msToNextHour);

      return () => {
        clearTimeout(timeoutId);
        if (timeInterval) clearInterval(timeInterval);
      };
    }

    // 계절 기반 테마 설정 - 매일 자정에 체크
    if (currentMode === "season") {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const msUntilMidnight = tomorrow.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        setThemeBySeason();

        // 이후 매일 자정마다 체크
        timeInterval = setInterval(setThemeBySeason, 24 * 60 * 60 * 1000);
      }, msUntilMidnight);

      return () => {
        clearTimeout(timeoutId);
        if (timeInterval) clearInterval(timeInterval);
      };
    }
  }, [autoSwitchEnabled, currentMode]);

  // 위치 정보 변경 시 날씨 정보 가져오기
  useEffect(() => {
    if (currentMode === "weather" && userLocation && autoSwitchEnabled) {
      fetchWeather(userLocation.lat, userLocation.lon).then((data) => {
        if (data) {
          setThemeByWeather(data);
        }
      });

      // 날씨 정보 3시간마다 갱신
      const weatherInterval = setInterval(() => {
        fetchWeather(userLocation.lat, userLocation.lon).then((data) => {
          if (data) {
            setThemeByWeather(data);
          }
        });
      }, 3 * 60 * 60 * 1000);

      return () => clearInterval(weatherInterval);
    }
  }, [userLocation, currentMode, autoSwitchEnabled]);

  // 현재 시간대, 날씨, 계절 상태 정보 조회
  const getCurrentInfo = () => {
    return currentInfo;
  };

  return {
    autoSwitchEnabled,
    currentMode,
    weatherData,
    currentInfo,
    toggleAutoSwitch,
    changeMode,
    getCurrentInfo,
  };
}
