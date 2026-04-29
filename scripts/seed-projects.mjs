import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf-8')
const get = (key) => env.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim()

const projectId = get('NEXT_PUBLIC_SANITY_PROJECT_ID')
const dataset   = get('NEXT_PUBLIC_SANITY_DATASET') ?? 'production'
const token     = get('SANITY_API_TOKEN')

if (!token || token === 'your-write-token-here') {
  console.error('Set SANITY_API_TOKEN in .env.local first (Editor token from sanity.io/manage)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

const projects = [
  {
    _id: 'project-surfers-paradise',
    name: 'Surfers Paradise',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/ab481a57-d430-42e4-8b34-7e9c21a823ca',
    isTall: true,
    order: 1,
  },
  {
    _id: 'project-cyberpunk-caffe',
    name: 'Cyberpunk Caffe',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/16eb0ba3-d2eb-48bf-99c5-498c5c4aedfe',
    isTall: false,
    order: 2,
  },
  {
    _id: 'project-agency-976',
    name: 'Agency 976',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/5d1a7039-c6fe-4a1d-8f1f-c39bda8eccce',
    isTall: false,
    order: 3,
  },
  {
    _id: 'project-minimal-playground',
    name: 'Minimal Playground',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/9141cfcd-83ca-468c-a930-480b96721318',
    isTall: true,
    order: 4,
  },
]

async function uploadImage(url, filename) {
  console.log(`  Downloading ${filename}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  console.log(`  Uploading ${filename} to Sanity...`)
  return client.assets.upload('image', buffer, { filename, contentType: res.headers.get('content-type') ?? 'image/jpeg' })
}

async function seed() {
  for (const p of projects) {
    console.log(`\nSeeding: ${p.name}`)
    const asset = await uploadImage(p.imageUrl, `${p._id}.jpg`)
    await client.createOrReplace({
      _id: p._id,
      _type: 'project',
      name: p.name,
      tags: p.tags,
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      isTall: p.isTall,
      order: p.order,
    })
    console.log(`  ✓ ${p.name} saved`)
  }
  console.log('\n✓ All projects seeded!')
}

seed().catch((err) => { console.error(err); process.exit(1) })
