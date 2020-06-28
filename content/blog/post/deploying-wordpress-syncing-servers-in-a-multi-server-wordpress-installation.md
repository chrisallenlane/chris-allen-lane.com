---
title: "Deploying Wordpress: Syncing Files in a Multi-Server Installation"
description: Notes on syncing files across a multi-server Wordpress installation.
date: 2011-07-28
tags:
  - aws
  - wordpress
---

Recently, some of my company's WordPress sites have become so popular that I
chose to migrate them onto a multiple-webserver deployment system in order to
keep up with the traffic.  I encountered some interesting challenges while
setting this up, so I figured I'd document them here.

<!--more-->


{{< h2 "Our Configuration">}}
My goal was to move our large sites off of some budget shared servers and onto
[Amazon Web Services][]. After giving it a lot of thought, this was the
server configuration I came up with:

- One (micro class) server which stores our git repositories (the "master" machine)
- One (small class) RDS (Relational Database Server) running MySQL
- Two (large class) webservers behind an Elastic Load Balancer (ELB)

My goal was to run the least amount of hardware to handle the load at all times
in order to keep our hosting expenses as low as possible.  Toward that end, the
second webserver will power down automatically when it is not needed to handle
the load.


{{< h2 "The Problem">}}
Despite the scalability and redundancy advantages this new configuration
provides, it does introduce some challenges due to the increased complexity
over a single-server WordPress installation.

WordPress can very easily be configured to use a dedicated database (that is
distinct from the webserver) in wp-config.php, so that is not a challenge.  It
is more difficult, however, to run Wordpress across multiple webservers.

Principally, the chief problem with a multiple-webserver configuration is that
Wordpress saves all uploaded files to whichever webserver happened to process a
given file upload.  This makes it inevitable (as users upload files) that the
various webservers' file systems will fall out-of-sync.

The broader topic of creating a load-balanced web deployment system is beyond
the scope of this post, but I'd like to address the problem of keeping these
file structures in sync.


{{< h2 "The Possible Solutions">}}
I considered a few possible solutions for tackling
this synchronization problem:

1. A utility like [rsync][], possibly coupled with an every-minute cron
2. [NFS][] (or the like)
3. Using [S3][] for file storage

I liked the simplicity of the rsync solution, but I wasn't crazy about the idea
of running an every-minute cron.  We're potentially syncing a lot of files
here, and I was hesitant to burn up so much CPU constantly sifting through file
structures.  Plus, that seemed kludgy to me.

The NFS option was initially appealing, but the complexity of setting it up was
intimidating. After some aggressive Googling, the "keep it simple" strategy
seemed like the best one to me, and setting up NFS involved more moving parts
than I wanted to deal with.

S3 seemed like a legitimate option too, and I had considered using one of the
many existing libraries to mount an S3 storage block like a physical drive.
 Eventually, though, I became worried about the "eventual consistency" which S3
promised (ie, S3 takes time to become internally consistent across its own
servers, much like the very problem we're trying to solve here), as well as
some potential performance issues in some of the required libraries.


{{< h2 "The Chosen Solution">}}
Ultimately, I decided that I wanted to keep this system as simple as possible,
so I settled in on some kind of rsync-based solution.  The only issue then, of
course, was how to avoid having to run frequent and wasteful cronjobs.

The perfect solution for my use case turned out to be a utility called
[lsyncd][].  lsyncd is based on rsync (ie, it only transmits file diffs between
source and destination machines), but it is intelligently coupled with
[inotify][].  Thus, it can be used to sync servers, but only bothers to run a
sync _when it has detected that the local file system has actually changed._

Perfect!  

Our deployed configuration ended up looking like this:

- Our blog administrators manage our blog from our master git repository
  machine, which has a low-traffic Wordpress installation running on
  master.ourdomain.com.  (Identities have been concealed to protect the
  innocent, etc.)  When changes are made on this file system,
  lsyncd synchronizes them out to each running webserver.

- Each webserver has lsyncd running on its own file system as well.  When a
  change is made to the WordPress file structure, those changes are synced back
  to the master (code repository) machine.

Thus, in no more than two hops (regardless of the number of webservers we may
be running at any given moment), each file system will be "reflexively" updated
via the master machine within moments after a change on any single server.  I
think this is a robust, efficient, and simple solution to
this synchronization problem.


{{< h2 "Afterthoughts">}}
We haven't been running this system for very long, but at this point, it has
functioned admirably. I'll update this post if I find that I need to make any
tweaks to this system.  For the time being, though, I'm optimistic.

If you have a question, feel free to ask me in the comments.


{{< h2 "Update: 12 Jul 2012">}}
I discuss the solution that I eventually implemented in [this video post][].


[Amazon Web Services]: http://aws.amazon.com/
[NFS]:                 http://en.wikipedia.org/wiki/Network_File_System_(protocol)
[S3]:                  http://aws.amazon.com/s3/
[inotify]:             http://en.wikipedia.org/wiki/Inotify
[lsyncd]:              http://code.google.com/p/lsyncd/
[rsync]:               http://en.wikipedia.org/wiki/Rsync
[this video post]:     /blog/post/video-deploying-wordpress-on-multiple-load-balanced-servers-on-amazon-ec2/

