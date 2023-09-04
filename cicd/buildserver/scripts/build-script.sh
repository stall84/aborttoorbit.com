#!/bin/bash -xe

exec > >(tee /var/log/build-attempt.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "---------- TESTING BUILD SCRIPT INIT ----------" >> ~/build-script.log
echo "---------- BEGIN BUILD-SCRIPT.SH ----------" >> ~/build-script.log

# which gatsby >> ~/build-script.log
# gatsby --version >> ~/build-script.log

cd ~/aborttoorbit.com && npm run deploy:apply

echo "---------- END BUILD-SCRIPT.SH ----------" >> ~/build-script.log