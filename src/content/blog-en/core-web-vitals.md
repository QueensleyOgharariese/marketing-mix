---
title: "Core Web Vitals explained simply: LCP, INP and CLS"
description: "What Core Web Vitals measure, the thresholds (LCP 2.5 s, INP 200 ms, CLS 0.1) and the most common causes of a slow page."
date: 2026-10-30
traduzione: "core-web-vitals"
categoria: "basi"
etichetta: "SEO"
formato: "pillola"
tema: "seo"
minuti: 5
ruoloId: "seo"
inBreve:
  - "**Core Web Vitals** are three Google measures of how a page feels: **loading**, **responsiveness** and **stability**."
  - "Good thresholds: **LCP under 2.5 seconds**, **INP under 200 milliseconds**, **CLS under 0.1**."
  - "They're measured on **real visits**, mostly from phones."
consiglio: "Always check the phone data: a site often looks fast from the office computer and painfully slow from a smartphone on the train."
domanda:
  testo: "Product pages have an LCP of 4.1 seconds on phones. What's the most likely cause?"
  opzioni:
    - testo: "The title tag is too long"
    - testo: "The main photo is too heavy"
      giusta: true
    - testo: "Too many words in the description"
  spiegaSi: "LCP measures when the largest element appears, which on product pages is almost always the photo. A photo of a few MB slows everything down."
  spiegaNo: "Title and text weigh almost nothing: LCP nearly always depends on the image or the largest block at the top."
faq:
  - d: "Do Core Web Vitals improve rankings?"
    r: "They're one of many signals, not the most important. But a slow page loses people and sales, even leaving Google aside."
  - d: "Where can I see them?"
    r: "In Search Console's Core Web Vitals report and with PageSpeed Insights, which is free."
  - d: "What was FID?"
    r: "The old responsiveness measure. INP replaced it in March 2024."
argomenti: ["SEO", "Technical SEO"]
---

A page can have perfect text, but if it takes too long to open or "jumps" while you read, people leave. Google measures this experience with three numbers: the **Core Web Vitals**.

## The three measures

| Measure | What it checks | Good | Needs improvement | Poor |
| --- | --- | --- | --- | --- |
| **LCP** (Largest Contentful Paint) | When the largest element appears | up to 2.5 s | 2.5-4 s | over 4 s |
| **INP** (Interaction to Next Paint) | How fast the page responds to a click or tap | up to 200 ms | 200-500 ms | over 500 ms |
| **CLS** (Cumulative Layout Shift) | How much the page moves while loading | up to 0.1 | 0.1-0.25 | over 0.25 |

Google uses data from **real visits** and looks at the 75th percentile: a page "passes" if at least 3 visits out of 4 have good values for all three measures.

## What usually hurts them

- **High LCP**: images that are too heavy, not resized for phones, in old formats.
- **High INP**: too many scripts (chat widgets, ads, tracking tools) keeping the browser busy.
- **High CLS**: images without set dimensions, banners appearing at the top and pushing the text down.

## An example

In the fictional Cinque Foglie shop, the 29 product pages had an LCP of 4.1 seconds on phones. The cause: the main photo, a JPG of about 2.4 MB, the same for computers and phones.

The fix, written as a ticket for the developers:

1. a lighter version of the photo for phones (WebP format);
2. width and height set in the code;
3. goal: LCP under 2.5 seconds.

## Where to start

1. Open the Core Web Vitals report in [Search Console](/en/blog/google-search-console-for-beginners/) and look at the "poor" page groups on mobile.
2. Test one page from that group with PageSpeed Insights: it tells you which element is slowest.
3. Fix one cause at a time and check again after a few weeks: real-world data updates slowly.
