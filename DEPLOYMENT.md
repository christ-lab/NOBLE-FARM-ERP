# NOBLE FARMS ERP - Deployment Guide

## Render Deployment Setup

### Prerequisites

1. **MongoDB Atlas Account**: https://cloud.mongodb.com/
   - Create a cluster
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - Whitelist Render IP: `0.0.0.0/0` (in MongoDB Network Access)

2. **Render Account**: https://render.com/

3. **GitHub Repository**: Already set up

### Environment Variables (Render Dashboard)

Set these in your Render service environment:

```env
DATABASE=mongodb+srv://your-username:your-password@cluster.mongodb.net/noble-farms?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-please
NODE_ENV=production
OPENSSL_CONF=/dev/null
PUBLIC_SERVER_FILE=https://noble-farm-erp-backend.onrender.com
PORT=10000
```

### Render Service Configuration

**Build Command:**
```bash
cd backend && npm install
```

**Start Command:**
```bash
cd backend && npm run setup && npm run start
```

**Root Directory:** `/` (root of repo)

### Deployment Steps

1. Go to https://dashboard.render.com/
2. Create new **Web Service**
3. Connect your GitHub repo: `christ-lab/NOBLE-FARM-ERP`
4. Configure:
   - **Name**: `noble-farm-erp-backend`
   - **Branch**: `fix/render-deployment-config` (or main)
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm run setup && npm run start`
5. Add Environment Variables (see above)
6. Click **Deploy**

### Verify Deployment

Once deployed, test:

```bash
# Health check
curl https://noble-farm-erp-backend.onrender.com/api/health

# Should return:
# {"success":true,"message":"Backend is running","timestamp":"2024-01-01T...","environment":"production","publicServerFile":"https://noble-farm-erp-backend.onrender.com"}
```

### Frontend Deployment (Vercel)

1. Go to https://vercel.com/
2. Create new project
3. Select repo: `christ-lab/NOBLE-FARM-ERP`
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```env
   VITE_API_BASE_URL=https://noble-farm-erp-backend.onrender.com/api
   ```
6. Deploy

### Cloudflare DNS Configuration

1. Go to https://dash.cloudflare.com/
2. Select domain: `noblefarms.uk`
3. Add DNS Records:

```
Type   | Name | Content                              | TTL  | Proxy
-------|------|--------------------------------------|------|--------
CNAME  | erp  | noble-farm-erp-backend.onrender.com | Auto | Proxied
CNAME  | www  | noble-farms.vercel.app              | Auto | Proxied
```

4. **SSL/TLS Settings**:
   - Mode: **Full (strict)**
   - Enable **Always Use HTTPS**

### Docker Local Deployment

```bash
# Build and run with docker-compose
docker-compose -f docker-compose.prod.yml up -d

# Test
curl http://localhost:10000/api/health
```

### Troubleshooting

#### "Api url doesn't exist" Error

1. Check Render logs: Dashboard → Logs
2. Verify MongoDB connection:
   ```bash
   curl https://noble-farm-erp-backend.onrender.com/api/health
   ```
3. Check environment variables are set
4. Restart deployment

#### CORS Errors

- Frontend URL must be in allowed origins
- Check `backend/src/app.js` CORS configuration
- Update `allowedOrigins` array with your frontend URL

#### MongoDB Connection Failed

1. Verify DATABASE URL is correct
2. Check MongoDB whitelist includes `0.0.0.0/0`
3. Verify username/password in connection string
4. Check database name exists in MongoDB

### Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set in Render
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Cloudflare DNS records configured
- [ ] SSL/TLS enabled
- [ ] Health check passing
- [ ] Frontend can reach backend API
- [ ] Login works
- [ ] Data persists in MongoDB

### Performance Tips

1. Use Render Pro plan for always-on instances
2. Enable caching in Cloudflare
3. Use MongoDB Atlas free tier for development
4. Consider upgrading to paid MongoDB cluster for production

### Support

- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com/
- Vercel Docs: https://vercel.com/docs
- Cloudflare Docs: https://developers.cloudflare.com/
