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

export const NewWebsiteSchema = z
  .object({
    name: z
      .string({ required_error: "Website name is required." })
      .min(3, { message: "Website name must be at least 3 characters" }),
    url: z.string().url({ message: "Invalid url" }),
  })
  .required();

export const NewHubSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Hub name must be at least 3 characters" }),
  topic: z
    .string()
    .min(3, { message: "Hub topic must be at least 3 characters" }),
  addToMatrix: z.boolean().optional(),
});

export const createHubSchema = z.object({});

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

export const websiteInfoSchema = z.object({
  websiteName: z
    .string()
    .min(1, { message: "Website Name is required to build import file" }),
  websiteUrl: z
    .string()
    .url({ message: "Base website url is required to build import file" }),
  formatType: z.enum(["wp block", "divi"]),
  tone: z.enum(["lighthearted", "formal"]),
  blogBaseUrl: z
    .string()
    .url({ message: "Base website url is required to build import file" }),
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
