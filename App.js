import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import SplashScreen from "./screens/splash/SplashScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import HomeScreen from "./screens/home/HomeScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import EditProfileScreen from "./screens/profile/EditProfileScreen";
import ChatListScreen from "./screens/chat/ChatListScreen";
import ChatScreen from "./screens/chat/ChatScreen";
import MatchesScreen from "./screens/matches/MatchesScreen";
import SettingsScreen from "./screens/settings/SettingsScreen";
import FiltersScreen from "./screens/home/FiltersScreen";
import BottomNavigation from "./components/BottomNavigation";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [previousScreen, setPreviousScreen] = useState(null);
  const { theme, isDarkMode } = useTheme();

  // Splash screen timer
  React.useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("onboarding");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen("home");
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen("login");
  };

  const navigateTo = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (previousScreen) {
      setCurrentScreen(previousScreen);
      setPreviousScreen(null);
    }
  };

  const AppContainer = ({ children }) => (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {children}
    </View>
  );

  // Main screens that show bottom navigation
  const mainScreens = ["home", "matches", "chatList", "profile"];
  const showBottomNav = isAuthenticated && mainScreens.includes(currentScreen);

  // Render current screen
  switch (currentScreen) {
    case "splash":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <SplashScreen />
        </AppContainer>
      );

    case "onboarding":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <OnboardingScreen onGetStarted={() => navigateTo("login")} />
        </AppContainer>
      );

    case "login":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <LoginScreen
            onLogin={handleLogin}
            onSignup={() => navigateTo("signup")}
          />
        </AppContainer>
      );

    case "signup":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <SignupScreen
            onSignup={handleSignup}
            onLogin={() => navigateTo("login")}
          />
        </AppContainer>
      );

    case "home":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <View style={{ flex: 1 }}>
            <HomeScreen
              onProfile={() => navigateTo("profile")}
              onMatches={() => navigateTo("matches")}
              onChat={() => navigateTo("chatList")}
              onSettings={() => navigateTo("settings")}
            />
            {showBottomNav && (
              <BottomNavigation
                currentScreen={currentScreen}
                onNavigate={navigateTo}
              />
            )}
          </View>
        </AppContainer>
      );

    case "profile":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <View style={{ flex: 1 }}>
            <ProfileScreen
              onBack={() => navigateTo("home")}
              onSettings={() => navigateTo("settings")}
              onEdit={() => navigateTo("editProfile")}
            />
            {showBottomNav && (
              <BottomNavigation
                currentScreen={currentScreen}
                onNavigate={navigateTo}
              />
            )}
          </View>
        </AppContainer>
      );

    case "chatList":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <View style={{ flex: 1 }}>
            <ChatListScreen
              onBack={() => navigateTo("home")}
              onChatSelect={() => navigateTo("chat")}
            />
            {showBottomNav && (
              <BottomNavigation
                currentScreen={currentScreen}
                onNavigate={navigateTo}
              />
            )}
          </View>
        </AppContainer>
      );

    case "chat":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <ChatScreen onBack={() => navigateTo("chatList")} />
        </AppContainer>
      );

    case "matches":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <View style={{ flex: 1 }}>
            <MatchesScreen
              onBack={() => navigateTo("home")}
              onMatchSelect={() => navigateTo("profile")}
            />
            {showBottomNav && (
              <BottomNavigation
                currentScreen={currentScreen}
                onNavigate={navigateTo}
              />
            )}
          </View>
        </AppContainer>
      );

    case "editProfile":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <EditProfileScreen
            onBack={goBack}
            onSave={(data) => {
              console.log("Profile saved:", data);
              goBack();
            }}
          />
        </AppContainer>
      );

    case "filters":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <FiltersScreen
            onBack={goBack}
            onApply={(filters) => {
              console.log("Filters applied:", filters);
              goBack();
            }}
          />
        </AppContainer>
      );

    case "settings":
      return (
        <AppContainer>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <SettingsScreen
            onLogout={handleLogout}
            onBack={() => navigateTo("home")}
          />
        </AppContainer>
      );

    default:
      return (
        <AppContainer>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Screen not found</Text>
          </View>
        </AppContainer>
      );
  }
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
