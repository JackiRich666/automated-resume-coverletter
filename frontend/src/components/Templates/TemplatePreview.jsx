function TemplatePreview({ template }) {
  if (!template) {
    return <p style={{ color: '#4a5568' }}>Выберите шаблон для предпросмотра</p>;
  }

  return (
    <div className="card">
      <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '8px', marginBottom: '16px' }}>
        {template.name}
      </h3>
      <div style={{ marginBottom: '12px' }}>
        <strong>Тип:</strong> {template.type === 'resume' ? 'Резюме' : 'Сопроводительное письмо'}
      </div>
      <div style={{ background: '#f7fafc', padding: '16px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          {template.content || 'Содержимое шаблона отсутствует'}
        </pre>
      </div>
    </div>
  );
}

export default TemplatePreview;