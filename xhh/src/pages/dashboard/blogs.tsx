// @ts-nocheck

import { useState } from "react";
import Header from "../../../components/admin/Header";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import { IPost } from "../../../interface/interface";
import { editIcon, imageIcon } from "../../../public/assets";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { PortableText } from "@portabletext/react";
import MarkdownIt from 'markdown-it'

async function getData() {
    const query = `*[_type == "postXHH"] | order(_createdAt desc)`;
  
    const data = await client.fetch(query);
  
    return data;
};

const mdParser = new MarkdownIt(/* Markdown-it options */);

function toPlainText(blocks = []) {
    return blocks
      // loop through each block
      .map(block => {
        // if it's not a text block with children, 
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map(child => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
}


export default function BlogPage({ data }: { data: IPost[]}) {
    const [selectedPost, setSelectedPost] = useState(0);

    const [titleValue, setTitleValue] = useState(data[selectedPost]?.title || '');
    const [summaryValue, setSummaryValue] = useState(data[selectedPost]?.overview || '');
    const [imageValue, setImageValue] = useState(data[selectedPost]?.image || null)
    const [contentValue, setContentValue] = useState(toPlainText(data[selectedPost]?.content) || null);

    const handlePostChange = (index: number | "new") => {
        if (index === "new") {
            setSelectedPost('new');

            setTitleValue('');
            setSummaryValue('');
            setImageValue();
            setContentValue('');
        } else {
            setSelectedPost(index);
            setTitleValue(data[index].title);
            setSummaryValue(data[index].overview);
            setImageValue(data[index].image);
            setContentValue(toPlainText(data[index].content));
        }

    }

    return (
        <div className="">
            <Header/>

            <div className="w-[90%] mx-auto flex pt-4">
                <div className="w-[30%] flex flex-col gap-2.5 items-end">
                    <button onClick={() => handlePostChange('new')} className="mr-8 w-fit px-5 py-2 rounded border border-neutral-500 hover:bg-neutral-800 hover:text-white">Tạo mới +</button>
                    <div className="h-[87vh] border-r overflow-y-scroll">
                        {data.map((p, index) => (
                            <div onClick={() => handlePostChange(index)} key={index} className="flex gap-4 items-center pr-4 py-2 hover:bg-neutral-100 cursor-pointer">
                                <Image src={urlFor(p.image).url()} width={80} height={80} alt="" />
                                <span className="text-semibold text-sm line-clamp-1">{p.title}</span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-full h-[87vh] overflow-y-scroll ">
                    <form className="flex gap-6 flex-col px-[10rem] pt-10 relative">
                        <div className="flex gap-2 flex-col">
                            <h4 className="text-semibold">Tiêu đề</h4>
                            <input type="text" value={titleValue} className="w-full border border-neutral-300 pl-2 py-1 outline-blue-400"/>
                        </div>

                        <div className="flex gap-2 flex-col">
                            <h4 className="text-semibold">Tóm tắt</h4>
                            <input type="text" value={summaryValue} className="w-full border border-neutral-300 pl-2 py-1 outline-blue-400"/>
                        </div>

                        <div className="flex gap-2 flex-col">
                            <h4 className="text-semibold">Hình ảnh</h4>

                            {imageValue ? (
                                <div className="relative [&:hover]:before:block [&:hover>.z-20]:block before:hidden before:absolute before:inset-0 
                                before:w-full before:h-full before:z-[15] before:bg-filter-dark">
                                    <Image src={data[selectedPost].image !== imageValue ? URL.createObjectURL(imageValue) : urlFor(imageValue).url()} width={1000} height={800} alt="" className="w-full relative z-10"/>

                                    <div className="absolute z-20 top-10 right-10 hidden">
                                        <input type="file" name="postImage" id="post-image" className="hidden" 
                                        onChange={(e) => e.target.files && setImageValue(e.target.files[0])}/>
                                        <label htmlFor="post-image" className="w-full cursor-pointer">
                                            <Image src={editIcon} alt="" className="w-5"/>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <input type="file" name="postImage" id="post-image" className="hidden"/>
                                    <label htmlFor="post-image" className="w-full flex justify-between items-center border px-2 py-1">
                                        Đăng hình ảnh
                                        <Image src={imageIcon} alt="" className="w-5"/>
                                    </label>
                                </div>
                            )
                            } 
                        </div>

                        <div className="flex gap-2 flex-col">
                            <h4 className="text-semibold">Nội dung</h4>

                            <MdEditor
                                renderHTML={text => mdParser.render(text)}                            
                                onChange={({ text }) => setContentValue(text)}
                                style={{ height: '800px' }} // Adjust the height as needed
                                value={contentValue}
                            />
                        </div>

                        <button type="submit" className="fixed bottom-12 right-[8rem] bg-blue-500 rounded px-4 py-2 text-white">
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps() {
    const data = await getData() as IPost[];
  
    return {
      props: {
        data: data
      }, // will be passed to the page component as props
    };
  }
  