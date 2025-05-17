#!/bin/bash

# Create Android SDK directory
mkdir -p ~/Android/Sdk

# Download Android SDK tools
wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
unzip commandlinetools-linux-9477386_latest.zip -d ~/Android/Sdk/
mkdir -p ~/Android/Sdk/cmdline-tools/latest
mv ~/Android/Sdk/cmdline-tools/* ~/Android/Sdk/cmdline-tools/latest/ 2>/dev/null || true

# Set environment variables
export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# Accept licenses and install required packages
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" "ndk;25.1.8937393"
