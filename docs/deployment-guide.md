# Campus Connect - Deployment Guide

## Prerequisites

1. **Supabase Project Setup**
   - Create a Supabase project
   - Configure environment variables
   - Run database migrations
   - Set up storage buckets

2. **Environment Configuration**
   ```bash
   # .env file
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Build Process

### 1. Development Build
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Production Build
```bash
# Build for web
npm run build:web

# This creates a 'dist' folder with static files
```

## Deployment Options

### Option 1: Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Netlify Deployment
```bash
# Build the project
npm run build:web

# Deploy dist folder to Netlify
# Or connect GitHub repo for automatic deployments
```

### Option 3: Manual Deployment
```bash
# Build the project
npm run build:web

# Upload dist folder contents to your web server
```

## Database Setup

### 1. Run Migrations
```sql
-- Run all migration files in supabase/migrations/
-- These set up tables, policies, and storage buckets
```

### 2. Configure Storage
```sql
-- Ensure all storage buckets are public
-- Set up proper RLS policies for anonymous access
```

### 3. Create Admin User
```sql
-- Insert initial admin user
INSERT INTO admin_users (admin_code, password_hash, name, email)
VALUES ('ADMIN001', 'your_hashed_password', 'System Admin', 'admin@college.edu');
```

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Storage buckets created and configured
- [ ] Admin user created
- [ ] File upload/download working
- [ ] Authentication working
- [ ] All routes accessible
- [ ] Excel exports generating proper hyperlinks
- [ ] Document viewing working for anonymous users

## Monitoring & Maintenance

### Performance Monitoring
- Monitor Supabase dashboard for database performance
- Check storage usage and costs
- Monitor API request patterns

### Regular Maintenance
- Update dependencies regularly
- Monitor security advisories
- Backup database regularly
- Review and update RLS policies as needed

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check Supabase project settings
2. **File Access Issues**: Verify storage bucket policies
3. **Authentication Issues**: Check JWT configuration
4. **Build Errors**: Clear cache and reinstall dependencies

### Debug Commands
```bash
# Clear Expo cache
npx expo start --clear

# Clear Metro cache
npx react-native start --reset-cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```