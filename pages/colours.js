import prisma from '../lib/prisma'
import { Box, Grid, Flex } from 'theme-ui'

function toHex(str) {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}

function toRgb(hex){
  let R = parseInt(hex.slice(0, 2), 16) || 0
  let G = parseInt(hex.slice(2, 4), 16) || 0
  let B = parseInt(hex.slice(4, 6), 16) || 0
  if( R > G && R > B){
    R = R * 1.5
    G = G * 0.7
    B = B * 0.7
  }
  else if( G > R && G > B){
    R = B * 0.7
    G = G * 1.5
    B = B * 0.7
  }
  else if( B > R && B > G){
    R = B * 0.7
    G = G * 0.7
    B = B * 1.5
  }
  return [R,G,B]
}

export default function Page({ jokes }) {
  return (
    <>
      <Flex sx={{ gap: 2, p: 2 }}>
        {jokes.map(joke => (
          <Grid
            columns={Math.floor(Math.sqrt(toHex(joke.joke).length / 6 + 1)) + 1}
            gap={0}
            sx={{ height: '100px', width: '100px', borderRadius: 6, overflow: 'hidden' }}
            onClick={()=> alert(joke.joke)}
          >
            {toHex(joke.joke)
              .match(/.{1,6}/g)
              .map(x => (
                <Box
                  sx={{
                    background: `rgb(${toRgb(x).join(',')})`
                  }}
                />
              ))}
            {toHex(joke.id)
              .match(/.{1,6}/g)
              .slice(
                0,
                Math.pow(
                  Math.floor(Math.sqrt(toHex(joke.joke).length / 6 + 1)) + 1,
                  2,
                ) - toHex(joke.joke).match(/.{1,6}/g).length,
              )
              .map(x => (
                <Box
                  sx={{
                    background: `rgb(${toRgb(x).join(',')})`
                  }}
                ></Box>
              ))}
          </Grid>
        ))}
      </Flex>
    </>
  )
}

export async function getServerSideProps(context) {
  let jokes = await prisma.joke.findMany()
  return {
    props: { jokes },
  }
}
