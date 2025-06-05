import './CKEditor.css';
import { useEffect, useRef, useState } from 'react';

export default function CKEditor({ data }: { data: any }) {
  const [htmlContent, setHtmlContent] = useState(data);

  useEffect(() => {
    if (data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const headings = doc.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        const id = heading.textContent?.replace(/\s+/g, '-').toLowerCase() || '';
        heading.id = id;
      });

      const cleanedHtml = doc.body.innerHTML.replace(/font-family: 'book antiqua', palatino, serif;/g, '');
      setHtmlContent(cleanedHtml);
    }
  }, [data]);

  return <div className="custom-ckEditor" dangerouslySetInnerHTML={{ __html: htmlContent}}></div>;
}
