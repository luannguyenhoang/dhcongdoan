"use client";

import { clean } from "@/lib/sanitizeHtml";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "@/styles/Post.module.css";
import FormPopup from "@/app/components/molecules/FormPopup";
import { useEffect, useState } from "react";

const BanerPost = dynamic(() =>
  import("@/app/components/atoms/BanerPost").then((mod) => mod.BanerPost)
);

export const ClientPost = ({ post }: { post: any }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <article className={styles["post"]}>
        <main>
          {post && (
            <>
              <div className={styles["post__main"] + " lg:px-0"}>
                <BanerPost post={post} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: clean(post?.content)
                  }}
                />
              </div>
            </>
          )}

          {!post && (
            <div className={styles["not-found"]}>
              <p>Bài viết này không tồn tại !</p>
              <Link className={styles["back-new"]} href={`/`}>
                Trở về trang trang chủ
              </Link>
            </div>
          )}
        </main>
      </article>
    </>
  );
};
