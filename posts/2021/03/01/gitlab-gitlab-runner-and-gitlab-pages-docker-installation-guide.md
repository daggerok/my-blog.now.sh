---
layout: MyFooteredLayout
title: Self-hosted GitLab, GitLab CI runner and GitLab Pages Docker installation guide
date: '2021-03-01 19:27:24 GMT+0200'
type: post
author: Maksim Kostromin <daggerok@gmail.com>
lang: en-US
tags:
- GitLab
- GitLab CI
- GitLab Runner
- GitLab Pages
- Docker
- CentOS
- CentOS 7
- Linux
- DNS
- A-record
- wildcard domain
category: article
meta:
  -
    name: description
    content: Full and detailed guideline of how to install self-hosted GitLab, GitLab CI runner and GitLab Pages using Docker based on Linux CentOS 7
  -
    name: keywords
    content: GitLab, GitLab CI, GitLab Runner, GitLab Pages, Docker, CentOS, CentOS 7, Linux, DNS, A-record, wildcard domain
---

# {{ $frontmatter.title }}

[[toc]]

## Preparation

_Prerequisites_

In that article for `GitLab` and `GitLab CI runner` installation, we should have at least 2 VMs with Linux CentOS 7 or higher with real FQDN defined, with 100Gb of HDD, 4/2 vCPU and 2/4 Gb RAM accordingly, for example:

* my-gitlab.my-company.com
* my-gitlab-runner.my-company.com

_Install required software on both VMs_

```bash
echo "LANG=en_US.utf-8"   | sudo tee --append /etc/environment
echo "LC_ALL=en_US.utf-8" | sudo tee --append /etc/environment

sudo yum -y install epel-release
sudo yum -y install htop git zsh wget
```

_Optionally, I would prefer to install oh-my-zsh_

```bash
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh
```

We also must install Docker on both VMs as far we are going to use it everywhere,
by running GitLab and gitlab-runner and mounting docker data directory for later
re-use and GitLab upgrades, so next section steps must be performed accordingly
for both VMs as well. First, ssh into each of them:

* my-gitlab.my-company.com
  ```bash
  ssh maksim.kostromin@my-gitlab.my-company.com
  ```
* my-gitlab-runner.my-company.com
  ```bash
  ssh maksim.kostromin@my-gitlab-runner.my-company.com
  ```

Now install Docker:

```bash
sudo yum remove -y docker \
                   docker-client \
                   docker-client-latest \
                   docker-common \
                   docker-latest \
                   docker-latest-logrotate \
                   docker-logrotate \
                   docker-engine
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
# yum list docker-ce --showduplicates | sort -r
sudo yum install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo docker run hello-world
sudo usermod -aG docker `echo $USER`
# logout and login again to verify no sudo docker commands works:
docker run hello-world
```

## Install GitLab

_Create required env variables_

```bash
export GITLAB_HOME=/srv/gitlab
echo "export GITLAB_HOME=$GITLAB_HOME" | sudo tee --append /etc/profile.d/01-setup-GITLAB_HOME-environment-variable.sh

export GITLAB_OMNIBUS_CONFIG="\"gitlab_rails['gitlab_shell_ssh_port'] = 2222; external_url 'http://my-gitlab.my-company.com/'; gitlab_rails['lfs_enabled'] = true;\""
echo "export GITLAB_OMNIBUS_CONFIG=$GITLAB_OMNIBUS_CONFIG" | sudo tee /etc/profile.d/03-setup-GITLAB_OMNIBUS_CONFIG-environment-variable.sh

export GITLAB_CE_DOCKER_TAG=13.9.0-ce.0
#export GITLAB_DOCKER_TAG=13.9.1-ce.0
echo "export GITLAB_CE_DOCKER_TAG=$GITLAB_CE_DOCKER_TAG" | sudo tee /etc/profile.d/02-setup-GITLAB_CE_DOCKER_TAG-environment-variable.sh
```

::: tip
Always make sure before running any docker commands uses correct actual
`GITLAB_HOME`, `GITLAB_CE_DOCKER_TAG` and `GITLAB_OMNIBUS_CONFIG` environment
variables. They all must be already available in your shell! See instructions above
:::

_Initially, create data directory, where Docker will be stored all needed information_

```bash
sudo mkdir -p $GITLAB_HOME
sudo chmod a+rwx $GITLAB_HOME
echo "TODO: FIXME: For security reasons reduce permissions by tweaking \
chown and chmod commands after gitlab setup to eliminate unauthorised access \
to $GITLAB_HOME directory, configured via \$GITLAB_HOME env variable" > $GITLAB_HOME/README
```

