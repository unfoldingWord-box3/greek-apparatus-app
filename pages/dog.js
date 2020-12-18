import useSWR from 'swr'
import Layout from '@components/Layout'

const fetcher = url => fetch(url).then(r => r.json())

export default function DogPage() {
  const { data, error } = useSWR(
    'https://dog.ceo/api/breeds/image/random',
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('====================================')
  console.log({ data })
  console.log('====================================')

  return (
    <Layout>
      hello {data.message}!
      <img height='200px' width='250px' src={data.message} />
    </Layout>
  )
}
