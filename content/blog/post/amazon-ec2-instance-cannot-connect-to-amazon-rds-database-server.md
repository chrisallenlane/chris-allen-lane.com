---
title: Amazon EC2 Instance cannot Connect to Amazon RDS Database Server
description: How to connect an RDS instance to Amazon EC2.
date: 2011-07-23
tags:
  - aws
---

While designing a new deployment system for my company with Amazon's AWS, I
stumbled onto a problem that cost me some time - I could not get my EC2
instances to connect to our Amazon RDS database servers. I figured I'd
document the solution here for the sake of those to follow.

I had created two webservers, and a MultiAZ instance of an RDS server with
which they were to transact. I could connect to each webserver and the RDS
server directly, but I could not get the webservers to connect to the RDS. The
issue ultimately ended up being related to my security groups configuration.

<!--more-->

Failed Configuration
--------------------
My initial strategy for whitelisting the webservers was the following:

- Procure an Elastic IP address for each webserver
- Whitelist the IP addresses as a CIDR address in the DB Security Group

While seeming logical enough, that strategy simply didn't work.

Successful Configuration
------------------------
This, however, did work:

- Add each of the webservers to an EC2 Security Group
- Whitelist the EC2 Security Group in the DB Security Group

When you're trying to whitelist the EC2 security group against the DB Security
Group, you'll need two pieces of information:

- The "Security Group"
- Your "AWS Account ID"

I had to stumble around a bit to find that information. Here's where to locate
it:

### Security Group ###
Under the "EC2" tab, under "Security Groups" in the left-hand navigation: your
Security Groups will be listed in the upper content pane. The designator you
need is actually just the human-readable group name (like "default") rather
than the Group ID from the lower detail pane. It took me a few tries to
realize this.

### AWS Account ID ###
Click on the "Account" link in the navigation at the very top of the page.
 From there, go to "Manage Your Account". On the subsequent screen, you can
find your account number in very small text near the top right-hand corner of
the page.

If you authorize your EC2 instances that way, they should be able to connect to
your RDS.
