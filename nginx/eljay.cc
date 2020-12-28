# gzip on;
# gzip_vary on;
# gzip_min_length 1024;
# gzip_proxied expired no-cache no-store private auth;
# gzip_types text/plain text/html text/css text/javascript;

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2 ipv6only=on;

  server_name eljay.cc www.eljay.cc;

  ssl_certificate /etc/letsencrypt/live/eljay.cc/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/eljay.cc/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_trusted_certificate /etc/letsencrypt/live/eljay.cc/chain.pem;
  resolver 1.1.1.1 1.0.0.1 [2606:4700:4700::1111] [2606:4700:4700::1001] valid=86400s;
  resolver_timeout 10s;

  add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; block-all-mixed-content; font-src 'self' https: data:; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests" always;
  add_header Expect-CT "max-age=0" always;
  add_header Referrer-Policy "no-referrer" always;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-XSS-Protection "0" always;

  root /home/lj/eljay-cc/site;
  index index.html;
  error_page 404 /404.html;

  location / {
    limit_except GET HEAD { deny all; }
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
    autoindex_format html;
    try_files $uri $uri/ =404;
  }
}

server {
  listen 80;
  listen [::]:80 ipv6only=on;

  server_name eljay.cc www.eljay.cc;

  return 308 https://$server_name$request_uri;
}
