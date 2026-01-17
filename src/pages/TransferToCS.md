---
category: Academic
categoryOrder: 3
order: 2

title: So You Want to Transfer to CS
description: Document about CS transfer, addl, and minor requirements
layout: ../layouts/Layout.astro
---

## So You Want To Transfer To SCS

(or double major, or minor, or something)

An SCS Transfer’s Thoughts

Written by Brandon Wu

Last revised, January 2023

Author’s note: This document has long since outlived the audience that it was written for. Regardless, I hope that the information contained within remains helpful to future CMU students. The author has since graduated from CMU, and is happily doing functional programming in the industry.

So you want to transfer to SCS. First off, congratulations on getting into CMU! It’s been quite the ride, I’m sure.

Note that the majority of this document will be addressing students who specifically want to transfer - some of the information is still applicable, however. There will be a small section addressing double majoring and minoring, as well.

### Who are you, really?

Fantastic question. As stated above, I’m Brandon Wu, and I transferred from Cognitive Science to Computer Science in April of 2020, as a sophomore. If you feel the need to make a “CS to CS” joke, rest assured I have only heard it several hundreds of times before.

At the time of revision (January 2023), I have since graduated from CMU with an undergraduate degree in computer science. I could leave more credentials as to my ethos in being able to provide advice in this document, but I’ll neglect to wax on about it and instead just cite my degree as the primary force for why you should trust me.

### OK, but how do I do it?

Let’s get to the meat of it.

There are six classes standing in your way. Those are:

-   **21-127 Concepts of Mathematics:** This is a standard introduction into discrete mathematics. I would actually not recommend taking this class - if you really want to transfer, you can e-mail your academic advisor or John Mackey to see if you can enroll in 21-128, which is the harder version of 21-127 for math majors. Note that there is also a section 15-151 for CS majors, which is literally the same as 21-128. You will not get in. I do know of people who are not math majors who have taken 21-128, however. Mackey is just a great teacher, and the material will certainly be covered at a faster pace and more interestingly.
-   **15-122 Principles of Imperative Computation:** This is programming 2.0. Proficient knowledge of AP CS A is sufficient for this class - it will assume a reasonable programming background, but the threshold is very low. Note that I say “programming 2.0”, but nothing at CMU (or in the field of CS in general) is “just programming”. Specifically, you’re introduced to a contract-based, verification-focused notion of correctness, where you’re not only programming, but thinking about how to reason about the correctness of your code. Substantial introduction to different kinds of elementary data structures (and their imperative implementations) are introduced. It is taught in a subset of C called C0, which is essentially a verification-friendly junior C. It transitions to C in later weeks.
-   **15-150 Principles of Functional Programming:** Functional programming is a paradigm that you likely are not familiar with - indeed, most people are not. It views computation as evaluation, similarly to how you may evaluate mathematical equations. It is extremely recursion-heavy, with almost every function you write being recursive, and it stresses the importance of proofs as programs, where the functional programs you write are themselves the proofs for their own correctness. It is taught in Standard ML, which is a rather obscure functional language that you likely have never heard of.
-   **15-213 Introduction to Computer Systems:** 213 is an introduction to a systems-level perspective on programs - ranging from how instructions and data function, to more high-level concepts such as basic networking and implementations of shells. You will read assembly in this class, implement your own malloc function, and write a cache simulator - all very rewarding (and time consuming) projects. It is taught entirely in C (and assembly, if you count that).
-   **15-210 Parallel and Sequential Data Structures and Algorithms:** This class teaches you about parallel and sequential implementations for particular data structures and algorithms, particularly as it relates to analyzing algorithms based on the implementation that they employ. You will think extensively about how to solve certain problems within certain cost bounds, mostly rooted in a specific, clever implementation, or modifying a certain algorithm to do what you want. The separation from interface and implementation is very real here. This class is also taught in Standard ML.
-   **15-251 Great Ideas in Theoretical Computer Science:** 251 is an absolutely brutal time - it has a large reputation at CMU for being a “death class”. Despite that, however, it is simultaneously a great class (If you take it with Anil Ada, anyways). It teaches you theoretical computer science principles such as the theory of computation, basic complexity theory, graph theory, and a handful of other theoretical CS topics. Homework sets due each week are really tough, though this is ameliorated somewhat by the fact that you can work in groups (though, not all the problems are group problems, so you can’t just get carried).

