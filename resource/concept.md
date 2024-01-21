# Teaching Approach

This platform takes an approach that was inspired by the
[Flipped Classroom](https://en.wikipedia.org/wiki/Flipped_classroom)
concept, but tries to take it further: Learners should be given as much
material as possible to introduce themselves to a new topic, then should be
guided by a teacher to help them with the parts they struggle to
understand.

This platform obviously does not provide for the second part -- guidance
by a teacher -- and instead tries to increase the amount of material
available for the first part. For a complete learning experience, it is
therefore insufficient. Instead, it should be used as a tool to implement
the first part of the flipped classroom. It is also useful in the very
common scenario that a teacher is not available to guide the learner,
and is intended to be more useful than a textbook or a collection of
videos alone in that case.

In contrast to a textbook or video, this platform encourages "learning by
doing" as much as is possible on a computer. It does so by splitting the
subject material into small units, each of which is immediately followed
by a set of exercises. This is intended to be followed by more complex
exercises that combine the material from multiple units. 

## Unit Format

Several kinds of unit are used:
* introduce _one_ new concept, aspect, definition, etc. -- never multiple at once.
  Immediately support this by one or more exercises, even if they ask little
  more than to repeat that content.
  * The learner should never be one step away from a "safe place" of knowledge.
    This requires to introduce only a single thing at a time, then to support it
    enough to make it part of the "safe place" before moving on from there.
  * Introduce multiple small steps in different directions, then connect them, rather
    than multiple steps in the same direction that lead the learner further into
    the unknown.
  * Repeat previous steps to further support the acquired knowledge. If possible, do so
    from different angles and in connection with other knowledge learnt in the
    meantime. As much as possible, perform spaced repetition of the content.
    If all else fails, repeat previous content directly.
* introduce an open question or unknown aspect as a motivation to continue in that
  direction
* repeat a previous unit in exercises directly, or combine multiple previous units in
  an exercise that cross-links different topics


## Scope

In its current form, this application is intended for learning alone.
It does not support:
* supervised learning, other than by a teacher sitting next to the learner 
  in front of the computer, as there is no mechanism to "view" a learner
  while using the platform
* exams. We simply acknowledge that no amount of supervision will even
  come close to prevent a learner from cheating _when sitting alone in
  front of a computer_. We therefore do not even try to prevent any kind
  of cheating, such as marking a unit as completed in the browser state
  or reloading an exercise page to get an easier question. Cheating must
  be prevented by other means, which for this platform also means to
  separate the exercises meant for learning from the exams meant for
  grading.

# Authoring

Authoring content on this platform is characterized by conflicting goals: 
* It should be possible for domain experts to teach their subject without
  programming or sysop knowledge. If we violate this rule, then we will
  get a strong focus on programming-related subjects, and little else.
* It should be possible to implement an "exercise generator" for subjects
  that allow it, such as math, where a large number of similar exercises
  can be generated just by replacing some numbers. This provides better
  support for learners who have grasped the theory but struggle with
  actually doing the exercises.
* The platform should allow technically advanced exercise styles, such as
  operating a simulated machine (e.g. a lathe or milling machine) to
  learn about its controls.

We cannot take away the programming aspect of writing an exercise
generator or a machine simulator, and we won't try to. However, this
platform should make it possible to implement those features, while
still allowing to author simlper exercise styles (such as multiple
choice questions) without any programming knowledge.

The approach taken here is:
* The platform is provided as SaaS, so that authors do not need to
  install or maintain any software. Most to all of it is free software,
  so it can be self-hosted if desired, but the reduced disoverability
  of such "secondary installations" should be considered.
* Logging in to the platform is required for authors, but not for
  learners. Since cheating is not a concern (see above), learner's state
  such as the completed units can be stored in browser state.
* For each exercise, the author chooses an exercise type from a list of
  supported standard types. These are baked into the platform and cannot
  be changed (except, obviously, by self-hosting the whole platform and
  changing its source code).
* Standard exercise types such as multiple choice questions can be
  authored without any programming knowledge, by using the appropriate
  editor provided by the platform. Questions and answers are written
  in a simple formatting syntax, most likely Markdown.
* For complex interactive exercises, any desired exercise style can be
  implemented by self-hosting the code for that exercise (HTML/CSS/JS),
  and using the appropriate exercise type to show the exercise in an
  iframe. This is possible because exercises do not require a server-side
  component; they are purely UI components that report to the outer
  frame whether the learner has solved them correctly. A main assumption
  here is that cheating is not a concern (see above), and that learners
  do not have to log in to use the platform, so that security
  considerations are relaxed.
  * If not also combined with exercise generator logic, the code for
    the exercise might also be hosted by this platform itself. This
    changes little in the authoring process but does not require the
    teacher to set up web hosting.
* For exercise generators, multiple different styles are possible:
  * self-hosting allows to implement a generator simply by returning a
    different exercise each time, for example using a PHP script.
  * the platform might offer a scripting language for exercise
    generators.


