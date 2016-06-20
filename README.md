## Nodejs + Mysql 后台管理系统

标签： Nodejs Mysql Express Ejs
<font color="green">
<sub>v0.1
2016.06.20<sub>
</font>

---
## 安装Nodejs
```
yum install libtool automake autoconf gcc-c++ openssl-devel
wget https://nodejs.org/dist/v4.4.1/node-v4.4.1-linux-x64.tar.xz
yum install xz
xz -d node-v4.4.1-linux-x64.tar.xz;tar xvf node-v4.4.1-linux-x64.tar
mv node-v4.4.1-linux-x64 /usr/local/nodejs
vim /etc/profile

export NODE_HOME=/usr/local/nodejs
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules

source /etc/profile
```

---
## 安装项目环境

```
npm install -g express-generator  //安装express
git clone https://github.com/biwow/NODEJS-MYSQL.git /data/biwow  //下载程序
cd /data/biwow
npm install //下载插件
npm install forever -g

启动：forever start start -o /data/biwow/out.log -e /data/biwow/err.log /data/biwow/bin/www
停止：forever stop /data/biwow/bin/www
```