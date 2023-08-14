import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../../supabase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { slug } = req.query; 
  
    // Query the product based on the slug
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('slug', slug)
      .single();
  
    if (error) {
      console.error('Error fetching product:', error.message);
      return res.status(500).json({ error: 'Error fetching product' });
    }
  
    if (!data) {
      return res.status(404).json({ error: 'Product not found' });
    }
  
    return res.status(200).json(data);
  }