---
title: "301 redirects and 404 pages: what they are and when to use them"
description: "What a 404 page is, what a 301 redirect is and how to handle them when a product changes URL or no longer exists. With examples."
date: 2026-10-30
traduzione: "redirect-301-e-pagine-404"
categoria: "basi"
etichetta: "SEO"
formato: "pillola"
tema: "seo"
minuti: 5
ruoloId: "seo"
inBreve:
  - "A **404 page** says: «this page doesn't exist»."
  - "A **301 redirect** says: «this page has moved for good, here it is» and takes the person to the new URL."
  - "Redirect to the **most similar page**, not always to the home page."
consiglio: "When you change a page's URL, set up the redirect before publishing, not after someone reports the error."
domanda:
  testo: "The «Classic Earl Grey» product has been replaced by «Organic Earl Grey». What do you do with the old URL?"
  opzioni:
    - testo: "Leave it as a 404"
    - testo: "301 redirect to the home page"
    - testo: "301 redirect to the Organic Earl Grey page"
      giusta: true
  spiegaSi: "It's the page closest to what the person was looking for: anyone arriving from the old link finds the new product straight away."
  spiegaNo: "A 404 loses people arriving from old links; the home page makes them search again, and Google may treat that redirect as a 404."
faq:
  - d: "What's the difference between 301 and 302?"
    r: "A 301 is a permanent move, a 302 a temporary one. For a URL change that stays, use a 301."
  - d: "Are 404 pages bad for SEO?"
    r: "Not always. A page that no longer exists and has no replacement can stay a 404. The problem is when the page had visits or links and there is an alternative."
  - d: "What is a redirect chain?"
    r: "When A goes to B and B goes to C. It slows things down and weakens signals: better to send A straight to C."
argomenti: ["SEO", "Technical SEO"]
---

Websites change: new products, renamed URLs, deleted pages. Each time, someone may still arrive at the old URL: from a link on another site, a bookmark, Google. What they find depends on how you handled the change.

## The 404 page

404 is a **status code**: the server's way of saying "this page isn't here". A good 404 page still helps the person: it explains what happened and offers useful links (categories, search, home page).

## The 301 redirect

A redirect automatically sends the person (and Google) from one URL to another. **301** means "moved permanently": Google understands that the new page replaces the old one and passes its signals on.

## When to use what

| Situation | What to do |
| --- | --- |
| The page has a new URL | 301 to the new URL |
| The product is replaced by a similar one | 301 to the new product |
| The product no longer exists and has no replacement | 301 to the category, or 404 |
| The page never existed (typo) | 404 |

## Redirect chains

When a site changes structure several times, redirects pile up: `/product.php?id=12` goes to `/green-teas/sencha/`, which goes to `/green-teas/organic-sencha/`. Each step slows things down. The fix is to point the first URL **directly** to the last one.

## How to find them

- In **Search Console**, the page indexing report lists pages "not found (404)".
- A **crawler** (a program that visits the whole site like Google does) lists broken internal links and redirect chains.

Marketing Mix's SEO Simulation has you do both: you find a 404 page with links from other sites and a redirect chain, and fix them from the shop's admin panel.
