---
title: "Google Search Console for beginners"
description: "What Google Search Console is, how to set it up and which reports to check first: performance, pages, URL inspection and Core Web Vitals."
date: 2026-10-30
traduzione: "search-console-per-chi-inizia"
categoria: "basi"
etichetta: "SEO"
formato: "guida"
tema: "seo"
minuti: 7
ruoloId: "seo"
inBreve:
  - "**Search Console** is Google's free tool showing how your site appears in search."
  - "The **Performance** report shows clicks, impressions, CTR and average position, by query and by page."
  - "The **Pages** report shows which pages are on Google and why the others aren't."
consiglio: "When clicks drop, always compare with the same period last year: many searches change with the seasons."
domanda:
  testo: "A page has 10,000 impressions and 50 clicks. What does that tell you?"
  opzioni:
    - testo: "That Google doesn't show it"
    - testo: "That it appears often but few people click: the title and description need work"
      giusta: true
    - testo: "That the page isn't indexed"
  spiegaSi: "A 0.5% CTR: the page is seen but doesn't convince. Rewriting the title tag and meta description is often enough."
  spiegaNo: "10,000 impressions means it's indexed and appearing: the problem is that few people choose to click."
faq:
  - d: "Is Search Console paid?"
    r: "No, it's free. You need a Google account and to prove you manage the site."
  - d: "How far back does the data go?"
    r: "The Performance report shows up to 16 months: enough to compare a month with the same month last year."
  - d: "Are Search Console and Google Analytics the same thing?"
    r: "No. Search Console tells you what happens on Google, before the click. Analytics tells you what people do on the site, after the click."
argomenti: ["SEO", "Google", "Tools"]
---

If you work in SEO, Search Console is the first tab you open in the morning. It's free, it's made by Google and it answers the most important question: **how does Google see my site?**

## How to set it up

1. Go to Search Console with a Google account.
2. Add your site (the "property").
3. Prove it's yours: usually with a DNS record on the domain or a file uploaded to the site.
4. Submit your **sitemap**, the file listing your pages.

Data starts to appear over the following days.

## The 4 reports to know first

### 1. Performance

Shows, for every query and every page:

| Number | What it means |
| --- | --- |
| **Impressions** | How many times the site appeared in results |
| **Clicks** | How many times someone clicked |
| **CTR** | Clicks ÷ impressions: how convincing the result is |
| **Average position** | Where it appears, on average |

You can filter by date range, page, country and device, and compare two periods.

### 2. Pages (indexing)

Tells you how many pages are on Google and, for the others, **why not**: excluded by a noindex, not found (404), duplicates without a canonical, crawled but not indexed. After fixing a problem you can ask Google to **validate the fix**. The difference between noindex and canonical is explained in [noindex, robots.txt and canonical](/en/blog/noindex-robots-txt-canonical/).

### 3. URL Inspection

Type a page's URL and see what Google knows about it: whether it's indexed, when it was last crawled, which canonical Google chose. From here you can **request indexing** of a new or updated page.

### 4. Core Web Vitals

Groups pages into good, needs improvement and poor, for mobile and desktop. What they measure is explained in [Core Web Vitals explained simply](/en/blog/core-web-vitals/).

## A 10-minute routine

1. **Performance**: clicks and impressions compared with last month and last year.
2. **Pages**: any new exclusion reasons?
3. **Your key pages**: a quick URL inspection of the two or three pages that sell most.

## An example

In the fictional Cinque Foglie shop, clicks from Google dropped in October. The Performance report showed two different causes: fewer searches for iced teas (normal, it happens every autumn) and herbal teas almost gone. The Pages report explained why: since the theme change, the herbal tea pages had a noindex. One real problem and one seasonal one, only told apart by looking at the data.

Marketing Mix's SEO Simulation has a search console inspired by Search Console, with these reports and invented but consistent data.
