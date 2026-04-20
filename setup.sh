#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Portfolio Setup Guide ===${NC}\n"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install it first.${NC}"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}\n"

# Backend setup
echo -e "${YELLOW}Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${RED}.env file not found in backend/${NC}"
    echo "Creating .env from template..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Update backend/.env with your MongoDB URI${NC}"
fi

echo "Installing backend dependencies..."
npm install

echo -e "${GREEN}✓ Backend setup complete!${NC}\n"

# Frontend setup
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd ../frontend

if [ ! -f .env ]; then
    echo "Creating .env from template..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete!${NC}\n"

# Summary
echo -e "${GREEN}=== Setup Complete! ===${NC}\n"
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "1. Update MongoDB connection string:"
echo "   - Edit backend/.env"
echo "   - Add your MongoDB Atlas URI"
echo ""
echo "2. Start the backend (Terminal 1):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the frontend (Terminal 2):"
echo "   cd frontend && npm start"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo -e "${YELLOW}Need help?${NC}"
echo "- Check README.md for full documentation"
echo "- Check DEPLOYMENT.md for deployment instructions"
