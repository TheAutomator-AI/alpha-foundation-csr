export interface Trustee {
  role: string;
  name: string;
}

export interface FoundationData {
  name: string;
  activeSince: string;
  projectValue: {
    formatted: string;
    unit: string;
    label: string;
    description: string;
  };
  csrRegistration: {
    number: string;
    label: string;
    description: string;
  };
  taxExemptions: {
    sections: string[];
    act: string;
    label: string;
  };
  nitiAayog: {
    reference: string;
    label: string;
  };
  operatingRegions: string[];
  leadership: Trustee[];
  contact: {
    emails: string[];
    phones: string[];
    address: {
      street: string;
      area: string;
      city: string;
      postalCode: string;
      formatted: string;
    };
  };
}

export const FOUNDATION_INSTITUTIONAL_DATA: FoundationData = {
  name: "ALPHA FOUNDATION",
  activeSince: "2003",
  projectValue: {
    formatted: "₹3,311",
    unit: "CRORE",
    label: "CA APPROVED PROJECT VALUE",
    description: "CA Approved Project Value",
  },
  csrRegistration: {
    number: "CSR 00029723",
    label: "CSR REGISTRATION",
    description: "CSR Registration",
  },
  taxExemptions: {
    sections: ["12AA", "80G"],
    act: "Section 12AA & 80G of the Income Tax Act, 1961",
    label: "TAX EXEMPTIONS",
  },
  nitiAayog: {
    reference: "TN/2020/0253326",
    label: "NITI AAYOG",
  },
  operatingRegions: [
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Puducherry",
  ],
  leadership: [
    {
      role: "MANAGING TRUSTEE",
      name: "K. Guruvandavar",
    },
    {
      role: "FINANCIAL TRUSTEE",
      name: "P. Madappan",
    },
  ],
  contact: {
    emails: [
      "info@alphatrust.co.in",
      "k.guruvandavar@alphatrust.co.in",
    ],
    phones: [
      "+91 9535345474",
      "+91 9344437331",
    ],
    address: {
      street: "No.50B, Venkateshwara Oil Mill Street",
      area: "Avadi",
      city: "Chennai",
      postalCode: "600071",
      formatted: "No.50B, Venkateshwara Oil Mill Street, Avadi, Chennai-600071.",
    },
  },
};
