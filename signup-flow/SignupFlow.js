import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import signupSteps from "./signupConfig";
import ProgressBar from "../components/ProgressBar";
import PrimaryButton from "../components/PrimaryButton";
import SuccessModal from "../components/SuccessModal";

/**
 * Main SignupFlow Container
 * Manages navigation between signup steps and data collection
 */
export default function SignupFlow({ onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userData, setUserData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const currentStep = signupSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === signupSteps.length - 1;

  // Get the step component
  const StepComponent = currentStep.component;

  // Handle data changes from current step
  const handleDataChange = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    setError("");
  };

  // Navigate to next step
  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep.validate && !currentStep.validate(userData)) {
      setError("Please complete all required fields");
      return;
    }

    if (isLastStep) {
      // Show success modal
      setShowSuccess(true);
    } else {
      // Move to next step
      setCurrentStepIndex(currentStepIndex + 1);
      setError("");
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
      setError("");
    }
  };

  // Handle signup completion
  const handleComplete = () => {
    setShowSuccess(false);
    // Call the onComplete callback with user data
    if (onComplete) {
      onComplete(userData);
    }
  };

  // Check if current step can proceed
  const canProceed = () => {
    if (!currentStep.required) {
      return true; // Optional steps can always be skipped
    }
    return currentStep.validate ? currentStep.validate(userData) : true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with back button and progress */}
      <View style={styles.header}>
        {!isFirstStep && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <ProgressBar current={currentStepIndex} total={signupSteps.length} />
      </View>

      {/* Current step content */}
      <View style={styles.stepContainer}>
        <StepComponent data={userData} onDataChange={handleDataChange} />
      </View>

      {/* Error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Footer with action buttons */}
      <View style={styles.footer}>
        <PrimaryButton
          title={isLastStep ? "Complete" : "Next"}
          onPress={handleNext}
          style={[styles.nextButton, !canProceed() && styles.buttonDisabled]}
        />
        {!currentStep.required && (
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccess}
        onClose={handleComplete}
        title="Welcome to Dyno!"
        message="There's a lot out there to discover. But let's get your profile set up first."
        buttonText="Let's go"
        emoji="👋"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 24,
    top: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 32,
    color: "#A3A3A3",
    fontWeight: "bold",
  },
  stepContainer: {
    flex: 1,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
  },
  nextButton: {
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  skipText: {
    color: "#A3A3A3",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#FF5858",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 24,
    marginBottom: 8,
  },
});
