import prisma from '../../lib/prisma'

export default async function resolver(req, res) {
  try {
    let data = await prisma.joke.create({
      data: {
        joke: req.query.joke
      }
    })
    res.redirect(`/new?success=true`)
  }
  catch(e) {
    console.log(e)
    res.redirect(`/new?error=true`)
  }
  
}