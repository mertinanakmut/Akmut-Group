
export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  PLANNED = 'PLANNED',
  RESEARCH = 'RESEARCH'
}

export enum TenantType {
  STUDIO = 'STUDIO',
  DIGITAL = 'DIGITAL',
  LOGISTICS = 'LOGISTICS',
  FINTECH = 'FINTECH',
  RETAIL = 'RETAIL'
}

export interface CompanyDetails {
  founded?: string;
  launch?: string;
  teamSize: string;
  focus: string[];
  website?: string;
  contact: string;
  vision?: string[];
  tagline: { tr: string; en: string };
}

export interface AkmutCompany {
  id: string;
  name: string;
  status: CompanyStatus;
  imageUrl?: string;
  sector: { tr: string; en: string };
  description: { tr: string; en: string };
  details: CompanyDetails;
  theme: {
    primary: string;
    accent: string;
  };
}

export interface TenantConfig {
  id: string;
  name: string;
  subdomain: string;
  type: TenantType;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    darkBackground: string;
    lightBackground: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}