# An Exploration into Creating Art from Databases

I gave this lightning talk at [Geekcamp Singapore 2022](https://geekcamp.sg/); a video is coming soon! View the slides [here](https://docs.google.com/presentation/d/1h-o2oOY9kYxrG8SrkzULx_yuDH_LpL6HxJStao52FQA/edit?usp=sharing).

> When I ask, what does a database look like? An ER Diagram may come to mind. How about, what does a DB sound like? Hmm.. maybe, the screams of one being accidentally deleted. Ultimately, art is made up of data. A song has notes, a painting has pixels etc. So, why not turn our databases into art?

<a href="https://docs.google.com/presentation/d/1h-o2oOY9kYxrG8SrkzULx_yuDH_LpL6HxJStao52FQA/edit?usp=sharing">
  <img src="https://user-images.githubusercontent.com/39828164/197695865-3fa5e518-882c-4552-a084-3637db264f2a.png" width="600px" />
</a>

## My Notes

*Slide 1:*

Hello! My name's Sam; I'm a student as well as a software engineer at Hack Club. Today I want to tell you a story. It's a story about curiosity, experimentation and my approach to making things.

*Slide 2:*

It began with a question I had, images are made up of pixels, music can be broken down into notes, right? So, what’s stopping us from turning a database into a piece of art? That’s what I want to explore today.

*Slide 3:*

Let’s start with a quick Prisma schema I’ve sketched up for our database. We’ll be working with a simple database full of jokes today, so that what I’ve set up here.

*Slide 4:*

Alright, so here’s a joke, not exactly a good one but we’ll work with it. How in the world are we going to turn this attempt at a joke into a piece of art?

I got thinking. Art -> Colours -> Hex Codes.

Hex codes are just hexadecimal representations of RGB values, right? We can just as easily create hexadecimal representation of our jokes.

*Slide 5:*

Here’s our flamingo joke in hexadecimal, it’s just as funny as it was before.

*Slide 6:*

Now we could break that hexadecimal value up into strings of six characters to make colours such as these. So that’s what I decided to do.

*Slide 7:*

At this point, I wanted to take my idea and put into code to create something I could see. So here that is, I’ve created a CSS grid with a bunch of squares each with a different colour from a different chunk of the hexadecimal value. The amount of columns is dynamic depending on the hexadecimal string’s length.  

*Slide 8:*

The result was this, slightly disappointing to be honest. The colours just aren’t popping if you ask me. Let’s change that.

*Slide 9:*

So the second function here, toRGB(), is a little bit of witchcraft of mine to boost the colours. What it does is it multiplies the largest value out of red, green and blue by 1.5 and the other two by 0.7 to decrease it.

*Slide 10:*

With that function, we’ll replace the hex value in our CSS with the RGB value calculated by our function. And the r

*Slide 11:*

And here we have the result! Looking a lot better if you ask me!

*Slide 12:*

We can do this on more dad jokes, each one generates a unique square full of colours. Amazing.

*Slide 13:*

We’ve got the visuals, now, we need some music!

*Slide 14:*

To get going I installed Tone.js within the repository, a trusty JavaScript module that lets you make music within your project.

*Slide 15:*

Then I got thinking, starting with musics notes. They’ve got a fairly basic structure: a letter, A, B, C, D, E, F or G and then a number. That sounds like something we could work with.

*Slide 16:*

Hexadecimal strings also have letters and numbers, we could work with that. Here’s some code I wrote up to play a note with the first letter and the first number of the hexadecimal string of the most recent joke added whenever a new joke is added.

Let’s try out! I’ll pull up a demo of the project and I’d love you all to add in some jokes to make some music.

*Slide 17:*

So, as I wrap up, the message I want to leave with you all today is to get creative and to remain curious. There is a lot out there in world, but in my opinion, curiosity can lead us anywhere. So get exploring, you never know the places you’ll go! 

Thank you everyone, the source code for this talk is on GitHub if you’d like to drop it a star. Enjoy the rest of the conference you all.

---

Thank you to [@lachlanjc](https://github.com/lachlanjc) for their wonderful [`next-theme-starter`](https://github.com/lachlanjc/next-theme-starter) which I've used in this repository.
