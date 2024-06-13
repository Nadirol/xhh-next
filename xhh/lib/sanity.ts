import { createClient } from "next-sanity"
import imageUrlBuilder from '@sanity/image-url'

const projectId = 'i132j7qc'
const dataset = 'production'
const apiVersion = '2023-01-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: "skS0eqtFobc7NEyQlQ3zlcOlX8MowoJMBAJZ1Vq8xaZV19Hfc4BcCeyBgNw3OTtapuXp0V32jKMENQ0eDuVGiYahDfMm8LC2AAgtUmSmBPlfqCF50aqfoSRIdcWoF7wgWqD6FDTRcyuDFrYxrUCVbtMqVMIsUz1KYmXCUOoUXUMlinEYhIAR",
    useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}