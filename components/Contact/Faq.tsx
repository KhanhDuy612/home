import React, { useState, useRef, useEffect } from "react";
import useFaqQuery from "./hooks/useFaqQuery";
import { FaqCategory } from "./faq.interface";
import CKEditor from "../Common/CKEditor";

function AnimatedCollapse({children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden`}
        >
            <div ref={ref} className="px-0 py-0 text-gray-600">
                {children}
            </div>
        </div>
    );
}

export default function Faq() {
    const { data: categories } = useFaqQuery() as { data: FaqCategory[] };
    const [openCategory, setOpenCategory] = useState<number | null>(null);
    const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

    const handleCategoryClick = (id: number) => {
        setOpenCategory(openCategory === id ? null : id);
    };

    const handleQuestionClick = (catId: number, qId: number) => {
        const questionKey = `${catId}-${qId}`;
        setOpenQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionKey)) {
                newSet.delete(questionKey);
            } else {
                newSet.add(questionKey);
            }
            return newSet;
        });
    };

    const isQuestionOpen = (catId: number, qId: number) => {
        return openQuestions.has(`${catId}-${qId}`);
    };

    return (
        <section className="max-w-[1800px] mx-auto">
            <h2 className="mt-10 mb-8 text-2xl font-semibold tracking-widest text-center">Frequent Asked Questions (FAQ)</h2>
            <div className="w-20 h-10 mx-auto border-black border-solid border-1" style={{
                borderTop: '1px solid black',
            }}></div>
            {categories?.map((cat) => (
                <div key={cat.id} className="mb-4 overflow-hidden transition-all duration-1000 ease-in-out bg-white border rounded">
                    <button
                        className="flex items-center justify-between w-full px-6 py-4 text-2xl font-medium tracking-wide focus:outline-none"
                        onClick={() => handleCategoryClick(cat.id)}
                    >
                        <CKEditor data={cat.name} />
                        <span className="font-light text-[30px]">{openCategory === cat.id ? "×" : "+"}</span>
                    </button>
                        <div className="duration-300 ease-in-out transition-[height,opacity,max-height]" style={{
                            maxHeight: openCategory === cat.id ? '2000px' : '0',
                            opacity: openCategory === cat.id ? 1 : 0,
                            transform: openCategory === cat.id ? 'translateY(0)' : 'translateY(-9999px)',

                        }}>
                            <div>
                                {cat.faqs.map((faq) => (
                                    <div key={faq.id} className="border-t">
                                        <button
                                            className="flex items-center justify-between w-full py-4 text-2xl font-medium text-left transition-colors duration-200 px-7 focus:outline-none hover:bg-gray-50"
                                            onClick={() => handleQuestionClick(cat.id, faq.id)}
                                        >
                                            <CKEditor data={faq.question} />
                                            <div className={`text-[30px] border-l-[1px] border-b-[1px] p-1 w-1 h-1 border-black transition-all duration-300 ease-in-out ${isQuestionOpen(cat.id, faq.id) ? 'rotate-[135deg]' : 'rotate-[-45deg]'}`}></div>
                                        </button>
                                        <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{
                                            maxHeight: isQuestionOpen(cat.id, faq.id) ? '500px' : '0',
                                            opacity: isQuestionOpen(cat.id, faq.id) ? 1 : 0,
                                        }}>
                                            <div className="px-10 pb-4 font-medium text-1xl">
                                                <CKEditor data={faq.answer} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            ))}
        </section>
    );
}
