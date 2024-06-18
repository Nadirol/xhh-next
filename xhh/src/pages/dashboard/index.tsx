import { useRef } from "react";
import Header from "../../../components/admin/Header";
import { IOrder } from "../../../interface/interface";
import { DownloadTableExcel } from 'react-export-table-to-excel';

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function DashboardPage({ data }: { data: IOrder[] }) {
    const tableRef = useRef(null);

    return (
        <div className="">
            <Header/>

            <DownloadTableExcel
                filename="Đơn Hàng Web XHH"
                sheet="sheet1"
                currentTableRef={tableRef.current}
            >

                <button> Xuất Excel </button>

            </DownloadTableExcel>

            <div className="w-full flex items-center">
                <table className="table table-striped mx-auto" ref={tableRef}>
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Mã đơn hàng</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Tên người đặt</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Số điện thoại</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Địa chỉ</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Sản phẩm</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Tổng tiền</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Ghi chú</th>
                            <th className="px-4 py-2 bg-red-500 text-white border border-neutral-100">Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data && data.map((order, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-neutral-800">{order.code}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.username}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.phoneNumber}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.address.details}, {order.address.ward}, {order.address.district}, {order.address.city}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.products.map((product) => product.title + "(" + product.quantity + ")").join(', ')}</td>
                                <td className="px-4 py-2 border border-neutral-800">{numberWithCommas(order.total)}đ</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.note}</td>
                                <td className="px-4 py-2 border border-neutral-800">{order.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

