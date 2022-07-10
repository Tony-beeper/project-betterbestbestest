# VM setup

Make sure droplet has at least 1GB ram and 5GB SSD

1. Install Docker
   - [Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
2. Install Docker-Compose
   - [Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
3. Install Git
   - [Guide](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04)
4. Generate SSH keypair
   - `ssh-keygen -t rsa -C "your-email@gmail.com"`
   - Enter and remeber passphrase if prompted
   - find and copy or download `id_rsa.pub`
     - usually here `/root/.ssh/id_rsa.pub`
5. Add public key to Github Deploy keys
   - got your github repo page
   - go to settings
   - Security > Deploy keys
   - Add Deploy key and paste in `id_rsa.pub`
6. Clone repo
   - copy ssh clone command from github
7. Run docker container
