import { useRouter } from 'next/router'
import {
  Box,
  Grid,
  Flex,
  Image,
  Heading,
  Input,
  Button,
  Container,
} from 'theme-ui'

export default function Page() {
  const router = useRouter()
  return (
    <Box>
      <Container variant="copy">
        <Flex
          sx={{ flexDirection: 'column', gap: '8px', borderRadius: 4 }}
          bg="sunken"
          p={3}
          my={5}
        >
          <Heading
            as="h2"
            opacity={router.query.success ? 0.7 : 1}
            sx={{ fontWeight: '500' }}
          >
            {router.query.success
              ? `✅ Success`
              : router.query.error
              ? 'Error. Please try again.'
              : `✨ 🌈 ⚡`}
          </Heading>
          <Heading as="h1">Submit a Joke</Heading>
          <Flex
            as="form"
            sx={{ flexDirection: 'column', gap: '8px' }}
            action="/api/new"
          >
            <Input bg="white" placeholder="Your Joke" required name="joke" />
            <Button sx={{ textAlign: 'left' }} px={2}>
              Create Laughter (& Art)
            </Button>
          </Flex>
          <Button
            sx={{ textAlign: 'left' }}
            px={2}
            bg={'purple'}
            as="a"
            href="https://github.com/sampoder/explorations-into-database-art"
          >
            Check out this project / talk on GitHub
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
