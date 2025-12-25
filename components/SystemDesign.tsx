
import React from 'react';

interface SystemDesignProps {
  t: (key: string) => string;
}

const SystemDesign: React.FC<SystemDesignProps> = ({ t }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12 animate-fade-in text-gray-800">
      <section>
        <h2 className="text-3xl font-bold mb-4 border-b pb-2">{t('architecture.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">{t('architecture.frontend_title')}</h3>
            <p className="text-gray-600 mb-4">{t('architecture.frontend_desc')}</p>
            <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
              <li>Next.js Turbopack</li>
              <li>Module Federation</li>
              <li>Tailwind JIT</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">{t('architecture.database_title')}</h3>
            <p className="text-gray-600 mb-4">{t('architecture.database_desc')}</p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`Tenant {
  id: UUID,
  slug: String,
  config: JSONB, 
  meta: JSONB
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6">{t('architecture.cicd_title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-slate-700 p-4 rounded-lg">
            <h4 className="font-bold text-blue-400 mb-2">{t('architecture.build_pipeline')}</h4>
            <p className="text-sm opacity-80">GitHub Actions, Docker, S3/Cloudfront.</p>
          </div>
          <div className="border border-slate-700 p-4 rounded-lg">
            <h4 className="font-bold text-blue-400 mb-2">{t('architecture.kubernetes')}</h4>
            <p className="text-sm opacity-80">Autoscaling, Nginx Ingress, SSL.</p>
          </div>
          <div className="border border-slate-700 p-4 rounded-lg">
            <h4 className="font-bold text-blue-400 mb-2">{t('architecture.disaster')}</h4>
            <p className="text-sm opacity-80">AWS Aurora Global, Multi-cloud failover.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">{t('architecture.security_title')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="font-bold text-emerald-700">GDPR/KVKK</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="font-bold text-blue-700">RBAC / 2FA</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="font-bold text-purple-700">Monitoring</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <div className="font-bold text-amber-700">WCAG 2.1 AA</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemDesign;
