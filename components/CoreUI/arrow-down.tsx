import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type ArrowDownProps = {
    width: number,
    height: number,
    className?: string,
    color?: string,
}

export default function ArrowDown({ width, height, className, color = '#FFF' }: ArrowDownProps) {
    const arrowRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                repeatDelay: 1,
                ease: "power1.inOut",
                onStart: () => {
                    gsap.set(arrowRef.current, { opacity: 1, y: 0 });
                },
                onComplete: () => {
                    gsap.set(arrowRef.current, { opacity: 1, y: 0 });
                }
            });
        }
    }, []);

    return (
        <svg 
            ref={arrowRef}
            xmlns="http://www.w3.org/2000/svg" 
            width={width} 
            height={height} 
            viewBox="0 0 31 15" 
            className={className}
        >
            <g fill="none" fillRule="evenodd">
                <g stroke={color} strokeWidth="3">
                    <g>
                        <path d="M126 48L139.778 59 155 48" transform="translate(-945 -931) translate(820 885)" />
                    </g>
                </g>
            </g>
        </svg>
    )
}