# NGINX reverse proxy setup

1. Read these resources first

   - https://docs.nginx.com/nginx/admin-guide/web-server/web-server/
   - https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/

2. Sample reverse proxy config

   ```conf
   server{
       listen 80;
       listen [::]:80;

       server_name codebook.tech;

       location / {
           proxy_set_header Host $host; # set if needed
           proxy_set_header X-Real-IP $remote_addr; # set if needed
           proxy_pass http://localhost:3000;

       }
   }
   ```
