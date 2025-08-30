@echo off
echo 🚀 Building GH Beauty Hub for Netlify deployment...
echo.

echo 📦 Installing dependencies...
npm install

echo 🔨 Building project...
npm run build

echo 📁 Copying logo files to dist...
copy public\*.svg dist\

echo ✅ Build complete! Your dist folder is ready for Netlify.
echo.
echo 🌐 To deploy:
echo 1. Go to netlify.com
echo 2. Drag the 'dist' folder to deploy
echo 3. Or connect your GitHub repo for auto-deployment
echo.
echo 📁 Your dist folder contains:
dir dist
echo.
pause
