import { useState } from 'react';
import TemplateSelector from '../components/Templates/TemplateSelector';
import TemplatePreview from '../components/Templates/TemplatePreview';

function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Шаблоны резюме и писем</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
          <div>
            <h3>Выберите шаблон</h3>
            <TemplateSelector onSelect={setSelectedTemplate} selectedId={selectedTemplate?.id} />
          </div>
          <div>
            <h3>Предпросмотр</h3>
            <TemplatePreview template={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatesPage;