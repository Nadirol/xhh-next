import { useRef } from "react";
import Header from "../../../components/admin/Header";
import { IOrder } from "../../../interface/interface";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { downloadIcon } from "../../../public/assets";
import Image from "next/image";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function DashboardPage({ data }: { data: IOrder[] }) {
    const tableRef = useRef(null);

    return (
        <div className="">
            <Header/>

            <div className="w-[90%] mx-auto">
                <DownloadTableExcel
                    filename="Đơn Hàng Web XHH"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >

                    <button className="flex gap-2 bg-green-600 px-4 py-2 rounded text-semibold text-white ml-auto mb-4"> Xuất Excel 
                        <Image src={downloadIcon} alt="" />
                    </button>

                </DownloadTableExcel>
            </div>

            <div className="w-[90%] flex items-center mx-auto ">
                <table className="table table-striped mx-auto" ref={tableRef}>
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Mã đơn hàng</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Tên người đặt</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Số điện thoại</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Địa chỉ</th>
                            <th colSpan={3} className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Sản phẩm <br /> <span className="text-xs">Tên, số lượng, phân loại</span></th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Tổng tiền</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Thời gian đặt</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Ghi chú</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data && data.map((order, index) => order.products.length === 1 ? (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-neutral-800">{order.code}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.username}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.phoneNumber}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.address.details}, {order.address.ward}, {order.address.district}, {order.address.city}</td>

                                <td className="px-4 py-2 border-b border-neutral-800">
                                    {order.products.map((product) => product.title).join(', ')}
                                </td>

                                <td className="px-4 py-2 border border-neutral-800">
                                    {order.products.map((product) => product.quantity).join(', ')}
                                </td>

                                <td className="px-4 py-2 border border-neutral-800">
                                    {order.products.map((product) => product.variation).join(', ')}
                                </td>

                                <td className="px-4 py-2 border border-neutral-800">{numberWithCommas(order.total)}đ</td>
                                <td className="px-4 py-2 border border-neutral-800">{new Date(order.date).toLocaleString()}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.note}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.email}</td>
                            </tr>
                        ) : order.products.map((p, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-neutral-800">{order.code}</td>
                                    <td className="px-4 py-2 border border-neutral-800">{order.username}</td>
                                    <td className="px-4 py-2 border border-neutral-800">{order.phoneNumber}</td>
                                    <td className="px-4 py-2 border border-neutral-800">{order.address.details}, {order.address.ward}, {order.address.district}, {order.address.city}</td>

                                    <td className="px-4 py-2 border-b border-neutral-800">
                                        {p.title}
                                    </td>

                                    <td className="px-4 py-2 border border-neutral-800">
                                        {p.quantity}
                                    </td>

                                    <td className="px-4 py-2 border border-neutral-800">
                                        {p.variation}
                                    </td>

                                    <td className="px-4 py-2 border border-neutral-800">{numberWithCommas(order.total)}đ</td>
                                    <td className="px-4 py-2 border border-neutral-800">{new Date(order.date).toLocaleString()}</td>
                                    <td className="px-4 py-2 border border-neutral-800">{order.note}</td>
                                    <td className="px-4 py-2 border border-neutral-800">{order.email}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

