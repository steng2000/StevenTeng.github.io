---
layout: post
title: IntelliJ 14.1.5 Json Oddity
---
### Couple of findings on IntelliJ 14.1.5 running Ubuntu 15.04
Creating a json file would show up in the IDE as foo.json but no extension in the OS file system (Ubuntu 15.04)
This can wreck havoc using vertx factory to start verticle using "service:foo.json" The file does not exist.
