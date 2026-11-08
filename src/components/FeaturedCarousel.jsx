import { useRef, useState } from "react";
import { featured } from "../data/services.js";
import { useApp } from "../context/AppContext.jsx";

export default function FeaturedCarousel() {
  const { setModal } = useApp();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const onScroll = () => setIndex(Math.round(ref.current.scrollLeft / ref.current.clientWidth));

  return (
    <section>
      <div className="carousel__head">
        <h2 className="section-title">Featured</h2>
        <div className="dots" aria-hidden="true">{featured.map((f, i) => <i key={f.id} className={i === index ? "is-on" : ""} />)}</div>
      </div>
      <div className="carousel" ref={ref} onScroll={onScroll}>
        {featured.map((f) => (
          <article className="slide" key={f.id}>
            <span className="slide__label">{f.label}</span>
            <h3 className="slide__title">{f.title}</h3>
            <button className="btn" onClick={() => setModal({ type: "svc", n: f.svc })}>{f.cta}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