GitLab installation using docker:

_Pull needed tag of gitlab community edition image_

```bash
docker pull gitlab/gitlab-ce:$GITLAB_CE_DOCKER_TAG
```

_Remove previously create container if exists_

::: warning
IMPORTANT: Make sure you are not using -v flag to remove container together with volumes!
:::

```bash
docker rm -f gitlab || echo "previous gitlab container of gitlab/gitlab-ce image is not found"
```

::: danger
_Next code must be executed if you want to clean everything only!_

```bash
docker rm -f -v gitlab || echo "previous gitlab container of gitlab/gitlab-ce image is not found"

for i in `ls /srv/gitlab/ | grep -v README` ; do sudo rm -rf /srv/gitlab/$i ; done
```
:::

_Run concrete version of gitlab server using docker_

```bash
docker run --detach --restart always \
  --hostname my-gitlab.my-company.com \
  --publish 443:443 --publish 80:80 --publish 2222:2222 \
  --volume $GITLAB_HOME/config:/etc/gitlab:Z \
  --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
  --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
  -e GITLAB_OMNIBUS_CONFIG="$GITLAB_OMNIBUS_CONFIG" \
  --name gitlab gitlab/gitlab-ce:$GITLAB_CE_DOCKER_TAG
```

_Wait and see how gitlab is installing if needed_

```bash
docker logs -f -t gitlab
```

_If this container fails to start due to permission problems try to fix it by executing_

```bash
docker exec -it gitlab update-permissions
docker restart gitlab
```

_To make changes in future do not forget to always reconfigure GitLab afterwards_

```bash
docker exec -it gitlab vim /etc/gitlab/gitlab.rb
docker restart gitlab
```

_Set root password on Web UI first_

