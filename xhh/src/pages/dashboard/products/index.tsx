import { useEffect, useRef, useState, useTransition } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Image from "next/image";
import supabase from "../../../../supabase";
import { IProduct } from "../../../../interface/interface";
import Header from "../../../../components/admin/Header";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function ProductsPage() {
    const tableRef = useRef(null);
    const [products, setProducts] = useState<IProduct[]>([]);

    const { t } = useTranslation('common');
    
    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });
          
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setProducts(data.reverse());
          }
        }
    
        fetchData();
    }, []);

    return (
        <div className="">
            <Header/>

            <div className="w-[60%] mx-auto my-10">
            </div>

            <div className="w-[90%] mx-auto ">
                <Link href="/admin/products/new" className="text-xl text-white bg-red-500 px-4 py-2 rounded">Đăng mới</Link>
                <table className="table table-striped mx-auto" ref={tableRef}>
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">ID</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Tên sản phẩm</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Loại hàng</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Giá</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Số lượng</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Chi tiết</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products && products.map((p, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-neutral-800">{p.id}</td>
                                <td className="px-4 py-2 border border-neutral-800">{p.title_vi}</td>
                                <td className="px-4 py-2 border border-neutral-800">{t(p.category)}</td>
                                <td className="px-4 py-2 border border-neutral-800">{numberWithCommas(p.price ||(p.price_set ? p.price_set[0].price : 0))}đ</td>
                                <td className="px-4 py-2 border border-neutral-800">{p.quantity}</td>
                                <td className="px-4 py-2 border border-neutral-800 underline text-blue-500 text-center">
                                    <Link href={`/dashboard/products/${p.slug}`}>Xem</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export async function getStaticProps({ locale }: { locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
        ])),
        // Will be passed to the page component as props
      },    
    }
}