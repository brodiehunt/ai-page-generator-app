import xmlbuilder from "xmlbuilder";

// Need unique timestamp in order to import multiple pages/posts??
function generateUniqueDate(index) {
  const baseDate = new Date(); // Start from the current date
  baseDate.setSeconds(baseDate.getSeconds() + index); // Increment the date by a unique amount of seconds
  return baseDate.toISOString().replace("T", " ").replace(/\..+/, "");
}

function generateUniqueID(startID, index) {
  return startID + index;
}

// Create the XML doc, return the rss feed and channel so it can be passes to the functions below.
export const initiateXmlDoc = (websiteName, websiteUrl) => {
  const rss = xmlbuilder
    .create("rss", { version: "1.0", encoding: "UTF-8" })
    .att("version", "2.0")
    .att("xmlns:excerpt", "http://wordpress.org/export/1.2/excerpt/")
    .att("xmlns:content", "http://purl.org/rss/1.0/modules/content/")
    .att("xmlns:wfw", "http://wellformedweb.org/CommentAPI/")
    .att("xmlns:dc", "http://purl.org/dc/elements/1.1/")
    .att("xmlns:wp", "http://wordpress.org/export/1.2/");

  const channel = rss.ele("channel");
  channel.ele("title", {}, `${websiteName}`);
  channel.ele("link", {}, `${websiteUrl}`);
  channel.ele("description", {}, "This is the site descriptions");
  channel.ele("pubDate", {}, new Date().toUTCString());
  channel.ele("wp:wxr_version", {}, "1.2");
  channel.ele("wp:base_site_url", {}, `${websiteUrl}`);

  return { rss, channel };
};

// Build the item element for xml file for Post item (WP Block)
export const addSingleBlogItem = (data, channel, index) => {
  const blogDataObj = buildPostDataObj(data);
  const uniqueID = generateUniqueID(1000, index);
  const uniqueDate = generateUniqueDate(index);

  const item = channel.ele("item");
  item.ele("title", {}, blogDataObj.title);
  item.ele("link", {}, blogDataObj.link);
  item.ele("pubDate", {}, new Date(uniqueDate).toUTCString());
  item.ele("dc:creator", {}, blogDataObj.author);
  item.ele("guid", { isPermaLink: "false" }, blogDataObj.guid);
  item.ele("description", {}, blogDataObj.excerpt);
  item.ele("content:encoded", {}, `${blogDataObj.content}`);
  item.ele("excerpt:encoded").dat(blogDataObj.excerpt);
  item.ele("wp:post_id", {}, uniqueID);
  item.ele("wp:post_date", {}, uniqueDate);
  item.ele("wp:post_date_gmt", {}, uniqueDate);
  item.ele("wp:comment_status", {}, blogDataObj.comment_status);
  item.ele("wp:ping_status", {}, blogDataObj.ping_status);
  item.ele("wp:post_name", {}, blogDataObj.slug);
  item.ele("wp:status", {}, blogDataObj.status);
  item.ele("wp:post_parent", {}, blogDataObj.parent);
  item.ele("wp:menu_order", {}, blogDataObj.menu_order);
  item.ele("wp:post_type", {}, blogDataObj.type);

  // Adding Yoast SEO meta fields
  const meta = blogDataObj.meta;
  Object.keys(meta).forEach((key) => {
    const metaItem = item.ele("wp:postmeta");
    metaItem.ele("wp:meta_key", {}, key);
    metaItem.ele("wp:meta_value", {}, meta[key]);
  });
};

