
import { AkmutCompany, CompanyStatus, TenantConfig, TenantType } from './types';

export const TENANTS: TenantConfig[] = [
  {
    id: 'akmut-group',
    name: 'Akmut Group',
    subdomain: 'group',
    type: TenantType.STUDIO,
    theme: {
      primary: '#020617',
      secondary: '#1e293b',
      accent: '#94a3b8',
      darkBackground: '#020617',
      lightBackground: '#f8fafc'
    }
  }
];

export const COMPANIES: AkmutCompany[] = [
  {
    id: 'akmut-digital',
    name: 'Akmut Digital',
    status: CompanyStatus.ACTIVE,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    sector: { tr: 'Dijital Dönüşüm ve SaaS', en: 'Digital Transformation & SaaS' },
    description: { 
      tr: 'Quick Swap ve TryonX gibi yenilikçi ürünlerle dijital ekosistemi yeniden şekillendiren teknoloji odaklı girişim.',
      en: 'Technology-driven venture reshaping the digital ecosystem with innovative products like Quick Swap and TryonX.'
    },
    details: {
      founded: '2025',
      teamSize: 'Mühendislik Odaklı Çekirdek Ekip',
      focus: ['Quick Swap', 'TryonX', 'Custom SaaS', 'Mobile Engineering'],
      website: 'digital.akmutgroup.com.tr',
      contact: 'destek@akmutgroup.com.tr',
      tagline: { tr: 'Mühendislik Hassasiyetiyle Geleceği İnşa Ediyoruz', en: 'Engineering the Future with Precision' }
    },
    theme: { primary: '#020617', accent: '#94a3b8' }
  },
  {
    id: 'akmut-logistics',
    name: 'Akmut Logistics',
    status: CompanyStatus.RESEARCH,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    sector: { tr: 'Lojistik Teknolojileri (Ar-Ge)', en: 'Logistics Technology (R&D)' },
    description: { 
      tr: 'Yapay zeka ve IoT tabanlı akıllı filo ve depo yönetim sistemleri üzerine uzmanlaşmış Ar-Ge aşamasındaki girişim.',
      en: 'R&D stage venture specialized in AI and IoT-driven smart fleet and warehouse management systems.'
    },
    details: {
      launch: '2026',
      teamSize: 'Ar-Ge Aşamasında',
      focus: ['IoT Systems', 'AI Logistics', 'Smart Warehousing'],
      contact: 'destek@akmutgroup.com.tr',
      vision: [
        'Otonom operasyon yönetimi',
        'Gerçek zamanlı veri analitiği',
        'Akıllı tedarik zinciri optimizasyonu'
      ],
      tagline: { tr: 'Akıllı Lojistik Ekosistemi', en: 'Smart Logistics Ecosystem' }
    },
    theme: { primary: '#0f172a', accent: '#cbd5e1' }
  }
];

export const ROADMAP = [
  { 
    year: '2025', 
    title: { tr: 'Kuruluş ve Digital Lansman', en: 'Inception & Digital Launch' }, 
    desc: { 
      tr: 'Akmut Group\'un Ankara merkezli kuruluşu; Quick Swap ve TryonX platformlarının Türkiye pazarına sunulması.', 
      en: 'Founding of Akmut Group in Ankara; launching Quick Swap and TryonX platforms in the Turkish market.' 
    } 
  },
  { 
    year: '2026', 
    title: { tr: 'Logistics Ar-Ge Entegrasyonu', en: 'Logistics R&D Integration' }, 
    desc: { 
      tr: 'Yapay zeka ve IoT tabanlı lojistik çözümlerinin otonom sistemlerle devreye alınması.', 
      en: 'Deploying AI and IoT-based logistics solutions with autonomous system integration.' 
    } 
  },
  { 
    year: '2027', 
    title: { tr: 'Fintech Dikeyine Geçiş', en: 'Transition to Fintech' }, 
    desc: { 
      tr: 'Finansal teknolojiler dikeyinde yeni girişimlerin ekosisteme entegrasyonu ve global büyüme.', 
      en: 'Integration of new ventures in the financial technologies vertical and global scaling.' 
    } 
  }
];
