import { Box, Grid, Flex, Image } from 'theme-ui'
import { useEffect, useState } from 'react'
import * as Tone from 'tone'
import { getJokes } from './api/jokes'
import useSWR from 'swr'

function toHex(str) {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}

function toRgb(hex) {
  let R = parseInt(hex.slice(0, 2), 16) || 0
  let G = parseInt(hex.slice(2, 4), 16) || 0
  let B = parseInt(hex.slice(4, 6), 16) || 0
  R = R * (R > G && R > B ? 1.5 : 0.7)
  G = G * (G > R && G > B ? 1.5 : 0.7)
  B = B * (B > R && B > G ? 1.5 : 0.7)
  return [R, G, B]
}

function firstLetterInString(str) {
  let x = 0
  while (x < str.length) {
    if (str[x].match(/[a-z]/i)) {
      return str[x]
    }
    x++
  }
  return 'G'
}

function firstNumberInString(str) {
  let x = 0
  while (x < str.length) {
    if (!str[x].match(/[a-z]/i)) {
      return str[x]
    }
    x++
  }
  return 'G'
}

export default function Page({ jokes }) {
  let [activated, setActivated] = useState(false)
  let synth
  useEffect(() => {
    synth = new Tone.Synth().toDestination()
  })
  const fetcher = (...args) => fetch(...args).then(async res => res.json())
  const { data } = useSWR('/api/jokes', fetcher, {
    initialData: jokes,
    refreshInterval: 1000,
  })
  useEffect(() => {
    if (activated) {
      Tone.start()
      console.log(Math.floor(
        (firstNumberInString(toHex(data[data.length - 1].joke)) / 9)*8
      ))
      synth.triggerAttackRelease(
        `${firstLetterInString(toHex(data[data.length - 1].joke))}${Math.floor(
          (firstNumberInString(toHex(data[data.length - 1].joke)) / 9) * 8
        )}`,
        `8n`,
        Tone.now(),
      )
    }
  }, [data])
  return (
    <>
      <Flex sx={{ gap: 2, p: 2, flexWrap: 'wrap' }}>
        <Image
          src="https://api.qrserver.com/v1/create-qr-code/?data=https://hack.af/submit-your-jokes"
          height="200px"
          width="200px"
          sx={{
            p: 1,
            border: '4px solid',
            borderColor: 'black',
            borderRadius: 6,
          }}
          onClick={() => {
            Tone.start()
            synth.triggerAttackRelease(`C4`, '8n', Tone.now())
            setActivated(true)
          }}
        />
        {data.map(joke => (
          <Grid
            key={joke.id}
            id={joke.id}
            columns={Math.ceil(Math.sqrt(toHex(joke.joke).length / 6))}
            gap={0}
            sx={{
              height: '200px',
              width: '200px',
              borderRadius: 6,
              overflow: 'hidden'
            }}
            onClick={() => alert(joke.joke)}
          >
            {toHex(joke.joke)
              .match(/.{1,6}/g)
              .map(x => (
                <Box
                  sx={{
                    background: `rgb(${toRgb(x).join(',')})`,
                  }}
                />
              ))}

            {[
              ...toHex(joke.id).match(/.{1,6}/g),
              ...toHex(joke.joke).match(/.{1,6}/g),
            ]
              .slice(
                0,
                Math.pow(Math.ceil(Math.sqrt(toHex(joke.joke).length / 6)), 2) -
                  toHex(joke.joke).match(/.{1,6}/g).length,
              )
              .map(x => (
                <Box
                  sx={{
                    background: `rgb(${toRgb(x).join(',')})`,
                  }}
                ></Box>
              ))}
          </Grid>
        ))}
      </Flex>
    </>
  )
}

export async function getServerSideProps() {
  let jokes = await getJokes()
  return {
    props: { jokes },
  }
}
