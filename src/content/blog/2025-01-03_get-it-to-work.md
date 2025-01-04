---
author: Alpri Else
pubDatetime: 2024-01-04T04:00:00.000Z
title: Just get it to work
slug: just-get-it-to-work
featured: true
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
description: Great Filters and Street Fighting Software Engineering
tags:
  - micro-blog
---

I ran across this timely video from Joey from BPS who argues for about optimizing against the "Great Filter" of the project your working on. And while he directly thinks of this through the lens of Personal Projects, its perspective lines up well within the context of building a startup and bringing a new product to market.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4jgTCayWlwc?si=4YFd6elqSyxHpFDH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

He goes through different examples of what your role is in the project and the "Great Filter" you're working against within the context of a hypothetical aerospace project and I'll do my best to recontextualize this for building a startup and building software.

> [The Great Filter] is what is the most likely bad outcome for the project. What's the thing that we are trying to optimize against?

This Great Filter differs for software engineers depending on the company engineering culture you find yourself in, your specific role, or the team you find yourself on. At a tech company like HubSpot as an entry-level Software Engineer, it can be as straight forward as you and your team needing to deliver XYZ feature by a set company deadline.

You are deeply solving every small detail. You work with other engineers who nit pick your Pull-requests for consistent variable naming and code style. Your Technical Lead who pushes for technical approaches that are more maintainable and scalable. In the worst case scenario your team fails to meet that deadline. In the worst case, maybe instead of being apart of a larger launch, your project is ear-marked as a fast-follow launch or you still release some reduce-scoped demo and promise a Beta coming soon, but at the end of the day, unless egregious, your team will have a retrospective on how to improve and continue existing.

Joey focuses on Personal Projects where the "Great Filter" becomes finishing your project at all; because on a personal project, you assume the hats of every single specialist and are responsible for solving every single problem. Quite frankly, I have plenty of personal projects that have been left unfinished -- it's all too easy to get caught in the details of every single problem and lost interest and discipline to move the project forward.

Now working on a product I'm building as a business from scratch, the same existence filter applies.

In a startup, no one cares you're not using the most scalable framework or that you can't handle 10x the scale. You just need to build something of value and be able to distribute it to people who can pay before you yourself run out of money.

There's this video about "Street Fighting Mathematics" which walks through ways to progress your Computer Science theory research 'the dirty way'.

Before watching this video, I thought CS Theory research was an exercise of memorizing and learning as much CS Theory and math so you can magically peer through patterns to expertly navigate your proof. There's some of that for sure. But it turns out, for a lot of theory problems, you don't need to memorize every Definition for your proof or be able to hand derive the equation that generates a sequence you're seeing. You can brute force it with online tools and just pretend like you knew that obscure piece of math knowledge the whole time in your paper.

You use one of these online math tools, learn some new math as a consequence, and as the lecturer puts it, "pretend like you already knew it when your write your paper".

<iframe width="560" height="315" src="https://www.youtube.com/embed/qP4XEZ54eSc?si=XbUw4dJPX3AAPUh8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

There really should be a "Street Fighting Software Engineering" video that exists. A tutorial on all the different APIs, libraries, or other strategies to just quickly fake and prototype ideas without fully committing to building a full, robust technical solution. It's an active skill to learn how to be scrappy coming out of a larger company where your impulse might be to just recreate the same familiar tooling and infrastructure you once had. But if your Great Filter is having your project just existing at all, you need to fight dirty.

You can [use Google Spreadsheet as your primary datastore](https://www.levels.fyi/blog/scaling-to-millions-with-google-sheets.html). Just be [a GPT-wrapper before training your own models](https://www.youtube.com/watch?v=z0wt2pe_LZM). You can [Wizard of Oz" your AI](https://en.wikipedia.org/wiki/Wizard_of_Oz_experiment) and you yourself are pretending to be the AI before actually building it.

You just don't have time to have the perfect environment, the perfect tooling, the perfect architecture, the perfect CI/CD pipeline, or even the most reliable, 99.9% available product. It just needs to work to demonstrate value.

With all this said, I don't think the answer is just to AI vomit a whole product out or write the most spaghetti code. I'll eventually write about this, but there's strategic nuance in figuring out what's worth street fighting vs what's worth intentionally over-engineering once you uncover and define more unknowns.
