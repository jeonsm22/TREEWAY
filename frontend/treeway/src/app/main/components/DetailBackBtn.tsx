"use client";

import { IoMdCloseCircleOutline } from "react-icons/io";
import styles from "./DetailBackBtn.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeShopIndex } from "@/redux/slice/shopIndexSlice";

export default function DetailBackBtn() {
    const router = useRouter();
    const dispatch = useDispatch();
    const param = useParams();
  return (
    <div className={styles.backBox}>
      <IoMdCloseCircleOutline
        className={styles.backBtn}
        onClick={() => {
          dispatch(changeShopIndex(Number(param.id)));
          router.push("/main")
        }}
      />
    </div>
  );
}