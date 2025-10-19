/**
 * Signup Flow Configuration
 *
 * This file defines the steps in the signup flow.
 * You can easily add, remove, or reorder steps by modifying this array.
 *
 * Each step should have:
 * - id: unique identifier
 * - component: the screen component to render
 * - title: screen title (optional, can be defined in component)
 * - required: whether this step is required
 * - validate: function to validate step data before proceeding (optional)
 */

// Import all signup screens
import NameScreen from "./screens/NameScreen";
import BirthdayScreen from "./screens/BirthdayScreen";
import GenderScreen from "./screens/GenderScreen";
import PhotosScreen from "./screens/PhotosScreen";
import InterestsScreen from "./screens/InterestsScreen";
import AboutScreen from "./screens/AboutScreen";
import LocationScreen from "./screens/LocationScreen";
import PreferencesScreen from "./screens/PreferencesScreen";

export const signupSteps = [
  {
    id: "name",
    component: NameScreen,
    title: "What's your first name?",
    required: true,
    validate: (data) => {
      return data.name && data.name.trim().length >= 2;
    },
  },
  {
    id: "birthday",
    component: BirthdayScreen,
    title: "Your b-day?",
    required: true,
    validate: (data) => {
      if (!data.birthday) return false;
      const age = calculateAge(data.birthday);
      return age >= 18 && age <= 100;
    },
  },
  {
    id: "gender",
    component: GenderScreen,
    title: "What's your gender?",
    required: true,
    validate: (data) => {
      return data.gender && ["Woman", "Man", "Other"].includes(data.gender);
    },
  },
  {
    id: "photos",
    component: PhotosScreen,
    title: "Add your photos",
    required: true,
    validate: (data) => {
      return data.photos && data.photos.length >= 2;
    },
  },
  {
    id: "location",
    component: LocationScreen,
    title: "Where are you?",
    required: true,
    validate: (data) => {
      return data.location && data.location.city;
    },
  },
  {
    id: "interests",
    component: InterestsScreen,
    title: "Your interests",
    required: false,
    validate: (data) => {
      return true; // Optional step, always valid
    },
  },
  {
    id: "about",
    component: AboutScreen,
    title: "About you",
    required: false,
    validate: (data) => {
      return true; // Optional step, always valid
    },
  },
  {
    id: "preferences",
    component: PreferencesScreen,
    title: "Your preferences",
    required: false,
    validate: (data) => {
      return true; // Optional step, always valid
    },
  },
];

// Helper function to calculate age
function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export default signupSteps;
