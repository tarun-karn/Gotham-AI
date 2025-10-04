/**
 * Video Optimization Script
 * 
 * This script generates optimized, lower-quality versions of videos
 * for users with slower internet connections.
 * 
 * To use this script:
 * 1. Install ffmpeg: https://ffmpeg.org/download.html
 * 2. Run: node scripts/optimize-videos.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Video optimization configurations
const videoConfigs = [
  {
    name: 'hero-1',
    input: 'public/videos/hero-1.mp4',
    outputLow: 'public/videos/hero-1-low.mp4',
    outputMedium: 'public/videos/hero-1-medium.mp4'
  },
  {
    name: 'hero-2',
    input: 'public/videos/hero-2.mp4',
    outputLow: 'public/videos/hero-2-low.mp4',
    outputMedium: 'public/videos/hero-2-medium.mp4'
  },
  {
    name: 'hero-3',
    input: 'public/videos/hero-3.mp4',
    outputLow: 'public/videos/hero-3-low.mp4',
    outputMedium: 'public/videos/hero-3-medium.mp4'
  },
  {
    name: 'hero-4',
    input: 'public/videos/hero-4.mp4',
    outputLow: 'public/videos/hero-4-low.mp4',
    outputMedium: 'public/videos/hero-4-medium.mp4'
  }
];

// Optimization commands
const optimizationCommands = {
  // Low quality: 480p, 500kbps
  low: (input, output) => `ffmpeg -i ${input} -vf scale=854:480 -b:v 500k -bufsize 500k -maxrate 500k -r 24 ${output}`,
  
  // Medium quality: 720p, 1500kbps
  medium: (input, output) => `ffmpeg -i ${input} -vf scale=1280:720 -b:v 1500k -bufsize 1500k -maxrate 1500k -r 24 ${output}`
};

// Check if ffmpeg is installed
function checkFFmpeg() {
  return new Promise((resolve, reject) => {
    exec('ffmpeg -version', (error) => {
      if (error) {
        reject(new Error('FFmpeg is not installed or not in PATH. Please install FFmpeg: https://ffmpeg.org/download.html'));
      } else {
        resolve();
      }
    });
  });
}

// Optimize a single video
function optimizeVideo(config) {
  return new Promise((resolve, reject) => {
    console.log(`Optimizing ${config.name}...`);
    
    // Create low quality version
    const lowCommand = optimizationCommands.low(config.input, config.outputLow);
    console.log(`Executing: ${lowCommand}`);
    
    exec(lowCommand, (error) => {
      if (error) {
        console.error(`Error creating low quality version of ${config.name}:`, error);
        reject(error);
        return;
      }
      
      console.log(`Low quality version created: ${config.outputLow}`);
      
      // Create medium quality version
      const mediumCommand = optimizationCommands.medium(config.input, config.outputMedium);
      console.log(`Executing: ${mediumCommand}`);
      
      exec(mediumCommand, (error) => {
        if (error) {
          console.error(`Error creating medium quality version of ${config.name}:`, error);
          reject(error);
          return;
        }
        
        console.log(`Medium quality version created: ${config.outputMedium}`);
        resolve();
      });
    });
  });
}

// Main function
async function main() {
  try {
    // Check if ffmpeg is available
    await checkFFmpeg();
    console.log('FFmpeg found. Starting video optimization...\n');
    
    // Optimize all videos
    for (const config of videoConfigs) {
      // Check if input file exists
      if (!fs.existsSync(config.input)) {
        console.warn(`Input file not found: ${config.input}. Skipping...`);
        continue;
      }
      
      // Check if output files already exist
      if (fs.existsSync(config.outputLow) && fs.existsSync(config.outputMedium)) {
        console.log(`${config.name}: Optimized versions already exist. Skipping...\n`);
        continue;
      }
      
      try {
        await optimizeVideo(config);
        console.log(`${config.name}: Optimization complete!\n`);
      } catch (error) {
        console.error(`Failed to optimize ${config.name}:`, error.message);
      }
    }
    
    console.log('Video optimization process completed!');
    console.log('\nTo use the optimized videos in your application:');
    console.log('1. Update the Hero.jsx component to use different quality versions based on network speed');
    console.log('2. The AdaptiveVideo component is already set up to handle this');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { optimizationCommands, videoConfigs };