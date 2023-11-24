# First Contrib Search


TLDR; Try it [here](https://first-contrib.surge.sh) !

![First Contrib App](./github.png)

## Why this project ? 

As a coder who wants to make his/her first contribution to an open source project, it can sometimes be tough to find the right project that matches both your expectations and skills. 

Thanks to some projects just like [awesome list](https://github.com/MunGell/awesome-for-beginners), you still can find *static* lists of project that are looking for developers.

Going further, if you want to search for issues that can be handled by beginners with the [Github Search Engine](https://github.com/search/advanced), you still need to know what label is used by each repository to target beginners.


## The Answer

This app tries to answer this problem by providing you with a simple search engine which will target all the issues with labels being more or less related with *beginners*. For now, more or less 50 different labels are listed in this [file](https://github.com/GaelS/first-contrib-app/blob/master/src/labels.js). 

And because doing a search engine can be cooler than it is, I tried to follow my 80's inner vibes to provide a *Miami Vice*/*GTA Vice City* style :)

## What problems have I found along the way?

 - I wanted to use the GraphQL API provided by Github because it drastically reduces the network calls number. However, it is not callable without being authenticated. Therefore, as a user, you must be authenticated to Github to use this app.
 
 - Major drawback: when searching issues by label in Github, we cannot use "OR" operator. Basically, we cannot search for issue having labels *GOOD FIRST CONTRIBUTION* **OR** *UP FOR GRABS* in one query. Therefore, the trick to get the issues that could be of interest is to query **repositories** that have **issues** matching our labels' list. The unfortunate consequence is that the list of issues listed in a repository can sometimes be empty... which leads sometimes to get a list of 20 repositories with no issues at all to display... That is the reason why the *fetch more* button might need to be smashed several times before finding new issues to display... 
 A naive idea of mine was to query again a new list of repositories when zero issues are returned but launching network requests recursively does not seem like a good idea...ahem... 

## The stack

The main libs of this project are : 

- React (but preact-compat is used to get a smaller bundle)
- React Apollo
- React Router
- A bit of lodash

## ROADMAP

It's a first draft so lot of things still need to be done

 - Polish the style
 - Improve sorting possibility (so far, it's hardcoded by descending stars numbers).
 - Functional tests (because we always need tests :))
 - As said before, a trick to get an elegant way to query only meaningful repositories that have issues. 

Feel free to open PR or submit issues :) 

## Contribution Guidelines
Thank you for considering contributing to the First Contrib App! To ensure a smooth collaboration, please follow these guidelines:

1) Check for Existing Issues: Before you start working on something new, check the existing issues to make sure it hasn't already been reported or worked on.

2) Fork the Repository: If you find an issue or want to add a feature, fork the repository on GitHub.

3) Branching: Create a new branch for your contribution. This helps keep your changes isolated and makes it easier to merge your work.

4) Code Style: Follow the existing code style to maintain consistency. If in doubt, refer to the existing codebase.

5) Testing: If you're adding new features, ensure to add relevant tests. If fixing a bug, make sure there are tests that cover the issue.

6) Pull Requests: Once your changes are ready, submit a pull request. Provide a clear and concise description of your changes. Mention the issue number if applicable.

7) Be Patient: Understand that open-source projects are maintained by volunteers. Be patient if there are delays in reviewing or merging your pull request.

## LICENCE

MIT.

 
