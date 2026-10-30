---
title: "Noindex, robots.txt and canonical: the differences"
description: "Noindex, robots.txt and canonical tags do different jobs. When to use each one, common mistakes and an example from an online shop."
date: 2026-10-30
traduzione: "noindex-robots-txt-canonical"
categoria: "basi"
etichetta: "SEO"
formato: "guida"
tema: "seo"
minuti: 6
ruoloId: "seo"
inBreve:
  - "**robots.txt** tells Google which parts of the site **not to visit**."
  - "**noindex** tells Google **not to show** a page in the results."
  - "**canonical** tells Google **which is the main version** of near-identical pages."
consiglio: "Don't block a noindex page in robots.txt: if Google can't visit it, it can't see the noindex, and the page may stay in the results."
domanda:
  testo: "You want to remove the cart page from Google's results. What do you use?"
  opzioni:
    - testo: "A block in robots.txt"
    - testo: "A noindex on the page"
      giusta: true
    - testo: "A canonical pointing to the home page"
  spiegaSi: "Noindex is the instruction for keeping a page out of the results. Google must be able to visit the page to read it."
  spiegaNo: "robots.txt blocks the visit, not the presence in results; canonical is for near-identical pages, and the cart isn't a copy of the home page."
faq:
  - d: "Is the canonical an order?"
    r: "No, it's a hint. Google usually follows it, but can pick another page if the signals are confusing (for example internal links pointing to a different version)."
  - d: "Does robots.txt protect private pages?"
    r: "No. It's a public file anyone can read. Private pages are protected with a password."
argomenti: ["SEO", "Technical SEO"]
---

Three tools with strange names, often mixed up. They all **guide Google**, but at different moments: before the visit, after the visit, and when there are copies.

## Side by side

| | robots.txt | noindex | canonical |
| --- | --- | --- | --- |
| **What it is** | A file at the root of the site | An instruction in the page | A link in the page |
| **Tells Google** | "Don't visit here" | "Don't show this page" | "The main page is this other one" |
| **When to use it** | Areas not worth visiting (endless filters, internal search) | Pages not needed in results (cart, account area, thank-you pages) | Near-identical pages (filters, parameters, print versions) |
| **Watch out** | Doesn't remove pages from results | Google must be able to visit the page | It's a hint, not an order |

## robots.txt

It's a text file at `/robots.txt`. It tells search engine programs which paths not to visit. Example:

```
User-agent: *
Disallow: /search/
Sitemap: https://www.example.com/sitemap.xml
```

It stops Google wasting visits on useless pages. It does **not** hide a page from the results: if other sites link to it, it may still appear, without a description.

## noindex

It's an instruction in the page's code:

```
<meta name="robots" content="noindex">
```

Google visits the page, reads the noindex and removes it from the results. It's the right choice for the cart, the account area and order confirmation pages.

The most dangerous mistake: a **noindex added by accident** to important pages, for example after a theme change or when a staging site goes live. The pages disappear from Google within a few weeks.

## canonical

When several URLs show almost the same content, for example `/green-teas/` and `/green-teas/?sort=price`, you indicate the main version:

```
<link rel="canonical" href="https://www.example.com/green-teas/">
```

That way Google concentrates the signals on one page instead of splitting them across the copies.

## An example: Cinque Foglie

In Marketing Mix's fictional shop, two things happened after a theme change:

1. The **herbal tea** pages had a noindex by mistake: visits from Google dropped, and the problem showed up in Search Console's page indexing report.
2. The **filter** pages (by price, by origin) had no canonical: Google found dozens of them, almost identical to the category.

The fix: remove the noindex from the herbal teas and ask Google to re-check; add a canonical from the filters to the category.

How Google finds and saves pages is explained in [how Google finds and ranks pages](/en/blog/how-google-finds-pages/).
