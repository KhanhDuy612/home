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

            if (!data) {
                console.error(`No data found for section type: ${section.section_type}`);
                return null;
            }
            switch (section.section_type) {
                case 'featured':
                    return <FeaturedProperties key={section.id} data={data} />;
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
