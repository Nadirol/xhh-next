import { NextApiResponse } from "next";
import { client } from "../../lib/sanity";
import supabase from "../../supabase";


const URL = "https://www.xhhome.vn";

async function getPostData() {
    const query = `*[_type == "postXHH"]{_id,slug} | order(lower(title) asc)`;
  
    const data = await client.fetch(query);
  
    return data;
}

interface slug {
    _id: string
    slug: { current: string }
}

function generateSiteMap(posts: slug[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
        <loc>${URL}/about</loc>
    </url>
    <url>
        <loc>${URL}/contact</loc>
    </url>
     <url>
       <loc>${URL}/products</loc>
     </url>
      <url>
       <loc>${URL}/news</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
           <url>
               <loc>${`${URL}/news/${slug.current}`}</loc>
           </url>
         `;
       })
    .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const posts = await getPostData();

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
  };
}

export default function SiteMap() {}
