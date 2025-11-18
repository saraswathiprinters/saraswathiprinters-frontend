export interface Service {
  id: string;
  title: string;
  icon: string;
  features: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  alt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  file?: File;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}