import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

// Used to validate SEO schema values before hitting api for longtails.
/*
 Used In:
 1. All in one generator 'generate longtails event handler'
 2. All in one generator 'regenerate longtails event handler'
*/
export const seoMatrixSchema = z
  .object({
    hubs: z
      .string()
      .min(1, { message: "At least one hub is required" })
      .transform((string) => string.split(",").map((string) => string.trim())),
    spokeVariants: z
      .string()
      .min(1, { message: "At least one spoke variant is required" })
      .transform((string) => string.split(",").map((string) => string.trim())),
    customerNeedVariants: z
      .string()
      .min(1, { message: "At least one customer need is required" })
      .transform((string) => string.split(",").map((string) => string.trim())),
    fillerWords: z
      .string()
      .min(1, { message: "At least one customer need is required" })
      .transform((string) => string.split(",").map((string) => string.trim())),
    targetAudience: z
      .string()
      .min(1, { message: "At least one customer need is required" })
      .transform((string) => string.split(",").map((string) => string.trim())),
  })
  .required();

/*
  Used in all in one generator page
*/
export const websiteInfoSchema = z.object({
  websiteName: z
    .string()
    .min(1, { message: "Website Name is required to build import file" }),
  websiteUrl: z
    .string()
    .url({ message: "Base website url is required to build import file" })
    .refine((value) => !value.endsWith("/"), {
      message: "Base website URL should not end with a '/'",
    }),
  formatType: z.enum(["wp block", "divi"]),
  tone: z.enum(["lighthearted", "formal"]),
  blogBaseUrl: z
    .string()
    .url({ message: "Base website blog url is required to build import file" })
    .refine((value) => !value.endsWith("/"), {
      message: "Base website blog URL should not end with a '/'",
    }),
  blogsPerHub: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Invalid input" })
    .pipe(
      z
        .number()
        .min(1, { message: "Number must be greater than 0" })
        .max(10, { message: "Number must be less than or equal to 10" })
    ),
  websiteContext: z
    .string()
    .min(1, { message: "Company Context is required to build import file" }),
});

/*
  Hub schema validation for form in 'edit hub' modal
*/
export const HubSchema = z.object({
  id: z.string().min(1, { message: "ID has not been configured." }),
  hub: z.string().min(1, { message: "Title is required" }),
  hubUrl: z.string().min(1, { message: "Slug is required" }),
  seoMeta: z.object({
    seoTitle: z.string().min(1, { message: "SEO Title is required" }),
    seoDescription: z
      .string()
      .min(1, { message: "SEO description is required" }),
    seoKeyphrase: z.string().min(1, { message: "SEO Keyword is required" }),
    theExcerpt: z.string().min(1, { message: "An Excerpt is required" }),
  }),
  spokes: z.array(z.any()),
});

/*
  Spoke schema validation for form in 'edit spoke' modal
*/
export const SpokeSchema = z.object({
  id: z.string().min(1, { message: "ID has not been configured." }),
  focusKeyPhrase: z
    .string()
    .min(1, { message: "Focus Key Phrase is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  seoMeta: z.object({
    seoTitle: z.string().min(1, { message: "SEO Title is required" }),
    seoDescription: z
      .string()
      .min(1, { message: "SEO description is required" }),
    seoKeyphrase: z.string().min(1, { message: "SEO Keyword is required" }),
    theExcerpt: z.string().min(1, { message: "An Excerpt is required" }),
  }),
  seoMatrix: z.object({
    customerNeedVariant: z
      .string()
      .min(1, { message: "customer need variant is required" }),
    spokeVariant: z.string().min(1, { message: "spoke variant is required" }),
    targetAudience: z
      .string()
      .min(1, { message: "Target audience is required" }),
  }),
});

