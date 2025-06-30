const dummySubAdmins = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        password: "password123",
        role: "Finance Manager",
        permissions: ["View Reports", "Edit Members", "Approve Payments"],
        status: "Active",
        createdAt: "2024-03-15 09:30:45"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 987-6543",
        password: "sarahj2024",
        role: "Support Admin",
        permissions: ["View Members", "Edit Members", "Customer Support"],
        status: "Active",
        createdAt: "2024-03-10 14:22:31"
      },
      {
        id: 3,
        name: "Michael Chen",
        email: "michael.c@example.com",
        phone: "+1 (555) 456-7890",
        password: "mikechen123",
        role: "Content Manager",
        permissions: ["Content Management", "Edit Members"],
        status: "Inactive",
        createdAt: "2024-02-28 11:15:05"
      },
      {
        id: 4,
        name: "Emily Wilson",
        email: "emily.w@example.com",
        phone: "+1 (555) 234-5678",
        password: "wilson2024",
        role: "Analytics Admin",
        permissions: ["View Reports", "Analytics Dashboard"],
        status: "Active",
        createdAt: "2024-02-20 16:48:22"
      },
      {
        id: 5,
        name: "Robert Davis",
        email: "robert.d@example.com", 
        phone: "+1 (555) 876-5432",
        password: "robert2024",
        role: "Marketing Manager",
        permissions: ["Marketing Tools", "View Reports", "Email Campaigns"],
        status: "Active",
        createdAt: "2024-01-15 10:05:18"
      }
  ];
  
  const roleOptions = [
    "Finance Manager",
    "Support Admin",
    "Content Manager",
    "Analytics Admin",
    "Marketing Manager",
    "General Admin"
  ];
  
  const permissionOptions = [
    "View Members",
    "Edit Members",
    "Delete Members",
    "View Reports",
    "Generate Reports",
    "Approve Payments",
    "Content Management",
    "Customer Support",
    "Analytics Dashboard",
    "Marketing Tools",
    "Email Campaigns"
  ];


  export {roleOptions,permissionOptions, dummySubAdmins }