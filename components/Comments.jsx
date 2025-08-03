import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="comments-section">
      <Giscus
        repo="gwaihirf22/paul-blake-website"
        repoId="R_kgDOO36vbA"
        category="General"
        categoryId="DIC_kwDOO36vbM4CtvQt"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />

      <style jsx>{`
        .comments-section {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--color-border);
        }

        @media (max-width: 768px) {
          .comments-section {
            margin-top: 3rem;
            padding-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}