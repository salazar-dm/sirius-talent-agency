import React, { useEffect, useRef } from "react";
import "./SignpostPromoAnimatedImage.css";
import "../../App.css";
import { columnsStyle } from "../../shared/columnsStyle.tsx";
import { MonogramSmall } from "../../assets/MonogramSmall.tsx";

interface SignpostPromoAnimatedImageProps {
    image: string;
}

export const SignpostPromoAnimatedImage: React.FC<SignpostPromoAnimatedImageProps> = ({ image }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const wipeBlockRef = useRef<HTMLSpanElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animate = () => {
            if (!rootRef.current || !wipeBlockRef.current || !imageContainerRef.current) return;

            const rect = rootRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            const start = vh;
            const end = vh - rect.height;
            const distance = start - end;
            const current = start - rect.top;

            const progress = Math.min(Math.max(current / distance, 0), 1);

            // wipeBlock: от -100% → 100%
            const wipeTranslate = -100 + 200 * progress;
            wipeBlockRef.current.style.transform = `translate(${wipeTranslate}%, 0)`;
            wipeBlockRef.current.style.opacity = "1";

            // imageContainer: scale всегда плавный
            const scale = 1.5 - 0.5 * progress;
            imageContainerRef.current.style.transform = `scale(${scale}, ${scale})`;

            // 💥 Новая логика: opacity прыгает с 0 на 1, когда wipeBlock заходит за -20%
            const threshold = -19.57; // можешь подстроить
            imageContainerRef.current.style.opacity = wipeTranslate >= threshold ? "1" : "0";
        };

        const onScroll = () => requestAnimationFrame(animate);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);
        animate();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);


    return (
        <div
            ref={rootRef}
            className="Grid_grid__item Grid_grid__bleed-direction-right SignpostPromoAnimatedImage__grid-item"
            style={columnsStyle(1, 9, 1, 9, 7, 17, 7, 17)}
        >
            <div className="SignpostPromoAnimatedImage__wrapper">
                <div className="SignpostPromoAnimatedImage__wipe">
          <span
              className="SignpostPromoAnimatedImage__wipe-block"
              ref={wipeBlockRef}
          ></span>
                    <div
                        className="SignpostPromoAnimatedImage__image-container"
                        ref={imageContainerRef}
                    >
                        <img
                            className="SignpostPromoAnimatedImage__image"
                            src={image}
                        />
                    </div>
                </div>
                <div className="SignpostPromoAnimatedImage__monogram-wrapper">
                    <MonogramSmall />
                </div>
            </div>
        </div>
    );
};
