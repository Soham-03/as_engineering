// types/index.ts
export interface Product {
    id: number
    title: string
    description: string
    imageUrl: string
  }
  
  export interface Service {
    id: number
    title: string
    description: string
    icon: React.ReactNode
  }
  
  export interface NavItem {
    id: number
    title: string
    href: string
  }

  // app/types/index.ts
export interface Category {
  id: string;
  categoryImg: string;
}

export interface Machine {
  id: string;
  machineImg: string;
  price?: string;
  youtube?: string;
  details?: {
    [key: string]: string;
  };
  additionalImages?: string[];
}