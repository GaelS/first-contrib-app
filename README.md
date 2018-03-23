# First Contrib Search

## Why this project ? 

As a coder wanted to make his/her first contribution to an open source project, it can sometimes be tough to find the right project that matches both your expectations and skills. 

Thanks to some projects just like [awesome list](https://github.com/MunGell/awesome-for-beginners), you still can find *static* lists of project that are looking for developers.

Going further, if you want to search for issues that can be handled by beginners with the [Github Search Engine](https://github.com/search/advanced), you still need to know what label is used by each repository to target beginners.


## The Answer

This project tries to answer this problematic by providing you with a simple search engine which will target all the issues with a label being more or less related with *beginners*. For now, 50 difference labels are listed. 

And because doing a search engine is not that cool, I tried to follow my 80's inner vibes to provide a *Miami Vice*/*GTA Vice City* style :)

## What problems have I found ?

 - I want to use the GraphQL API provided by Github because it drastically reduces the network calls number. However, it is not callable without being authenticated. Therefore, as a user, you must be authenticated to Github to use this app.
 
 - Major drawback: when searching issues by label in Github, we cannot use "OR" operator. Basically, we cannot search for issue having labels *GOOD FIRST CONTRIBUTION **OR** *UP FOR GRABS* in one query. 
 Therefore, to get the result of a query like above, the trick for now is to search issues having  *GOOD FIRST CONTRIBUTION* as a label **OR**  issues having *UP FOR GRABS* as a label but **NOT** *GOOD FIRST CONTRIBUTION*. The direct consequence is that we have to perform 50 (the number of labels we have so far) query to get all the potential issues. Thanks to GraphQL, we can do it in one network call but it is a laaaarge request we are sending...
 
 - As a direct consequence, the pagination will be a bit  tricky to implement since our results are the concatenation of 50 independent requests. A bit of thinking has to be done regarding that topic.

## ROADMAP

It's a first draft so lot of things still need to be done

 - polish the style
 - Handling "no results" and "network error" in a nice visual way"
 - Pagination (or maybe an alternative with an infinite scrolling)
 - Sorting by repositories stars count/issues creation, etc.
 - Functional tests (because we always need tests :))
 - Better files structure
 - Code refactoring to be clean and proud of ourselves

 

 