"use client";

import { clean } from "@/lib/sanitizeHtml";
import styles from "@/styles/Post.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const BanerPost = dynamic(() =>
  import("@/app/components/atoms/BanerPost").then((mod) => mod.BanerPost)
);
const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);

export const ClientPost = ({ post }: { post: any }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 13000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  useEffect(() => {
    const tocContainers = document.querySelectorAll("#ez-toc-container");

    tocContainers.forEach((container) => {
      container.classList.add("ez-toc-open");
      const contentList = container.querySelector(".ez-toc-list");
      if (contentList instanceof HTMLElement) {
        contentList.style.display = "block";
      }
    });

    const toggleButtons = document.querySelectorAll(".ez-toc-toggle");

    const handleClick = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      const button = event.currentTarget as HTMLElement;
      const container = button.closest("#ez-toc-container");
      if (container) {
        container.classList.toggle("ez-toc-open");

        const contentList = container.querySelector(".ez-toc-list");
        if (contentList instanceof HTMLElement) {
          if (contentList.style.display === "none") {
            contentList.style.display = "block";
          } else {
            contentList.style.display = "none";
          }
        }
      }
    };

    toggleButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      toggleButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, [post]);
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
