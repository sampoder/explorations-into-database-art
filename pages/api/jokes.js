import prisma from '../../lib/prisma'

export async function getJokes() {
  return await prisma.joke.findMany().then(r => r.reverse())
}

export default async function resolver(req, res) {
  let data = await getJokes()
  res.send(data)
}
