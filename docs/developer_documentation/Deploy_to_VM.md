# Generate ssh key on personal device

1. generate ssh key with `ssh-keygen` and follow instructions
2. `cd ~/.ssh` and find `id_rsa.pub`

# Add ssh key to vm

1. give `id_rsa.pub` to admin
2. admin add public key `~/.ssh/authorized_keys`

# ssh into vm

1. `ssh root@[ip address]`

    - you might have to specify ssh key

# Generate ssh key on VM

1. Generate ssh key for vm with `ssh-keygen` and follow instructions 
2. `cd ~/.ssh` and find `id_rsa.pub`
3. Copy public key to github delpoy keys

   Settings > Deploy Keys > Add deploy Key
![image](https://user-images.githubusercontent.com/22690560/182260258-cb6e74db-ff8b-4966-9dae-489e831caa4a.png)


# Git
1. `git fetch`
2. `git pull` (if necessary)
3. `git switch [branchname]` (if necessary)

# Screen

1. `cd backend` or `cd frontend`
2. `screen -ls` to list all existing screens
3. `screen -S [screen name]` to create a new screen or `screen -r [screen name]` to attach an existing screen

    - make sure to stop any running containers

4. `docker-compose up --build` to build/start docker containers
5. clean up unused images with `docker image prune -a`
