# Boovy Deployment Guide

## Production Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend Deployment (Vercel)
1. **Prepare the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `.next`
   - Add environment variables in Vercel dashboard

#### Backend Deployment (Railway)
1. **Prepare the backend**
   ```bash
   cd backend
   npm install --production
   ```

2. **Deploy to Railway**
   - Connect your GitHub repository to Railway
   - Set start command: `npm start`
   - Add environment variables in Railway dashboard:
     ```
     CLAUDE_API_KEY=your_key_here
     NODE_ENV=production
     PORT=3001
     ```

3. **Update frontend API URL**
   - Update API calls in frontend to use Railway URL
   - Set `NEXT_PUBLIC_API_URL` environment variable

### Option 2: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - NODE_ENV=production
    
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001
    depends_on:
      - backend
```

### Option 3: Traditional VPS

#### Server Setup (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone your repository
git clone <your-repo-url>
cd boovy
```

#### Backend Setup
```bash
cd backend
npm install --production
cp .env.example .env
# Edit .env with your production values

# Start with PM2
pm2 start npm --name "boovy-backend" -- start
pm2 save
pm2 startup
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run build

# Start with PM2
pm2 start npm --name "boovy-frontend" -- start
pm2 save
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

### Backend (.env)
```bash
# Required
CLAUDE_API_KEY=your_claude_api_key_here
NODE_ENV=production
PORT=3001

# Optional
JWT_SECRET=your_jwt_secret_for_future_auth
DATABASE_URL=your_database_url_if_needed
REDIS_URL=your_redis_url_for_caching
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_URL=https://your-frontend-url.com
```

## Security Considerations

### Backend Security
- Use HTTPS in production
- Set secure CORS origins
- Implement rate limiting
- Use environment variables for secrets
- Regular security updates

### Frontend Security
- Enable CSP headers
- Use HTTPS
- Sanitize user inputs
- Regular dependency updates

## Monitoring & Maintenance

### Health Checks
- Backend: `GET /health`
- Monitor API response times
- Set up alerts for downtime

### Logging
```bash
# PM2 logs
pm2 logs boovy-backend
pm2 logs boovy-frontend

# Application logs
tail -f backend/logs/app.log
```

### Backup Strategy
- Regular database backups (if using)
- Code repository backups
- Environment variable backups
- Generated template backups

## Performance Optimization

### Backend
- Enable gzip compression
- Implement Redis caching
- Database query optimization
- CDN for static assets

### Frontend
- Next.js automatic optimizations
- Image optimization
- Code splitting
- Static generation where possible

## Scaling

### Horizontal Scaling
- Load balancer (Nginx/HAProxy)
- Multiple backend instances
- Database clustering
- CDN integration

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Cache frequently accessed data
- Monitor resource usage

## Troubleshooting

### Common Issues
1. **API Key Issues**: Verify Claude API key is valid
2. **CORS Errors**: Check backend CORS configuration
3. **Build Failures**: Ensure all dependencies are installed
4. **Port Conflicts**: Use different ports or kill existing processes

### Debug Commands
```bash
# Check processes
pm2 status
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# Check logs
pm2 logs
tail -f /var/log/nginx/error.log

# Test API
curl https://your-backend-url.com/health
```

## Rollback Strategy

### Quick Rollback
```bash
# Stop current version
pm2 stop all

# Checkout previous version
git checkout previous-tag

# Reinstall and restart
npm install
pm2 restart all
```

### Database Rollback
- Keep database migration scripts
- Test rollback procedures
- Maintain backup restore procedures

