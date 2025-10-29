# Use Node.js 22 LTS alpine for smaller size
FROM node:22-alpine

# Install only essential packages
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

# Copy Next.js build output
COPY .next ./.next

# Copy public assets (images, fonts, etc.)
COPY public ./public

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