All of these classes are difficult, and highly non-trivial (NOTHING IS TRIVIAL). I have heard it described that “CMU throws you straight into the fire, in the hopes that you come out better on the other side”. I think that this is a fairly accurate description. CMU does not pull its punches. It will run you through the meat grinder and expect you to reassemble yourself. It may seem like it’s “only six classes”, but you will only ever be able to take two at any given time, if even that (two is very difficult). You will find it difficult to complete these requirements and take classes in your home major. You will also likely find yourself spending a lot of time on them - this is not to say that you will spend every waking hour working (nobody does that, unless they’re taking OS), but it’s very standard practice to spend evenings and weekends doing homework. This is also not to say that you cannot have a social life - many people take these classes and still do. Just be wary that there will be a lot of work.

To transfer, you need a 3.6 in these six classes. This translates to “at most two B’s”. I will stress again that even getting a B in these classes is a laudable effort. To double major, you will need a 3.0, as well as having first completed the minor. I would highly recommend planning on just the minor at first, and then adjusting your plans as time goes on, as you figure out more about yourself.

It is highly likely that after taking 21-127 and 15-122, you will figure out where your interests really lie. Concepts alone tells you a lot about what CS is really like, and 15-122 is certainly no slouch. A lot of people who have intentions of transferring quickly find out that it’s not for them after the combination of these two - in fact, I would say that every CS class at CMU is a “weeder class”. A large percentage of students will drop in the first couple of weeks.

Alternatively, there are ways to get involved in CS that can inform you of how interested you really are in the subject - these include doing research, as well as other extracurriculars such as computer club, PPP, or related. I personally have done no real CS-related extracurriculars, outside of teaching.

You may find waitlists an issue, at first. For classes like 15-122, 15-150, and 21-127, I would not worry about it whatsoever. I have been on the waitlist for all three and eventually gotten in, since, as I mentioned before, a sizeable amount of students will drop. So don’t worry if you’re eighth or so on the waitlist - I don’t know of anyone who genuinely wanted to take those intro courses but were unable, due to waitlisting problems.

I took 21-127 and 15-122 my freshman fall, then I took 15-150 (and a separate CS elective) in my freshman spring. In my sophomore fall, I took 15-213 and 15-251 (which is not an experience I would wish on anyone), and in my sophomore spring, I took 15-210. You will be eligible to transfer by the mid-semester of the semester in which you complete the last of the six requirements - for me, this was 15-210.

They will use your mid-semester grade in order to judge the GPA requirements. To begin the process, you will meet with Tom Cortina sometime before the mid-semester date (probably the semester before) to make your intentions clear, then submit the transfer application by the mid-semester deadline. This will require an essay, about why you want to transfer, your interests in CS, et cetera. I sincerely hope that by the time that you’ve made it to this point, you’ve figured that out.

As they say on the page in bold text, transfer to SCS is not guaranteed. A committee will review your application, read over your essay, and judge if you’re a good fit or not. It has and does happen that students who meet the GPA requirements will apply, and then get rejected, on the basis of their motivation/involvement and their essay. I do not know precisely the reasons why my application was accepted. I also would not be inclined to share it, if I did - the essay part is something that should be uniquely you, where you can let your passion shine through.

This is basically the entire process. The classes are the most significant part, and they will surely occupy two years or more of your life. The end is quite a ways down the line. If you’re driven, if you’re motivated, and if you’re passionate, then you can be the small percentage of people who make it. That is my genuine belief.

Best of luck. I’ll see you on the other side.
