import { atom } from "recoil";
import { ICartProduct } from "../interface/interface";

export const latestCartItemState = atom({
    key: "latestCartItemState",
    default: <ICartProduct | undefined>{}
})