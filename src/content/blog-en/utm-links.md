---
title: "UTM links: what they are and how to use them"
description: "What UTM parameters are, what source, medium and campaign are for, and how to always write them the same way, with a newsletter example."
date: 2026-10-26
traduzione: "link-utm"
categoria: "basi"
etichetta: "Analytics"
formato: "pillola"
tema: "basi"
minuti: 4
ruoloId: "analytics"
strumentoId: "link-utm"
inBreve:
  - "UTM parameters are **tags** added at the end of a link."
  - "They tell analytics tools **where a visit comes from**."
  - "The three you always need: **source, medium and campaign**, always written the same way."
consiglio: "Keep a shared sheet with your team's UTM rules: it's the simplest way to get reports that add up."
domanda:
  testo: "Which utm_medium do you use in a newsletter link?"
  opzioni:
    - testo: "social"
    - testo: "email"
      giusta: true
    - testo: "October Newsletter!!"
  spiegaSi: "The newsletter arrives by email: the medium tells you the type of channel."
  spiegaNo: "Social is a different channel; and \"October Newsletter!!\" is a badly written campaign name, not a medium."
faq:
  - d: "Do UTM tags collect data about people?"
    r: "No, on their own they're just text in a link. Visits are measured by the website's analytics tool, which must respect cookie consent."
  - d: "Can I use UTM tags on my website's internal links?"
    r: "Better not: you risk changing where a visit came from halfway through, and your reports get confusing. Use them for links that bring people to the site from outside."
argomenti: ["Analytics", "Email", "Social media"]
---

You sent a newsletter and published a post: the next day your website has more visits. But how many came from the newsletter and how many from the post? Without UTM tags, you often can't tell.

## What are UTM parameters?

They are tags you add at the end of a link, after the question mark. They don't change the page that opens: they help analytics tools, like Google Analytics, understand where the visit comes from.

An example from the newsletter of Cinque Foglie, the Marketing Mix practice company:

`cinquefoglie.example/evening-teas?utm_source=newsletter&utm_medium=email&utm_campaign=evening-teas-october`

## The three tags you always need

| Tag | What it says | Example |
| --- | --- | --- |
| `utm_source` | Who sends the visit | newsletter, instagram |
| `utm_medium` | The type of channel | email, social, cpc |
| `utm_campaign` | The campaign name | evening-teas-october |

There are two optional ones: `utm_term` (the keyword, in ads) and `utm_content` (to tell apart two links in the same email, for example the top button and the bottom one).

## Rules to avoid confusion

- **Always lower case**: "Newsletter" and "newsletter" become two different sources in your reports.
- **Hyphens instead of spaces**: "evening-teas-october", not "Evening teas October".
- **Common mediums**: use values like email, social or cpc, which analytics tools recognise to group visits by channel.
- **Names people understand**: in six months, "campaign1" won't mean anything to anyone.

## What UTM tags don't do

UTM tags don't count anything on their own. Visits are measured by the website's analytics tool, which in the European Union may only use cookies that aren't strictly necessary after the visitor has given consent (ePrivacy rules). So some visits won't be counted: that's normal.
