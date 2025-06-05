export interface FaqCategory {
    id: number
    name: string
    faqs: Faq[]
}

export interface Faq {
    id: number
    question: string
    answer: string
    category_id: number
}
