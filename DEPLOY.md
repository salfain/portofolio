# Panduan Deploy ke VPS Ubuntu

## Prasyarat

- Ubuntu 22.04 LTS atau lebih baru
- RAM minimal 1 GB, direkomendasikan 2 GB
- Domain sudah diarahkan ke IP VPS
- Bucket Cloudflare R2 atau storage S3-compatible untuk upload file

## 1. Install Runtime

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs postgresql postgresql-contrib nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

## 2. Setup PostgreSQL

```bash
sudo -u postgres psql
```

```sql
CREATE USER portfolio_user WITH PASSWORD 'ganti_password_kuat';
CREATE DATABASE portfolio_db OWNER portfolio_user;
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

## 3. Setup Project

```bash
cd /var/www
git clone https://github.com/USERNAME/portfolio.git
cd portfolio
npm install
cp .env.local.example .env.local
nano .env.local
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run build
```

Isi `.env.local` dengan nilai production:

```env
DATABASE_URL="postgresql://portfolio_user:ganti_password_kuat@localhost:5432/portfolio_db"
AUTH_SECRET="secret-production"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"

R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="portfolio-assets"
R2_ENDPOINT="https://ACCOUNT_ID.r2.cloudflarestorage.com"
NEXT_PUBLIC_R2_PUBLIC_URL="https://pub-xxx.r2.dev"
```

## 4. Jalankan dengan PM2

```bash
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save
```

## 5. Konfigurasi Nginx

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. SSL

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 7. Setup Cloudflare R2

1. Buka Cloudflare Dashboard -> R2 Object Storage.
2. Buat bucket, misalnya `portfolio-assets`.
3. Aktifkan public URL R2.dev atau pasang custom domain.
4. Buat R2 API Token dengan permission Object Read & Write.
5. Masukkan endpoint, access key, secret key, bucket name, dan public URL ke `.env.local`.

## 8. Ganti Password Admin Default

Seed membuat admin awal:

```text
admin@portofolio.local / admin123
```

Setelah deploy, ganti password dengan hash bcrypt baru:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('PASSWORD_BARU',12).then(console.log)"
npx prisma studio
```

Update field `passwordHash` pada user admin.

## Update Aplikasi

```bash
cd /var/www/portfolio
git pull
npm install
npx prisma migrate deploy
npm run build
pm2 restart portfolio
```
