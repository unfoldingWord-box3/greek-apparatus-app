import { useContext } from 'react'
import Layout from '@components/Layout'
import Card from '@components/Card'
import { BibleReferenceContext } from '@context/BibleReferenceContext'

export default function Home() {
  return (
    <Layout>
      <div className='flex'>
        <Card
          title='UGNT'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa diam, vehicula ut ultrices vitae, porta eget libero. Proin blandit lectus eget ipsum scelerisque, id porta velit malesuada. Proin imperdiet sodales orci, vitae auctor sapien dictum congue.'
        />
        <Card
          title='UGNT'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa diam, vehicula ut ultrices vitae, porta eget libero. Proin blandit lectus eget ipsum scelerisque, id porta velit malesuada. Proin imperdiet sodales orci, vitae auctor sapien dictum congue.'
        />
      </div>
    </Layout>
  )
}