// Build the item element for xml file for post item (divi)
export const addSingleBlogItemDivi = (data, channel, index) => {
  const blogDataObj = buildPostDataObj(data);
  const uniqueID = generateUniqueID(1000, index);
  const uniqueDate = generateUniqueDate(index);

  const item = channel.ele("item");
  item.ele("title").dat(blogDataObj.title);
  item.ele("link", blogDataObj.link);
  item.ele("pubDate", {}, new Date(uniqueDate).toUTCString());
  item.ele("dc:creator").dat(blogDataObj.author);
  item.ele("guid", { isPermaLink: "false" }, blogDataObj.guid);
  item.ele("description").dat(blogDataObj.meta._yoast_wpseo_metadesc);
  item.ele("content:encoded").dat(blogDataObj.content);
  item.ele("excerpt:encoded").dat(blogDataObj.excerpt);
  item.ele("wp:post_id", uniqueID);
  item.ele("wp:post_date").dat(uniqueDate);
  item.ele("wp:post_date_gmt").dat(uniqueDate);
  item.ele("wp:post_modified").dat(uniqueDate);
  item.ele("wp:post_modified_gmt").dat(uniqueDate);
  item.ele("wp:comment_status").dat("closed");
  item.ele("wp:ping_status").dat("closed");
  item.ele("wp:post_name").dat(blogDataObj.slug);
  item.ele("wp:status").dat(blogDataObj.status);
  item.ele("wp:post_parent", blogDataObj.parent);
  item.ele("wp:menu_order", blogDataObj.menu_order);
  item.ele("wp:post_type").dat(blogDataObj.type);
  item.ele("wp:post_password");
  item.ele("wp:is_sticky", "0");
  item.ele("category", { domain: "category", nicename: "news" }).dat("News");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_edit_last");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("3");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_post_bg_color");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("#ffffff");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_post_bg_layout");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("light");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_show_title");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("on");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_post_hide_nav");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("default");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_page_layout");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("et_full_width");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_side_nav");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("off");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_use_builder");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("on");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_first_image");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_truncate_post");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_truncate_post_date");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_old_content");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item
    .ele("wp:postmeta")
    .ele("wp:meta_key")
    .dat("_yoast_wpseo_primary_category");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item
    .ele("wp:postmeta")
    .ele("wp:meta_key")
    .dat("_yoast_wpseo_estimated-reading-time-minutes");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("0");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_built_for_post_type");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("page");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_ab_subjects");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item
    .ele("wp:postmeta")
    .ele("wp:meta_key")
    .dat("_et_pb_enable_shortcode_tracking");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_ab_current_shortcode");
  item
    .ele("wp:postmeta")
    .ele("wp:meta_value")
    .dat('[et_pb_split_track id="26203" /]');

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_custom_css");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_gutter_width");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("2");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_global_colors_info");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("{}");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_builder_version");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("VB|Divi|4.27.0");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_show_page_creation");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("off");

  // Adding Yoast SEO meta fields
  const meta = blogDataObj.meta;
  Object.keys(meta).forEach((key) => {
    const metaItem = item.ele("wp:postmeta");
    metaItem.ele("wp:meta_key", {}, key);
    metaItem.ele("wp:meta_value", {}, meta[key]);
  });
};

// Build the item element for xml file for page item (WP Block)
export const addSinglePageItem = (data, channel, index) => {
  const pageDataObj = buildPageDataObj(data);
  const uniqueID = generateUniqueID(1000, index);
  const uniqueDate = generateUniqueDate(index);

  const item = channel.ele("item");
  item.ele("title", {}, pageDataObj.title);
  item.ele("link", {}, pageDataObj.link);
  item.ele("pubDate", {}, new Date(uniqueDate).toUTCString());
  item.ele("dc:creator", {}, pageDataObj.author);
  item.ele("guid", { isPermaLink: "false" }, pageDataObj.guid);
  item.ele("description", {}, pageDataObj.excerpt);
  item.ele("content:encoded", {}, `${pageDataObj.content}`);
  item.ele("excerpt:encoded").dat(pageDataObj.excerpt);
  item.ele("wp:post_id", {}, uniqueID);
  item.ele("wp:post_date", {}, uniqueDate);
  item.ele("wp:post_date_gmt", {}, uniqueDate);
  item.ele("wp:comment_status", {}, pageDataObj.comment_status);
  item.ele("wp:ping_status", {}, pageDataObj.ping_status);
  item.ele("wp:post_name", {}, pageDataObj.slug);
  item.ele("wp:status", {}, pageDataObj.status);
  item.ele("wp:post_parent", {}, pageDataObj.parent);
  item.ele("wp:menu_order", {}, pageDataObj.menu_order);
  item.ele("wp:post_type", {}, pageDataObj.type);

  // Adding Yoast SEO meta fields
  const meta = pageDataObj.meta;
  Object.keys(meta).forEach((key) => {
    if (meta[key]) {
      const metaItem = item.ele("wp:postmeta");
      metaItem.ele("wp:meta_key", {}, key);
      metaItem.ele("wp:meta_value", {}, meta[key]);
    }
  });
};

