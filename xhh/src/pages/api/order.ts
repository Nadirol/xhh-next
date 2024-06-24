import { NextApiRequest, NextApiResponse } from "next";
import { mailOptions, transporter } from "../../../config/nodemailer";

const ORDER_MESSAGE_FIELDS: {[key: string]: string} = {
  _type: "Code",
  code: "Mã đơn hàng",
  username: "Tên người đặt",
  email: "Email",
  phoneNumber: "Số điện thoại",
  phoneNumber2: "Điện thoại dự phòng",
  date: "Thời gian đặt hàng",
  address: "Địa chỉ",
  products: "Sản phẩm",
  paymentMethod: "Phương thức thanh toán",
  total: "Tổng tiền",
  note: "Ghi chú",
};

type ProductsData = {
  title: string,
  quantity: number
}

type IAddress = {
  city: string,
  district: string,
  ward: string,
  details: string
};

function isAddress(val: any): val is IAddress {
  return ("city" in val && "district" in val && "ward" in val && "details" in val)
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const processValue = (val: string | ProductsData[] | number | Date) => {
  if (!val) {
      return "Trống"
  };

  if (typeof val === "number") {
      return numberWithCommas(val) + " đ"
  };

  if (Array.isArray(val)) {
      return val.map((item: ProductsData) => `${item.title} (${item.quantity})`)
  };


  if (typeof val === "object" && isAddress(val)) {
    return `${val.details}, ${val.ward}, ${val.district}, $${val.city}`
  }

  return val
}

const generateEmailContent = (data: Object) => {
  const stringData = Object.entries(data).reduce(
    (str: string, [key, val]) =>
      (str += `${ORDER_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${ORDER_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${processValue(val)}</p>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>Đơn hàng mới</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const data = {...req.body, date: new Date().toLocaleString()};

        try {
            // Log the values of the data object
            console.log("Data values:", data);

            await transporter.sendMail({
                ...mailOptions,
                ...generateEmailContent(data),
                subject: 'Đơn hàng XHH',
                sender: 'XHH Website'
            });

            return res.status(200).json({ message: "Successful" })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Bad request" })
        }
    }
    console.log(req.body);
    res.status(400).json({ message: "Bad request" })
}