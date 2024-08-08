This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## All in one input

- The following are passed through the 'websiteData' object

1. websiteName: String - Should be the website/company name. Used in pretty much every prompt
2. websiteUrl: String (Url) - This is the websites base URL. Eg: https://cogbranding.com.au
3. websiteContext: String - This is to provide context about the company, what they do, perhaps their values, who they service, the services they provide, their values, location, priorities etc etc.
4. highDaBackLinks: Array (of strings (urls)) - This is an array of urls. These urls will be included as links in the introduction and conculsion of blog posts and hub pages.
5. formatType: Enum ('wp block', 'div') - Used to determine which function to run for:

- Structuring the 'content' - formatting the content response from chatgpt into valid wp block syntax or divi builder syntax.
- Building the xml - They fields that needed to be added to the xml post/page item for each format is different, hence a different function is called depending on the value of formatType

6. blogBaseUrl: String (url) - The base url of all blogs on wordpress website. Eg: https://cogbranding.com.au/news/

- Because the longtail generators only produce slugs and not full urls, if I want to link from hub to spoke, or spoke to spoke, I need the base url for all spokes + their slug to form what the full url and link will be for each spoke.

7. blogsPerHub: Number (int) - used to determine how many spokes the longtail generator should generate for each hub.

- The following are passed through the 'postsData' Array. This array is an array of objects, where each object represents a hub + all its related spokes.
- The Hub object has the following fields:

1. hub: String (The name or title of the hub page)
2. hubUrl: String (The slug of the hub page)
3. seoMeta: An object with the following properties:
4. seoDescription: String - An seo meta description for the hub
5. seoKeyphrase: String - the keyphrase / word for this hub page.
6. theExcerpt: String - A short 50 word excerpt describing the contents of the page (Not actually necessary for page type in wordpress and wont do anything when imported. )
7. seoTitle: String - the Seo title of the page, generated programaticlly from the websiteName variable and the hub property. Eg COG Digital | small business
8. spokes: Array of objects where each object represents a spoke page and has the following properties:
9. title: String - The title of the spoke
10. slug: String - The slug of the spoke (small-business-websites etc)
11. focusKeyPhrase - This is the 'spoke variant' That was selected by chatGPT from the SEO Matrix for this spoke.
12. seoMeta: Object
13. seoDescription: String - An seo meta description for the hub
14. seoKeyphrase: String - the keyphrase / word for this spoke page.
15. theExcerpt: String - A short 50 word excerpt describing the contents of the page (Not actually necessary for page type in wordpress and wont do anything when imported. )
16. seoTitle: String - the Seo title of the page, generated programaticlly from the websiteName variable and the title property. Eg COG Digital | small business
17. seoMatrix: Object containing the individual strings chosen from the seoMatrix for this particular spoke:
18. targetAudience: String - who this spoke is directed at
19. spokeVariant: String - The spoke variant selected from the SEO matrix
20. customerNeedVariant: String - The value chosen for customer need from the SEO matrix

## Single Hub Generator Input

1. websiteName: String - Should be the website/company name. Used in pretty much every prompt
2. websiteUrl: String (Url) - This is the websites base URL. Eg: https://cogbranding.com.au
3. websiteContext: String - This is to provide context about the company, what they do, perhaps their values, who they service, the services they provide, their values, location, priorities etc etc.
4. generateSeoMeta: Boolean - This is an option to generate yoast seo meta for the page. Default set to true. Doesn't change anything yet, but the boolean itself should control whether or not yoast seo data is populated in the import file.
5. relatedSpokes: Array of objects that should include:
6. spokeTitle: String - The title of the spoke you want to link to (or eventually link to)
7. spokeUrl: String - This is the url of the spoke. Will be used to link to spokes if required.
8. spokeKeyPhrase: String - This will just provide a little bit of context about the Spoke (The focus of the spoke itself).
9. spokeIsLive: Boolean (default false): This boolean controls whether the spoke should be linked to automatically when AI is generating content, or whether to just bold some text that will eventually be a url to link to.
10. highDaBackLinks: Array (of strings (urls)) - This is an array of urls. These urls will be included as links in the introduction and conculsion of blog posts and hub pages.
11. blogFormat: Enum ('wp block', 'div') - Used to determine which function to run for:

## Single Spoke Generator
