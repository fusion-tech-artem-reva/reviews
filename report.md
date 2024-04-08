#### FE optimizations: 

Why NextJS load json files which not used on current page:
- NextJs preload page data for potential pages which can be opened and preload all data for pages which links are in viewport. But for the current page there are no data within Json files, and page already prepared on server side. And in general those files should not affect on initial page load since them loads only after page already rendered. 

But we can disable it so Next js won't preload those files on appearens in viewport. It will reduce amount of requests.    



> Is it possible to split this file into 1 json per blog

In our case no. Since the pages generated as a static HTML in build time. And Next js collect all the data for those pages in JSON files. Pages should have full data on build time in SEO purposes so server respond with already prefilled page.


> I am also still seeing the json file with references to
https://strapi-softailed-dev.s3.us-east-2.amazonaws.com/blog-softailed.png

Since images collected on S3 and strapi still download them to S3, so when data fetched from strapi there are links to S3 images in strapi BD. In test purposes (dev serer) we handle those links on NextJs side and redo to local links. But after we move to custom storage there won't be S3 links in strapi. And Inga need to updated strapi image upload integration in future for custom storage.


> I would like, at the bare minimum to have the scripts split into individual libraries (1 per js file, queued in the same order of execution).

Next js alredy have optimized `splitChunksConfigs` under the hood. But in general I think we can split chunks into smaller parts  by dynamic load. But this requires a deeper immersion in the code to find places which can be lazy loaded. It's a big investigation work. But we cant garantee high prefomace improvements. 

> have multiple libraries merged (judging from the @license calls), which causes scripts to run for too long on the main thread (anything above 50 ms is considered slow).

It maybe will be resolved by dynamic imports, if those libraries don't need during 



After all that changes and investigations we suggest to spent time and do performance investigation based on our experience. We have direct access to code and environment so we can affect on different code places.