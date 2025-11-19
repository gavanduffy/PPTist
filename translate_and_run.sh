#!/bin/bash

set -e

# Function to print status messages
print_status() {
    echo "\033[1;34m[INFO] $1\033[0m"
}

# Install the googletrans library
print_status "Installing googletrans library..."
pip install googletrans==4.0.0-rc1

# Run the translation script
print_status "Running translation script..."
python translate_chinese_files.py --translate --replace --report chinese_report.json src

# Install npm dependencies
print_status "Installing npm dependencies..."
npm install

# Build the project
print_status "Building the project..."
npm run build

# Run the project
print_status "Running the project..."
npm run dev

print_status "Script completed successfully!"