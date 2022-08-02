# HTTPS and Certificate setup

## Intro

- For HTTPS we need a certificate signed by a Certificate Authority(CA)
- We will use the [certbot cli](https://certbot.eff.org/) to retreive certifcates from the [Let's Encrypt](https://letsencrypt.org/) CA
- Since we are using docker we will use [certbot/certbot](https://eff-certbot.readthedocs.io/en/stable/install.html#running-with-docker) docker image

## Setup guide with nginx

- Follow this [guide](https://mindsers.blog/post/https-using-nginx-certbot-docker/)

## Useful commands

1. Create a cert with certbot

   `docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d example.org`

   replace example.org with your domain
