#!/bin/bash
    
curr_dir="$(dirname "$0")"    
source "$curr_dir./startup1.sh"

echo "---------- BEGIN MAIN-STARTUP.SH ----------"
yum update -y
yum install httpd -y
yum install git -y
yum install nodejs -y
yum install npm -y

echo "---------- YUM INSTALLS COMPLETE ---------"

systemctl start httpd
systemctl enable httpd
usermod -a -G apache ec2-user
chown -R ec2-user:apache /var/www
chmod 2775 /var/www
chkconfig httpd on

echo "---------- HTTPD/APACHE CONFIG COMPLETE ----------"

export INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
echo "<html><body><h1>Hello from Build Server</h1><p>Instance ID: $INSTANCE_ID</p></body></html>" > /var/www/html/index.html

echo "---------- END MAIN-STARTUP SECTION ----------"
echo "---------- BEGGINING AFTER STARTUP JOBS ----------"

echo "---------- CLOUD-INIT-WAIT ----------"
cloud-init status --wait

echo "---------- GIT CLONE OF ATO REPO ----------"

cd ~
git clone https://github.com/stall84/abortoorbit.com.git

echo "---------- NPM INSTALL ATO ----------"
cd ~/abortoorbit.com && npm install

echo "---------- NPM INSTALL BUILDSERVER ----------"
cd ~/abortoorbit.com/cicd/buildserver && npm install
cd ~/abortoorbit.com/cicd/buildserver/scripts && chmod u+x build-script.sh

echo "---------- START SERVER ----------"

cd ~/abortoorbit.com/cicd/buildserver && npm run start

echo "---------- SERVER STARTED ----------"