Now open [GitLap home page](http://my-gitlab.my-company.com/) and setup new password for example to `Very$ecretp@aaw0rd` if you are installing it first time or from scratch.

_Add ssh key_

First, let's generate new key pair for installed gitlab server:

```bash
ssh-keygen -f /path/to/.ssh/my-gitlab-rsa -t rsa -b 8192 -N "" -C "my-gitlab.my-company.com RSA key"
Generating public/private rsa key pair.
Your identification has been saved in /path/to/.ssh/my-gitlab-rsa.
Your public key has been saved in /path/to/.ssh/my-gitlab-rsa.pub.
The key fingerprint is:
SHA256:tZf/HU0Jam1E2WJ4a5jEtxil8VRGKcfvBkd3D52SgJ0 my-gitlab.my-company.com RSA key
The key's randomart image is:
+---[RSA 8192]----+
|          +o=+B=o|
|         . E*Xo*=|
|          o.O+Bo=|
|         . =+=o =|
|        S .o+o =.|
|          .... .+|
|              .o.|
|               .o|
|                o|
+----[SHA256]-----+
```

Now copy public key into buffer to paste it on GitLab UI later:

```bash
cat /path/to/.ssh/my-gitlab-rsa.pub | pbcopy
```

## Update GitLab

Obviously, later, when newer version of GitLab Docker image will be released, sooner
or later you would like to upgrade it. Because we are relaying on Docker
infrastructure when running GitLab, we can easily perform upgrades.

Let's update `GITLAB_CE_DOCKER_TAG` env variable with actual GitLab version we
would like to work and just with few commands we can quickly perform upgrade
with minimal effort:

```bash
#export GITLAB_CE_DOCKER_TAG=13.9.0-ce.0
export GITLAB_CE_DOCKER_TAG=13.9.1-ce.0
echo "export GITLAB_CE_DOCKER_TAG=$GITLAB_CE_DOCKER_TAG" | sudo tee /etc/profile.d/02-setup-GITLAB_CE_DOCKER_TAG-environment-variable.sh

docker stop gitlab
docker rm gitlab

docker pull gitlab/gitlab-ce:$GITLAB_CE_DOCKER_TAG

docker run --detach --restart always \
  --hostname my-gitlab.my-company.com \
  --publish 443:443 --publish 80:80 --publish 2222:2222 \
  --volume $GITLAB_HOME/config:/etc/gitlab:Z \
  --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
  --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
  -e GITLAB_OMNIBUS_CONFIG="$GITLAB_OMNIBUS_CONFIG" \
  --name gitlab gitlab/gitlab-ce:$GITLAB_CE_DOCKER_TAG

docker logs -f gitlab
```

::: tip
NOTE: After upgrade your previous MRs may not be workable, so better merge them
all (or close) before upgrade
:::

## Backup Gitlab

Out of scope, but maybe later I will update that part of article sd well.
For now, read: https://docs.gitlab.com/ee/raketasks/backup_restore.html for details

## Troubleshoot GitLab

Because we are using Docker we can easily check what is happening inside our GitLab, it's just a Docker container... 

```bash
docker logs gitlab
docker exec -it gitlab /bin/bash
```

## Install GitLab Runner

Preparation: First of all, make sure you have been done a [preparation](#preparation) section on top of that document...

_Obtain required information from here: http://my-gitlab.my-company.com/admin/runners your GitLab instance_

I've got, for example these:

* Runner registration URL: `http://my-gitlab.my-company.com/`
* Runner registration token: `eDNdVaEmAzHijPt4pLnW`

_Now again, create required env variables and directories where docker will be storing all the data_

```bash
export GITLAB_RUNNER_HOME=/srv/gitlab-runner
echo "export GITLAB_RUNNER_HOME=$GITLAB_RUNNER_HOME" | sudo tee /etc/profile.d/01-setup-GITLAB_RUNNER_HOME-environment-variable.sh

sudo mkdir -p $GITLAB_RUNNER_HOME
sudo chmod a+rwx $GITLAB_RUNNER_HOME
echo "TODO: FIXME: For security reasons reduce permissions by tweaking chown and chmod commands after gitlab setup to eliminate unauthorised access to $GITLAB_RUNNER_HOME directory, configured via \$GITLAB_RUNNER_HOME env variable" > $GITLAB_RUNNER_HOME/README

export GITLAB_RUNNER_DOCKER_TAG=ubuntu-v13.8.0
echo "export GITLAB_RUNNER_DOCKER_TAG=$GITLAB_RUNNER_DOCKER_TAG" | sudo tee /etc/profile.d/02-setup-GITLAB_RUNNER_DOCKER_TAG-environment-variable.sh

export GITLAB_RUNNER_REGISTRATION_URL="http://my-gitlab.my-company.com/"
echo "export GITLAB_RUNNER_REGISTRATION_URL=$GITLAB_RUNNER_REGISTRATION_URL" | sudo tee /etc/profile.d/03-setup-GITLAB_RUNNER_REGISTRATION_URL-environment-variable.sh

export GITLAB_RUNNER_REGISTRATION_TOKEN=eDNdVaEmAzHijPt4pLnW
echo "export GITLAB_RUNNER_REGISTRATION_TOKEN=$GITLAB_RUNNER_REGISTRATION_TOKEN" | sudo tee /etc/profile.d/04-setup-GITLAB_RUNNER_REGISTRATION_TOKEN-environment-variable.sh
```

_Install gitlab-runner with docker executor, register runner and run it_

```bash
# chose some: # docker run --rm ... # docker run --restart=unless-stopped ...
docker run --rm --privileged --name gitlab-runner \
          -v /var/run/docker.sock:/var/run/docker.sock:z \
          -v $GITLAB_RUNNER_HOME/config:/etc/gitlab-runner gitlab/gitlab-runner:$GITLAB_RUNNER_DOCKER_TAG \
                register --non-interactive \
                          --executor "docker" \
                          --docker-image "docker:20.10.3-dind" \
                          --url "$GITLAB_RUNNER_REGISTRATION_URL" \
                          --registration-token "$GITLAB_RUNNER_REGISTRATION_TOKEN" \
                          --description "docker-runner" \
                          --tag-list "jbids,docker" \
                          --run-untagged \
                          --locked="false" \
                          --access-level="not_protected"
# output: Registering runner... succeeded                     runner=eDNdVaEm
# output: Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!

docker run --privileged --name gitlab-runner -d \
          -v /var/run/docker.sock:/var/run/docker.sock:z \
          -v $GITLAB_RUNNER_HOME/config:/etc/gitlab-runner \
          gitlab/gitlab-runner:$GITLAB_RUNNER_DOCKER_TAG
docker logs -f -t gitlab-runner
```

## Update GitLab Runner

Again, as for your GitLab, you also probably would like to perform GitLab
Runner upgrade... and again, it will be very easy to do, just because we are
using Docker! So here step-by-step guide:

* Remove registered runner(s) using your GitLab root account on admin Web UI: http://my-gitlab.my-company.com/admin/runners
* Login into my-gitlab-runner.my-company.com VM:
  ```bash
  ssh maksim.kostromin@my-gitlab-runner.my-company.com
  ```
* Remove current runner docker container:
  ```bash
  docker rm -f -v gitlab-runner
  ```
* Update environment variable accordingly to desired version you would like to work with:
  ```bash
  export GITLAB_RUNNER_DOCKER_TAG=ubuntu-v13.9.0
  echo "export GITLAB_RUNNER_DOCKER_TAG=$GITLAB_RUNNER_DOCKER_TAG" | sudo tee /etc/profile.d/02-setup-GITLAB_RUNNER_DOCKER_TAG-environment-variable.sh
  ```
* Finally re-register gitlab-runner and start again!
  ```bash
  docker run --rm --privileged --name gitlab-runner \
            -v /var/run/docker.sock:/var/run/docker.sock:z \
            -v $GITLAB_RUNNER_HOME/config:/etc/gitlab-runner gitlab/gitlab-runner:$GITLAB_RUNNER_DOCKER_TAG \
                  register --non-interactive \
                            --executor "docker" \
                            --docker-image "docker:20.10.3-dind" \
                            --url "$GITLAB_RUNNER_REGISTRATION_URL" \
                            --registration-token "$GITLAB_RUNNER_REGISTRATION_TOKEN" \
                            --description "docker-runner" \
                            --tag-list "jbids,docker" \
                            --run-untagged \
                            --locked="false" \
                            --access-level="not_protected"
  
  docker run --privileged --name gitlab-runner -d \
            -v /var/run/docker.sock:/var/run/docker.sock:z \
            -v $GITLAB_RUNNER_HOME/config:/etc/gitlab-runner \
            gitlab/gitlab-runner:$GITLAB_RUNNER_DOCKER_TAG
  
  docker logs -f -t gitlab-runner
  ```

## Install GitLab Pages

It's hard imagine for me to develop software without a documentation. So for
every project I'm usually working on I'm always adding README-files or more
comprehensive documentation and it's usually regular files or static
HTML-pages... GitLab can serve static files, all you need to do is simply install
GitLab Pages.

_Prerequisites_

To fully complete current article, you have to being able to configure your
company DNS, to add a wildcard A-record: *.my-gitlab-pages.my-company.com. pointing to your `GitLab server IP

First of all, create a wildcard A-record which is going to be pointed to my-gitlab.my-company.com IP (11.22.33.44):

```
*.my-gitlab-pages.my-company.com. 1800 IN A 11.22.33.41
```

So as result, for exampe executing a command:

```bash
nslookup test1.my-gitlab-pages.my-company.com
```

will produce some valid result, like this:

```bash
> Server: dns.google.com
> Address: 8.8.8.8
>
> Non-authoritative answer:
> Name: my-gitlab.my-company.com
> Address: 11.22.33.44
> Aliases: test1.my-gitlab-pages.my-company.com
```

Now we can uncomment pages configuration, which is included and commented out by default:

```bash
# ssh into gitla server
ssh maksim.kostromin@my-gitlab.my-company.com

# go inside gitlab docker container:
docker exec -it gitlab bash

# edit main gitlab configuration file:
vi /etc/gitlab/gitlab.rb

# Uncomment and define pages_external_url to enable GitLab Pages:
pages_external_url "http://my-gitlab-pages.my-company.com/"

# And change that, because we are using Docker!
gitlab_pages['inplace_chroot'] = true

# press "ESCAPE" to switch in commands mode
# type  ":x" to save file and exit
# press "ENTER"

# now reconfigure gitlab instance:
gitlab-ctl reconfigure
# ...
# gitlab Reconfigured!
```

Once it's done we can use gitlab pages in our projects!
Now you should be able to go to gitlab and see Pages section in project where pages deploy task was configured in .gitlab-ci.yml pipeline file...

## Resources

* https://ohmyz.sh/#install
* https://docs.docker.com/engine/install/centos/
* [Installing GitLab with Docker](https://docs.gitlab.com/omnibus/docker/)
* [Comprehensive list of configuration options: Omnibus GitLab readme](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md)
* https://docs.gitlab.com/ee/ci/ssh_keys/
* https://docs.gitlab.com/omnibus/docker/#update-gitlab-using-docker-engine
* https://docs.gitlab.com/ee/policy/maintenance.html#upgrade-recommendations
* https://docs.gitlab.com/runner/install/
* https://docs.gitlab.com/ee/administration/pages/index.html
* https://www.youtube.com/watch?v=dD8c7WNcc6s
* http://my-gitlab.my-company.com/help/ci/yaml/README.md
* https://schnuckelig.eu/blog/gitlab-pages-and-bad-gateway-problem-20180516/
