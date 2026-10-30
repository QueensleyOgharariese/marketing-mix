---
title: "How Google finds and ranks pages"
description: "Crawling, indexing and ranking: the three steps a page goes through to appear in Google's results, explained simply."
date: 2026-10-30
traduzione: "come-google-trova-le-pagine"
categoria: "basi"
etichetta: "SEO"
formato: "pillola"
tema: "seo"
minuti: 4
ruoloId: "seo"
inBreve:
  - "**Crawling**: Google visits pages by following links."
  - "**Indexing**: Google reads the page and decides whether to save it in its archive."
  - "**Ranking**: when someone searches, Google picks the most useful pages and puts them in order."
consiglio: "If a page doesn't show up on Google, first ask which of the three steps it got stuck at: the fix changes a lot."
domanda:
  testo: "A new page has no links pointing to it and isn't in the sitemap. What's the risk?"
  opzioni:
    - testo: "That it gets crawled straight away"
    - testo: "That Google doesn't find it"
      giusta: true
    - testo: "That it ranks first"
  spiegaSi: "Google finds pages mainly by following links and reading the sitemap: an isolated page can stay invisible."
  spiegaNo: "With no links and no sitemap, Google has no way to get there: before ranking even comes into play, it may never find the page."
faq:
  - d: "How long does Google take to find a new page?"
    r: "From a few hours to a few weeks. Internal links, the sitemap and requesting indexing in Search Console all help."
  - d: "Does paying for ads help indexing?"
    r: "No. Ads and organic results are separate."
argomenti: ["SEO", "Google"]
---

Every time you search for something, Google answers in under a second. It isn't searching the whole web at that moment: it's searching its own archive, built beforehand in three steps.

## 1. Crawling: finding pages

A Google program (called **Googlebot**) visits pages and follows links from one page to the next. That's why **internal links** matter: a page nobody links to is hard to find.

The **sitemap** helps too: a file listing the site's pages, which you submit to Google in Search Console.

## 2. Indexing: saving pages

Google reads the page content and decides whether to save it in its **index**, the archive results come from. It may decide not to, for example if:

- the page asks not to be indexed (a **noindex**);
- it's almost identical to another page (a duplicate);
- it has little useful content.

How to manage these instructions is explained in [noindex, robots.txt and canonical](/en/blog/noindex-robots-txt-canonical/).

## 3. Ranking: putting pages in order

When someone searches, Google chooses the pages in its index that answer best and puts them in order. It looks at many signals: whether the page matches the **intent**, whether it's trustworthy, whether other sites mention it, whether it works well on a phone.

## An example

In the fictional Cinque Foglie shop, after a website theme change, the herbal tea pages were crawled but **not indexed**: the new theme had added a noindex by mistake. The pages existed and Google visited them, but didn't save them. The problem wasn't ranking: it was the second step.

To see where a real site's pages stand, use [Google Search Console](/en/blog/google-search-console-for-beginners/).
