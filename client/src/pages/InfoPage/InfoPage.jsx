import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./InfoPage.module.css";
import mountain3Img from "./parallax/mountain-3.svg";
import mountain2Img from "./parallax/mountain-2.svg";
import mountain1Img from "./parallax/mountain-1.svg";
import sunImg from "./parallax/sun.svg";
import watch from "./parallax/watch.svg";
import cloudsBottomImg from "./parallax/cloud-bottom.svg";
import cloudsLeftImg from "./parallax/clouds-left.svg";
import cloudsRightImg from "./parallax/clouds-right.svg";
import starsImg from "./parallax/stars.svg";
import { Button } from "@chakra-ui/react";

function InfoPage() {
  const [background, setBackground] = useState(20);

  const parallaxRef = useRef(null);
  const mountain3 = useRef(null);
  const mountain2 = useRef(null);
  const mountain1 = useRef(null);
  const cloudsBottom = useRef(null);
  const cloudsLeft = useRef(null);
  const cloudsRight = useRef(null);
  const stars = useRef(null);
  const sun = useRef(null);
  const watchMain = useRef(null);
  const copy = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "5000 bottom",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 20));
          },
        },
      });
      tl.to(
        mountain3.current,
        {
          y: "-=80",
        },
        0
      );
      tl.to(
        mountain2.current,
        {
          y: "-=30",
        },
        0
      );
      tl.to(
        mountain1.current,
        {
          y: "+=50",
        },
        0
      );
      tl.to(
        stars.current,
        {
          top: 0,
        },
        0.5
      );
      tl.to(
        cloudsBottom.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        0
      );
      tl.to(
        cloudsLeft.current,
        {
          x: "-20%",
          opacity: 0,
        },
        0
      );
      tl.to(
        cloudsRight.current,
        {
          x: "20%",
          opacity: 0,
        },
        0
      );
      tl.to(
        sun.current,
        {
          y: "+=210",
        },
        0
      );
      tl.to(

        watchMain.current,
        {
          y: "-=100",
        },
        0
      );
      tl.to(
        copy.current,
        {
          y: "-250%",
          opacity: 1,
        },
        0
      );
      tl.to(
        btn.current,
        {
          opacity: 1,
        },
        1.5
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.parallaxOuter}>
      <div
        ref={parallaxRef}
        style={{
          background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )`,
        }}
        className={styles.parallax}
      >
        <img ref={mountain3} className={styles.mountain3} src={mountain3Img} />
        <img ref={mountain2} className={styles.mountain2} src={mountain2Img} />
        <img ref={mountain1} className={styles.mountain1} src={mountain1Img} />
        <img ref={sun} className={styles.sun} src={sunImg} />
        <img ref={watchMain} className={styles.sun} src={watch} />

        <img
          ref={cloudsBottom}
          className={styles.cloudsBottom}
          src={cloudsBottomImg}
        />
        <img
          ref={cloudsLeft}
          className={styles.cloudsLeft}
          src={cloudsLeftImg}
        />
        <img
          ref={cloudsRight}
          className={styles.cloudsRight}
          src={cloudsRightImg}
        />
        <img ref={stars} className={styles.stars} src={starsImg} />
        <div ref={copy} className={styles.copy}>
          <h1>Xelor</h1>
          <Button colorScheme="teal" variant="outline">
            Присоединяйся
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