/*
  Used on Generate Longtail page in form onSubmit handler. 
*/
export const generateLongtailFormSchema = z.object({
  blogsPerHub: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Invalid input" })
    .pipe(
      z
        .number()
        .min(1, { message: "Number must be greater than 0" })
        .max(10, { message: "Number must be less than or equal to 10" })
    ),
  websiteContext: z
    .string()
    .min(1, { message: "Website Context is required to generate longtails" }),
  hubs: z
    .string()
    .min(1, { message: "At least one hub is required" })
    .transform((string) => string.split(",").map((string) => string.trim())),
  spokeVariants: z
    .string()
    .min(1, { message: "At least one spoke variant is required" })
    .transform((string) => string.split(",").map((string) => string.trim())),
  customerNeedVariants: z
    .string()
    .min(1, { message: "At least one customer need is required" })
    .transform((string) => string.split(",").map((string) => string.trim())),
  fillerWords: z
    .string()
    .min(1, { message: "At least one customer need is required" })
    .transform((string) => string.split(",").map((string) => string.trim())),
  targetAudience: z
    .string()
    .min(1, { message: "At least one customer need is required" })
    .transform((string) => string.split(",").map((string) => string.trim())),
});

/*
  Spoke schema validation for form in Generate Spoke Page
*/
export const singleBlogSchema = z.object({
  websiteName: z.string().min(1, "Website Name is required"),
  websiteUrl: z
    .string()
    .url("Invalid URL")
    .refine((value) => !value.endsWith("/"), {
      message: "Base website URL should not end with a '/'",
    }),
  websiteContext: z.string().min(1, "Website Context is required"),
  spokeTitle: z.string().min(1, "Spoke Title is required"),
  spokeSlug: z.string().min(1, "Spoke Slug is required"),
  spokeKeyphrase: z.string().min(1, "Spoke Keyphrase is required"),
  spokeTargetAudience: z.string().min(1, "Spoke Target Audience is required"),
  generateSeoMeta: z.boolean(),
  hubName: z.string().min(1, "Hub Name is required"),
  hubUrl: z
    .string()
    .url("Invalid URL")
    .refine((value) => !value.endsWith("/"), {
      message: "Base website URL should not end with a '/'",
    }),
  highDaBackLinks: z.array(z.string().url("Invalid URL")).optional(),
  relatedSpokes: z
    .array(
      z.object({
        spokeTitle: z.string().min(1, "Spoke Title is required"),
        spokeUrl: z.string().url("Invalid URL"),
        spokeKeyPhrase: z
          .string()
          .min(1, { message: "spokeKeyphrase is required" }),
        spokeIsLive: z.boolean(),
      })
    )
    .optional(),
  blogFormat: z.enum(["wp block", "divi"]).default("wp block"),
});

/*
  Hub schema validation for form in Generate Hub Page
*/
export const singleHubSchema = z.object({
  websiteName: z.string().min(1, "Website Name is required"),
  websiteUrl: z
    .string()
    .url("Invalid URL")
    .refine((value) => !value.endsWith("/"), {
      message: "Base website URL should not end with a '/'",
    }),
  websiteContext: z.string().min(1, "Website Context is required"),
  generateSeoMeta: z.boolean(),
  hubName: z.string().min(1, "Hub Name is required"),
  hubUrl: z.string().min(1, "Hub Slug is required"),
  highDaBackLinks: z.array(z.string().url("Invalid URL")).optional(),
  relatedSpokes: z
    .array(
      z.object({
        spokeTitle: z.string().min(1, "Spoke Title is required"),
        spokeUrl: z
          .string()
          .url("Invalid URL")
          .refine((value) => !value.endsWith("/"), {
            message: "Base website URL should not end with a '/'",
          }),
        spokeKeyPhrase: z
          .string()
          .min(1, { message: "spokeKeyphrase is required" }),
        spokeIsLive: z.boolean(),
      })
    )
    .optional(),
  blogFormat: z.enum(["wp block", "divi"]).default("wp block"),
});

/*
  Schema to validate highDa Back links on the All in one generator back. 
*/
export const highDaBackLinksSchema = z
  .array(
    z.object({
      id: z.string(),
      url: z.string().url(),
    })
  )
  .optional();
