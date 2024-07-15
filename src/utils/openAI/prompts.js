export const longtailGenerationPrompt = {
  system:
    'You are an Search Engine Optimization expert. Your job is to help users create meaningful hub and spoke pages for their website to aid their SEO strategy. The user will provide you with stringified JSON data that will be delimited by triple quotes. This is an object with 5 properties: "Hubs", "Spoke Variants", "Customer need variants", "Filler words" and "Target Audience". Each of these properties have an array of string values to choose from. Your task is simple: For each "Hub" page topics generate 10 longtail blog titles and their corresponding urls (make sure the urls are comprehendible) using a logical combination of the "Spoke Variant", "Customer need variants", "Filler words" and "Target Audience" values. The blog post has to relate to its corresponding "Hub" value. An example might be: Hub: "small business" - Spoke: "can-google-seo-help-small-business-electrician-companies". Your response should be structured JSON data (an array of objects that group hubs and spokes) in form like this: `{ content: [{hub: "Hub Value", spokes: [{title: "Spoke title", slug: "url for this spoke"}]}]}`. Following this response format is CRITICAL. Make sure that for each "Hub" value you generate 10 spoke ideas',
};

export const expectedResponseFormat = {
  hubs: [
    {
      hub: "small business",
      spokes: [
        {
          title:
            "How WordPress Website Designer Can Elevate Small Businesses in Construction",
          slug: "how-wordpress-website-designer-can-elevate-small-businesses-in-construction",
        },
        {
          title: "Why Shopify Stores are Important for Small Business Retail",
          slug: "why-shopify-stores-are-important-for-small-business-retail",
        },
        {
          title: "Results from Google SEO for Health Care Small Businesses",
          slug: "results-from-google-seo-for-health-care-small-businesses",
        },
        {
          title:
            "What Social Media Marketing Offers Small Business in Real Estate",
          slug: "what-social-media-marketing-offers-small-business-in-real-estate",
        },
        {
          title: "The Value of SEO Services for Electrical Small Businesses",
          slug: "the-value-of-seo-services-for-electrical-small-businesses",
        },
        {
          title:
            "Why Small Businesses Should Consider WordPress Web Design for Increased Competition",
          slug: "why-small-businesses-should-consider-wordpress-web-design-for-increased-competition",
        },
        {
          title:
            "How SEO Marketing Connects Small Business Brands to Customers in Accommodation",
          slug: "how-seo-marketing-connects-small-business-brands-to-customers-in-accommodation",
        },
        {
          title:
            "Who Can Benefit from Shopify Drop Shipping in Small Business Childcare Centres?",
          slug: "who-can-benefit-from-shopify-drop-shipping-in-small-business-childcare-centres",
        },
        {
          title:
            "When Google Ads Will Enhance Small Business Builder's Online Presence",
          slug: "when-google-ads-will-enhance-small-business-builders-online-presence",
        },
        {
          title:
            "Guided By Insights: Social Media Marketing for Small Business Electricians",
          slug: "guided-by-insights-social-media-marketing-for-small-business-electricians",
        },
      ],
    },
    {
      hub: "digital marketing agency",
      spokes: [
        {
          title:
            "How WordPress Web Developers at a Digital Marketing Agency Benefit Health Care Clients",
          slug: "how-wordpress-web-developers-at-a-digital-marketing-agency-benefit-health-care-clients",
        },
        {
          title:
            "Social Media Advertising Solutions from a Digital Marketing Agency for Retail Businesses",
          slug: "social-media-advertising-solutions-from-a-digital-marketing-agency-for-retail-businesses",
        },
        {
          title:
            "Why Google Advertising Services from a Digital Marketing Agency Are Key for Growing Accommodation Businesses",
          slug: "why-google-advertising-services-from-a-digital-marketing-agency-are-key-for-growing-accommodation-businesses",
        },
        {
          title:
            "SEO Optimisation Insights for Real Estate Provided by a Digital Marketing Agency",
          slug: "seo-optimisation-insights-for-real-estate-provided-by-a-digital-marketing-agency",
        },
        {
          title:
            "WordPress Web Design Experts at Digital Marketing Agencies for Construction Firms",
          slug: "wordpress-web-design-experts-at-digital-marketing-agencies-for-construction-firms",
        },
        {
          title:
            "How Shopify Websites Created by Digital Marketing Agencies Increase Electrician's Online Sales",
          slug: "how-shopify-websites-created-by-digital-marketing-agencies-increase-electricians-online-sales",
        },
        {
          title:
            "Partnership with a Digital Marketing Agency to Boost SEO for Childcare Centres",
          slug: "partnership-with-a-digital-marketing-agency-to-boost-seo-for-childcare-centres",
        },
        {
          title:
            "Google SEO Strategies from Digital Marketing Agencies for Builder's Competitive Edge",
          slug: "google-seo-strategies-from-digital-marketing-agencies-for-builders-competitive-edge",
        },
        {
          title:
            "Effective Social Media Manager Roles within Digital Marketing Agencies Targeting Real Estate",
          slug: "effective-social-media-manager-roles-within-digital-marketing-agencies-targeting-real-estate",
        },
        {
          title:
            "The Role of SEO Services from Digital Marketing Agencies in Financial Management for Retail",
          slug: "the-role-of-seo-services-from-digital-marketing-agencies-in-financial-management-for-retail",
        },
      ],
    },
    {
      hub: "digital agency",
      spokes: [
        {
          title:
            "Why Digital Agencies are Great Partners for Financial Management in Construction",
          slug: "why-digital-agencies-are-great-partners-for-financial-management-in-construction",
        },
        {
          title:
            "Shopify Store Development from Digital Agencies: Solutions for the Retail Sector",
          slug: "shopify-store-development-from-digital-agencies-solutions-for-the-retail-sector",
        },
        {
          title:
            "How Google Ads from Digital Agencies Enhance Health Care Business Visibility",
          slug: "how-google-ads-from-digital-agencies-enhance-health-care-business-visibility",
        },
        {
          title:
            "Why Real Estate Firms Should Use Digital Agencies for Social Media Advertising",
          slug: "why-real-estate-firms-should-use-digital-agencies-for-social-media-advertising",
        },
        {
          title:
            "Digital Agencies Offering Expert SEO Marketing Services for Accommodation Businesses",
          slug: "digital-agencies-offering-expert-seo-marketing-services-for-accommodation-businesses",
        },
        {
          title:
            "The Importance of WordPress Web Developer Expertise from Digital Agencies for Builders",
          slug: "the-importance-of-wordpress-web-developer-expertise-from-digital-agencies-for-builders",
        },
        {
          title:
            "Shopify Drop Shipping Solutions for Electricians Provided by Digital Agencies",
          slug: "shopify-drop-shipping-solutions-for-electricians-provided-by-digital-agencies",
        },
        {
          title:
            "How Digital Agencies Improve SEO Optimisation for Childcare Centres",
          slug: "how-digital-agencies-improve-seo-optimisation-for-childcare-centres",
        },
        {
          title:
            "Digital Agency Support for Social Media Management in Real Estate",
          slug: "digital-agency-support-for-social-media-management-in-real-estate",
        },
        {
          title:
            "The Role of Google SEO from Digital Agencies in Enhancing Brand Connection for Health Care",
          slug: "the-role-of-google-seo-from-digital-agencies-in-enhancing-brand-connection-for-health-care",
        },
      ],
    },
    {
      hub: "website designer",
      spokes: [
        {
          title:
            "How WordPress Website Designers Create Valuable Online Presence for Retail",
          slug: "how-wordpress-website-designers-create-valuable-online-presence-for-retail",
        },
        {
          title:
            "What Shopify Websites Offer Real Estate Businesses with Increased Competition",
          slug: "what-shopify-websites-offer-real-estate-businesses-with-increased-competition",
        },
        {
          title:
            "Results from SEO Optimisation by Website Designers for Accommodation Sector",
          slug: "results-from-seo-optimisation-by-website-designers-for-accommodation-sector",
        },
        {
          title:
            "Why Google Ads Are Crucial for Website Designers Targeting Construction",
          slug: "why-google-ads-are-crucial-for-website-designers-targeting-construction",
        },
        {
          title:
            "The Value of WordPress Web Development for Builders Offered by Website Designers",
          slug: "the-value-of-wordpress-web-development-for-builders-offered-by-website-designers",
        },
        {
          title:
            "Social Media Marketing Strategies by Website Designers for Electricians",
          slug: "social-media-marketing-strategies-by-website-designers-for-electricians",
        },
        {
          title:
            "How Website Designers Create Effective Shopify Drop Shipping for Childcare Centres",
          slug: "how-website-designers-create-effective-shopify-drop-shipping-for-childcare-centres",
        },
        {
          title:
            "Why SEO Services Offered by Website Designers Are Perfect for Financial Management",
          slug: "why-seo-services-offered-by-website-designers-are-perfect-for-financial-management",
        },
        {
          title:
            "Partnership with Website Designers for Google Advertising in Health Care",
          slug: "partnership-with-website-designers-for-google-advertising-in-health-care",
        },
        {
          title:
            "How Website Designers Help Real Estate Firms Connect Brands to Customers through WordPress Web Design",
          slug: "how-website-designers-help-real-estate-firms-connect-brands-to-customers-through-wordpress-web-design",
        },
      ],
    },
    {
      hub: "web development",
      spokes: [
        {
          title: "How WordPress Web Developers Enhance Real Estate Websites",
          slug: "how-wordpress-web-developers-enhance-real-estate-websites",
        },
        {
          title:
            "The Benefits of Shopify Stores for Health Care Created Through Web Development",
          slug: "the-benefits-of-shopify-stores-for-health-care-created-through-web-development",
        },
        {
          title:
            "SEO Marketing Technologies in Web Development for Retail Businesses",
          slug: "seo-marketing-technologies-in-web-development-for-retail-businesses",
        },
        {
          title:
            "Why Google SEO in Web Development is Important for Financial Management",
          slug: "why-google-seo-in-web-development-is-important-for-financial-management",
        },
        {
          title:
            "Social Media Advertising for Construction by Experienced Web Developers",
          slug: "social-media-advertising-for-construction-by-experienced-web-developers",
        },
        {
          title: "The Role of SEO Services in Web Development for Electricians",
          slug: "the-role-of-seo-services-in-web-development-for-electricians",
        },
        {
          title:
            "How Web Development Integrates WordPress Website Design for Childcare Centres",
          slug: "how-web-development-integrates-wordpress-website-design-for-childcare-centres",
        },
        {
          title: "Shopify Drop Shipping Developed for Accommodation Businesses",
          slug: "shopify-drop-shipping-developed-for-accommodation-businesses",
        },
        {
          title:
            "When Social Media Managers Should Use Web Development to Connect Brands to Customers",
          slug: "when-social-media-managers-should-use-web-development-to-connect-brands-to-customers",
        },
        {
          title: "Effective Google Advertising in Web Development for Builders",
          slug: "effective-google-advertising-in-web-development-for-builders",
        },
      ],
    },
    {
      hub: "seo agency",
      spokes: [
        {
          title:
            "Why SEO Optimisation by SEO Agencies is Critical for Health Care Providers",
          slug: "why-seo-optimisation-by-seo-agencies-is-critical-for-health-care-providers",
        },
        {
          title: "SEO Services for Real Estate Offered by Leading SEO Agencies",
          slug: "seo-services-for-real-estate-offered-by-leading-seo-agencies",
        },
        {
          title:
            "How SEO Agencies Provide Google SEO to Compete in the Retail Market",
          slug: "how-seo-agencies-provide-google-seo-to-compete-in-the-retail-market",
        },
        {
          title:
            "The Value of a Partnership with an SEO Agency for Construction Businesses",
          slug: "the-value-of-a-partnership-with-an-seo-agency-for-construction-businesses",
        },
        {
          title:
            "Why Accommodation Businesses Trust SEO Marketing from Experienced SEO Agencies",
          slug: "why-accommodation-businesses-trust-seo-marketing-from-experienced-seo-agencies",
        },
        {
          title:
            "SEO Agencies Enhance Social Media Advertising Strategies for Builders",
          slug: "seo-agencies-enhance-social-media-advertising-strategies-for-builders",
        },
        {
          title:
            "Why Childcare Centres Rely on SEO Services from Top SEO Agencies",
          slug: "why-childcare-centres-rely-on-seo-services-from-top-seo-agencies",
        },
        {
          title:
            "How Electricians Can Leverage SEO Marketing from SEO Agencies",
          slug: "how-electricians-can-leverage-seo-marketing-from-seo-agencies",
        },
        {
          title:
            "Effective SEO Strategies by SEO Agencies for Financial Management in Retail",
          slug: "effective-seo-strategies-by-seo-agencies-for-financial-management-in-retail",
        },
        {
          title:
            "Understanding the Benefits of Google SEO for SEO Agency Clients in Real Estate",
          slug: "understanding-the-benefits-of-google-seo-for-seo-agency-clients-in-real-estate",
        },
      ],
    },
  ],
};
