export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id, name, tags, image, isTall, order
}`

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id, index, name, desc, image, order
}`

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id, name, quote, logo, logoMobile, order
}`

export const newsArticlesQuery = `*[_type == "newsArticle"] | order(order asc) {
  _id, image, desc, desktopOffset, order
}`