// Build the item element for xml file for page item (divi)
export const addSinglePageItemDivi = (data, channel, index) => {
  const pageDataObj = buildPageDataObj(data);
  const uniqueID = generateUniqueID(1000, index);
  const uniqueDate = generateUniqueDate(index);

  const item = channel.ele("item");
  item.ele("title").dat(pageDataObj.title);
  item.ele("link", pageDataObj.link);
  item.ele("pubDate", {}, new Date(uniqueDate).toUTCString());
  item.ele("dc:creator").dat(pageDataObj.author);
  item.ele("guid", { isPermaLink: "false" }, pageDataObj.guid);
  item.ele("description").dat(pageDataObj.meta._yoast_wpseo_metadesc);
  item.ele("content:encoded").dat(pageDataObj.content);
  item.ele("excerpt:encoded").dat(pageDataObj.excerpt);
  item.ele("wp:post_id", uniqueID);
  item.ele("wp:post_date").dat(uniqueDate);
  item.ele("wp:post_date_gmt").dat(uniqueDate);
  item.ele("wp:post_modified").dat(uniqueDate);
  item.ele("wp:post_modified_gmt").dat(uniqueDate);
  item.ele("wp:comment_status").dat("closed");
  item.ele("wp:ping_status").dat("closed");
  item.ele("wp:post_name").dat(pageDataObj.slug);
  item.ele("wp:status").dat(pageDataObj.status);
  item.ele("wp:post_parent", pageDataObj.parent);
  item.ele("wp:menu_order", pageDataObj.menu_order);
  item.ele("wp:post_type").dat(pageDataObj.type);
  item.ele("wp:post_password");
  item.ele("wp:is_sticky", "0");
  item.ele("category", { domain: "category", nicename: "news" }).dat("News");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_edit_last");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("3");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_post_bg_color");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("#ffffff");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_post_bg_layout");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("light");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_show_title");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("on");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_post_hide_nav");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("default");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_page_layout");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("et_full_width");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_side_nav");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("off");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_use_builder");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("on");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_first_image");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_truncate_post");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_truncate_post_date");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_old_content");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item
    .ele("wp:postmeta")
    .ele("wp:meta_key")
    .dat("_yoast_wpseo_primary_category");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item
    .ele("wp:postmeta")
    .ele("wp:meta_key")
    .dat("_yoast_wpseo_estimated-reading-time-minutes");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("0");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_built_for_post_type");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("page");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_ab_subjects");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item
    .ele("wp:postmeta")
    .ele("wp:meta_key")
    .dat("_et_pb_enable_shortcode_tracking");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_ab_current_shortcode");
  item
    .ele("wp:postmeta")
    .ele("wp:meta_value")
    .dat('[et_pb_split_track id="26203" /]');

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_custom_css");
  item.ele("wp:postmeta").ele("wp:meta_value");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_gutter_width");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("2");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_global_colors_info");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("{}");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_builder_version");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("VB|Divi|4.27.0");

  item.ele("wp:postmeta").ele("wp:meta_key").dat("_et_pb_show_page_creation");
  item.ele("wp:postmeta").ele("wp:meta_value").dat("off");

  // Adding Yoast SEO meta fields
  const meta = pageDataObj.meta;
  Object.keys(meta).forEach((key) => {
    if (meta[key]) {
      const metaItem = item.ele("wp:postmeta");
      metaItem.ele("wp:meta_key", {}, key);
      metaItem.ele("wp:meta_value", {}, meta[key]);
    }
  });
};

// Just combining user input data with predefined values into one returned object for pages.
const buildPageDataObj = (data) => {
  const page = {
    title: data.hubName,
    link: `${data.baseUurl + "/" + data.slug}`,
    author: "admin",
    guid: `${data.baseUrl + "/" + data.slug}`,
    excerpt: data.excerpt,
    content: data.content,
    comment_status: "closed",
    ping_status: "closed",
    slug: data.slug,
    status: "draft",
    parent: 0,
    menu_order: 0,
    type: "page",
    meta: {
      _yoast_wpseo_focuskw: `${data.seoKeyphrase}`,
      _yoast_wpseo_title: `${data.seoTitle}`,
      _yoast_wpseo_metadesc: `${data.seoDescription}`,
    },
  };

  return page;
};

// Just combining user input data with predefined values into one returned object for posts.
const buildPostDataObj = (data) => {
  const post = {
    title: data.blogName,
    link: `${data.baseUrl + "/" + data.slug}`,
    author: "admin",
    guid: `${data.baseUrl + "/" + data.slug}`,
    excerpt: data.excerpt,
    content: data.content,
    comment_status: "closed",
    ping_status: "closed",
    slug: data.slug,
    status: "draft",
    parent: 0,
    menu_order: 0,
    type: "post",
    meta: {
      _yoast_wpseo_focuskw: `${data.seoKeyphrase}`,
      _yoast_wpseo_title: `${data.seoTitle}`,
      _yoast_wpseo_metadesc: `${data.seoDescription}`,
    },
  };

  return post;
};
