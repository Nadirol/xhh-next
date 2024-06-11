import { atom } from "recoil";
import { ICartProduct } from "../interface/interface";

export const cartState = atom({
    key: "cartState",
    default: <ICartProduct[]>[]
})  