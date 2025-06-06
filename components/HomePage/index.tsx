import { getDataForSection, getPageSections } from "@/lib/api";
import FeaturedProperties from "../Room";
import Testimonial from "../Testimonial";
import ContactForm from "../ContactForm";

// EjpMFZNaGqrT8sGjVJgPIw9yItzYI-Z1
export default async function HomePage() {
    const sections = await getPageSections();

    const sectionComponents = await Promise.all(
        sections.map(async (section) => {
            const data = await getDataForSection(section.section_type);

            console.log('Section data:', data);
            console.log('Section type:', section);


            switch (section.section_type) {
                case 'featured':
                    return <FeaturedProperties key={section.id} data={section.data} />;
                case 'testimonial':
            console.log('Section typeđâs:', section);

                    return <Testimonial key={section.id} data={data} />;
                case 'contact':
                    return <ContactForm key={section.id} data={section.data} />;
                default:
                    return null;
            }
        })
    );

    return <>{sectionComponents}</>;
}
