export const academicClassesData = [
  {
    id: 1,
    name: "Grade 10",
    sections: ["SEC-A", "SEC-B"],
    department: "Secondary",
    fee: "$250.00",
    capacity: "60 Students",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Grade 09",
    sections: ["SEC-A"],
    department: "Secondary",
    fee: "$220.00",
    capacity: "30 Students",
    status: "ACTIVE"
  }
];

export const classFormSchema = [
  {
    type: "row",
    fields: [
      { name: "className", label: "Class Name", placeholder: "e.g. Grade 5", required: true },
      { name: "capacity", label: "Capacity", placeholder: "e.g. 30", required: true },
      { name: "department", label: "Department", placeholder: "e.g. Primary / Secondary", required: true }
    ]
  },
  {
    name: "sections",
    label: "Define Sections (Comma Separated)",
    type: "textarea",
    rows: 2,
    placeholder: "A, B, C...",
    marginTop: "1rem",
    required: true
  }
];

// Data table array
export const campusBranchesData = [
  {
    id: 1,
    name: "North City Campus",
    subtitle: "Main Branch",
    code: "NCC-001",
    address: "123 North Avenue, New York",
    contact: "+1 234 567 890",
    head: "Dr. Robert Wilson",
    status: "OPERATIONAL"
  }
];

// Reusable configurations for the DynamicForm props
export const campusFormSchema = [
  {
    type: "row",
    fields: [
      { name: "name", label: "Campus Name", type: 'text', placeholder: "e.g. Downtown Campus", required: true },
    ]
  },
  {
    type: "row",
    fields: [
      { name: "contact", label: "Phone Number", type: 'text', placeholder: "Emergency contact number", required: true }
    ]
  },
  {
    name: "address",
    label: "Physical Address",
    type: "textarea",
    rows: 3,
    placeholder: "Enter full street address, city, and zip",
    marginTop: "1rem",
    required: true
  }
];
// Row datasets mapping to the ledger columns
export const accountsLedgerData = [
  {
    id: 1,
    code: "1000-01",
    name: "Cash in Hand",
    category: "Assets",
    subCategory: "Current Assets",
    balanceType: "Debit",
    status: "ACTIVE"
  },
  {
    id: 2,
    code: "4000-05",
    name: "Tuition Fee Revenue",
    category: "Revenue",
    subCategory: "Operating Income",
    balanceType: "Credit",
    status: "ACTIVE"
  },
  {
    id: 3,
    code: "5000-12",
    name: "Staff Salaries",
    category: "Expenses",
    subCategory: "Administrative",
    balanceType: "Debit",
    status: "ACTIVE"
  }
];

// Structural array configuration for DynamicForm props
export const accountFormSchema = [
  {
    type: "row",
    fields: [
      { name: "accountName", label: "Account Name", placeholder: "e.g. Electricity Expense", required: false },
      { name: "accountCode", label: "Account Code (GL)", placeholder: "e.g. 5000-01", required: false }
    ]
  },
  {
    type: "row",
    fields: [
      { 
        name: "primaryCategory",
        label: "Primary Category", 
        type: "select", 
        options: ["Assets", "Liabilities", "Revenue", "Expenses", "Equity"], 
        required: false 
      },
      { 
        name: "balanceType",
        label: "Balance Type", 
        type: "select", 
        options: ["Debit", "Credit"], 
        required: false 
      }
    ]
  },
  {
    name: "openingBalance",
    label: "Opening Balance",
    type: "number",
    placeholder: "0.00",
    required: false
  },
  {
    name: "accountDescription",
    label: "Account Description",
    type: "textarea",
    rows: 2,
    placeholder: "Describe the purpose of this account...",
    marginTop: "1rem",
    required: false
  }
];

// Data rows tailored safely to match registration fields maps
export const classesSectionData = [
  {
    id: 1,
    className: "Muhammad Bilal",
    description: "Guard: Tariq Mahmood | +92 300 9876543",
    numericLevel: "Grade 10",
    sections: ["CNIC/B-Form", " SLC ", "Photos"],
    capacity: "Standard Rs: 8,500",
    shift: "Morning",
    status: "VERIFIED"
  },
  {
    id: 2,
    className: "Eshal Fatima",
    description: "Guard: Muhammad Asif | +92 321 4567890",
    numericLevel: "Grade 09",
    sections: ["CNIC/B-Form", "Photos"],
    capacity: "Standard Rs: 8,500",
    shift: "Morning",
    status: "PENDING"
  }
];

// Form schema updated to safely collect student profile info
export const classesFormSchema = [
  {
    type: "row",
    fields: [
      { name: "studentName", label: "Applicant's Full Name", placeholder: "e.g. Muhammad Bilal", required: true },
      { name: "targetGrade", label: "Target Grade / Level", placeholder: "e.g. Grade 09 or Grade 10", required: true }
    ]
  },
  {
    type: "row",
    fields: [
      { 
        name: "admissionShift", 
        label: "Preferred Campus Shift", 
        type: "select", 
        options: ["Morning Shift", "Evening Shift"], 
        required: true 
      },
      { name: "guardianContact", label: "Guardian Contact Number", type: "text", placeholder: "e.g. +92 300 0000000", required: true }
    ]
  },
  {
    name: "submittedDocs",
    label: "Documents Submitted (Separate with commas)",
    type: "textarea",
    rows: 2,
    placeholder: "B-Form, Previous School Leaving Certificate, Guardian CNIC copy...",
    required: false
  }
];

// Data rows for the organizational structures table
export const departmentsData = [
  {
    id: 1,
    name: "Academic - Science",
    designations: ["HOD", "Lecturer"],
    staffCount: "24 Members",
    lead: "Dr. Sarah Jenkins",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Administration",
    designations: ["Accountant", "Clerk"],
    staffCount: "12 Members",
    lead: "James Wilson",
    status: "ACTIVE"
  }
];

// Structural array configuration for the AddClassForm component
export const departmentFormSchema = [
  {
    type: "row",
    fields: [
      { 
        name: "Lead",
        label: "Lead / Head of Department", 
       placeholder: "e.g. name of HOD or Lead",
        required: false 
      },
      { name: "KeyDesignation", label: "Key Designation", placeholder: "e.g. Science or Principal", required: false }
    ]
  },
  {
    name: "DepartmentName",
    label: " Department Name",
    type: "select",
    options: ["None (Main Unit)", "Academic", "Administrative"],
    required: false
  },
   { name: "StaffCount", label: "Staff Count", placeholder: "e.g. 24", required: false }
];

// Data rows for the academic assessments ledger table
export const examinationData = [
  {
    id: 1,
    name: "First Term Assessment",
    session: "2025-26",
    type: "Quarterly",
    date: "Oct 15, 2025",
    weightage: "20%",
    status: "COMPLETED",
    badgeStyles: { background: '#f3f4f6', color: '#6b7280' }
  },
  {
    id: 2,
    name: "Final Examination",
    session: "2025-26",
    type: "Annual",
    date: "Mar 25, 2026",
    weightage: "50%",
    status: "UPCOMING",
    badgeStyles: { background: '#eff6ff', color: '#006fee' }
  }
];

// Structural array configuration for the AddClassForm template layout
export const examinationFormSchema = [
  {
    type: "row",
    fields: [
      { name: "examTitle", label: "Exam Title", placeholder: "e.g. Midterm Examination", required: false },
      { name: "termShortName", label: "Term Short Name", placeholder: "e.g. MID-26", required: false }
    ]
  },
  {
    type: "row",
    style: { gridTemplateColumns: '1fr 1fr 1fr' },
    fields: [
      { 
        name: "examCategory",
        label: "Exam Category", 
        type: "select", 
        options: ["Monthly Test", "Mid Term", "Final Term"], 
        required: false 
      },
      { name: "resultPublicationDate", label: "Result Publication Date", type: "date", required: false },
      { name: "weightagePercentage", label: "Weightage %", type: "number", placeholder: "e.g. 30", required: false }
    ]
  },
  {
    type: "row",
    style: { alignItems: 'center', marginTop: '10px' },
    fields: [
      { name: "includeInCgpa", label: "Include in Final CGPA", type: "text", required: false },
      { name: "showOnParentPortal", label: "Show on Parent Portal", type: "text", required: false }
    ]
  },
  {
    name: "instructionalNotes",
    label: "Instructional Notes for Result Card",
    type: "textarea",
    rows: 2,
    placeholder: "e.g. Passing marks are 40% in each subject...",
    marginTop: "1.5rem",
    required: false
  }
];

// Data rows for the Fee Categories table layout
export const feeTypeData = [
  {
    id: 1,
    name: "Tuition Fee",
    description: "Academic Instruction",
    frequency: "Monthly",
    freqColor: "var(--accent-blue)",
    accountCode: "ACC-4001",
    mandatory: "Yes",
    amount: "$200.00",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Admission Fee",
    description: "New Enrollment Only",
    frequency: "One-Time",
    freqColor: "#9333ea",
    accountCode: "ACC-4002",
    mandatory: "Yes",
    amount: "$500.00",
    status: "ACTIVE"
  }
];

// Structural array configuration for building the AddClassForm input groups
export const feeTypeFormSchema = [
  {
    type: "row",
    fields: [
      { name: "feeName", label: "Fee Name", placeholder: "e.g. Sports Fee", required: false },
      { name: "shortCode", label: "Short Code", placeholder: "e.g. SPF-01", required: false }
    ]
  },
  {
    type: "row",
    style: { gridTemplateColumns: '1fr 1fr 1fr' },
    fields: [
      { 
        name: "frequency",
        label: "Frequency", 
        type: "select", 
        options: ["Monthly", "Quarterly", "Bi-Annually", "Annually", "One-Time"], 
        required: false 
      },
      { 
        name: "ledgerAccount",
        label: "Ledger Account", 
        type: "select", 
        options: ["Income - Tuition", "Income - Other"], 
        required: false 
      },
      { name: "baseAmount", label: "Base Amount", type: "number", placeholder: "0.00", required: false }
    ]
  },
  {
    type: "row",
    style: { alignItems: 'center', marginTop: '10px' },
    fields: [
      { name: "mandatoryForAll", label: "Mandatory for all students", type: "text", placeholder: "e.g. Yes / No", required: false },
    ]
  },
  {
    name: "lateFeeFineLogic",
    label: "Late Fee Fine Logic (If any)",
    type: "textarea",
    rows: 2,
    placeholder: "e.g. $5 per day after 10th of each month",
    marginTop: "1.5rem",
    required: false
  }
];

// Data ledger representing application-wide security tracking events
export const logsData = [
  {
    id: 1,
    time: "May 01, 1:30 PM",
    userName: "Saad Ahmed",
    userRole: "Admin",
    action: "Updated Fee Structure",
    module: "Finance",
    ipAddress: "192.168.1.105",
    status: "SUCCESS",
    rowStyle: {},
    badgeStyle: { background: '#dcfce7', color: '#16a34a' }
  },
  {
    id: 2,
    time: "May 01, 12:45 PM",
    userName: "John Doe",
    userRole: "Teacher",
    action: "Modified Attendance",
    module: "Academic",
    ipAddress: "192.168.1.210",
    status: "SUCCESS",
    rowStyle: {},
    badgeStyle: { background: '#dcfce7', color: '#16a34a' }
  },
  {
    id: 3,
    time: "May 01, 11:20 AM",
    userName: "Unknown",
    userRole: null,
    action: "Failed Login Attempt",
    module: "Auth",
    ipAddress: "45.12.88.3",
    status: "FAILED",
    rowStyle: { backgroundColor: '#fff1f2' },
    badgeStyle: { background: '#fee2e2', color: '#dc2626' }
  }
];

// Data rows representing user security clearances and visibility rights
export const rolesData = [
  {
    id: 1,
    title: "Academic Teacher",
    permissions: ["Attendance", "Marks Entry"],
    userCount: "28 Users",
    lastModified: "2 hours ago",
    status: "AUTHORIZED"
  },
  {
    id: 2,
    title: "Finance Manager",
    permissions: ["Fee Collection", "Ledger View"],
    userCount: "02 Users",
    lastModified: "Yesterday",
    status: "AUTHORIZED"
  }
];

// Configuration blueprint mapping out input segments within the role creation modal 
export const rolesFormSchema = [
  {
    name: "roleName",
    label: "Role Name",
    placeholder: "e.g. Exam Coordinator",
    required: false
  },
  {
    name: "modulePermissions",
    label: "Assign Module Permissions",
    type: "checkboxGroup",
    marginTop: "1.5rem",
    style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' },
    options: [
      'Campus Management', 
      'Student Admission', 
      'Fee Management', 
      'Staff Payroll', 
      'Examination Control', 
      'Inventory Access'
    ]
  },
  {
    name: "actionLimits",
    label: "Action Limits",
    type: "inlineCheckboxes",
    marginTop: "1.5rem",
    style: { display: 'flex', gap: '20px', marginTop: '5px' },
    options: ['Read', 'Create', 'Update', 'Delete']
  }
];

// Data rows for the payroll components ledger table
export const salaryData = [
  {
    id: 1,
    name: "House Rent Allowance (HRA)",
    description: "Accommodation Support",
    category: "Earning",
    categoryType: "earning", 
    calcType: "% of Basic",
    value: "40%",
    taxable: "Yes",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Provident Fund (PF)",
    description: "Retirement Savings",
    category: "Deduction",
    categoryType: "deduction",
    calcType: "Fixed Amount",
    value: "$120.00",
    taxable: "No",
    status: "ACTIVE"
  }
];

// Structural schema mapping out input fields within the Salary form layout
export const salaryFormSchema = [
  {
    type: "row",
    fields: [
      { name: "componentName", label: "Component Name", placeholder: "e.g. Medical Allowance", required: false },
      { 
        name: "category",
        label: "Category", 
        type: "select", 
        options: ["Earning (+)", "Deduction (-)"], 
        required: false 
      }
    ]
  },
  {
    type: "row",
    style: { gridTemplateColumns: '1.5fr 1fr' },
    fields: [
      { 
        name: "calculationMethod",
        label: "Calculation Method", 
        type: "select", 
        options: ["Fixed Amount", "Percentage of Basic Pay", "Percentage of Gross Pay"], 
        required: false 
      },
      { name: "value", label: "Value ($ or %)", type: "number", placeholder: "0", required: false }
    ]
  },
  {
    type: "row",
    style: { marginTop: '10px' },
    fields: [
      { name: "taxableComponent", label: "Taxable Component", type: "text", id: "taxable", required: false },
      { name: "mandatoryForAll", label: "Mandatory for all", type: "text", id: "mandatory", required: false }
    ]
  }
];

// Academic subject records structure layout
export const subjectsData = [
  {
    id: 1,
    name: "Mathematics",
    description: "Core Curriculum",
    code: "MATH-101",
    assignedClass: "Grade 10",
    type: "Theory",
    typeColor: "var(--accent-blue)",
    totalMarks: 100,
    passingMarks: 33
  },
  {
    id: 2,
    name: "Physics (Lab)",
    description: "Science Stream",
    code: "PHY-102L",
    assignedClass: "Grade 10",
    type: "Practical",
    typeColor: "#9333ea",
    totalMarks: 50,
    passingMarks: 20
  }
];

// Structural matrix defining layout groups inside the Register Subject modal view
export const subjectsFormSchema = [
  {
    type: "row",
    fields: [
      { name: "subjectName", label: "Subject Name", placeholder: "e.g. Advanced Chemistry", required: false },
      { name: "subjectCode", label: "Subject Code", placeholder: "e.g. CHEM-201", required: false }
    ]
  },
  {
    type: "row",
    style: { gridTemplateColumns: '1fr 1fr 1fr' },
    fields: [
      { 
        name: "assignedClass",
        label: "Assigned Class", 
        type: "select", 
        options: ["Select Class", "Grade 9", "Grade 10"], 
        required: false 
      },
      { 
        name: "subjectCategory",
        label: "Subject Category", 
        type: "select", 
        options: ["Theory Only", "Practical Only", "Both"], 
        required: false 
      },
      { name: "passingPercentage", label: "Passing %", type: "number", placeholder: "33", required: false }
    ]
  },
  {
    type: "row",
    fields: [
      { name: "totalMarks", label: "Total Marks", type: "number", placeholder: "100", required: false }
    
    ]
  },
  {
    name: "subjectObjectives",
    label: "Subject Objectives / Description",
    type: "textarea",
    rows: "2",
    marginTop: "1rem",
    placeholder: "Briefly describe the learning outcomes...",
    required: false
  }
];

// Data rows representing faculty roster configurations
export const teacherTimingsData = [
  {
    id: 1,
    name: "Morning (Standard)",
    inTime: "07:30 AM",
    outTime: "02:30 PM",
    gracePeriod: "15 Mins",
    days: "Mon, Tue, Wed, Thu, Sat",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Friday Special",
    inTime: "07:30 AM",
    outTime: "12:30 PM",
    gracePeriod: "10 Mins",
    days: "Friday",
    status: "ACTIVE"
  }
];

// Configuration layout blueprints mapping out input properties inside the shift registration modal
export const teacherTimingsFormSchema = [
  {
    name: "shiftTitle",
    label: "Shift Title",
    placeholder: "e.g. Winter Shift",
    required: false
  },
  {
    type: "row",
    fields: [
      { name: "checkInTime", label: "Check-in Time", type: "time", required: false },
      { name: "checkOutTime", label: "Check-out Time", type: "time", required: false }
    ]
  },
  {
    type: "row",
    fields: [
      { name: "gracePeriod", label: "Grace Period (Mins)", type: "number", placeholder: "15", required: false },
      { name: "halfDayAfter", label: "Half Day After", type: "time", required: false }
    ]
  },
  {
    name: "applicableDays",
    label: "Applicable Days",
    type: "number",
    marginTop: "1rem",
    style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' },
    useBadgeStyle: true, 
    options: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    defaultChecked: true
  }
];

export const subjectAssignmentsData = [
  {
    id: 1,
    subjectName: "Advanced Mathematics",
    classCode: "MATH-102",
    classSection: "Grade 10 - Section A",
    assignedTeacher: "Dr. Saad Ahmed",
    weeklyHours: "6 Hours",
    status: "Assigned"
  }
];

export const subjectFormSchema = [
  { name: 'subjectName', label: 'Subject Name', type: 'text', placeholder: 'e.g., Physics' },
  { name: 'classCode', label: 'Class / Subject Code', type: 'text', placeholder: 'e.g., PHY-301' },
  { name: 'classSection', label: 'Target Class & Section', type: 'text', placeholder: 'e.g., Grade 10 - B' },
  { name: 'assignedTeacher', label: 'Assign Teacher', type: 'text', placeholder: 'e.g., Prof. John Doe' },
  { name: 'weeklyHours', label: 'Weekly Credit Hours', type: 'text', placeholder: 'e.g., 4 Hours' }
];

export const lessonPlansData = [
  {
    id: 1,
    topicName: "Introduction to Quadratic Equations",
    objective: "Understand factoring and vertex forms",
    subjectName: "Advanced Mathematics",
    classSection: "Grade 10 - Section A",
    scheduledDate: "2026-09-15",
    weekTerm: "Week 3 (Term 1)",
    status: "Approved"
  },
  {
    id: 2,
    topicName: "Chemical Bonding & Lewis Structures",
    objective: "Master covalent vs ionic models",
    subjectName: "Organic Chemistry",
    classSection: "Grade 11 - Section B",
    scheduledDate: "2026-09-17",
    weekTerm: "Week 3 (Term 1)",
    status: "Pending"
  }
];

export const lessonPlanFormSchema = [
  { name: 'topicName', label: 'Lesson Topic / Title', type: 'text', placeholder: 'e.g., Photosynthesis Part 1' },
  { name: 'objective', label: 'Learning Objectives', type: 'text', placeholder: 'What will students accomplish?' },
  { name: 'subjectName', label: 'Associated Subject', type: 'text', placeholder: 'e.g., Biology' },
  { name: 'classSection', label: 'Class & Section', type: 'text', placeholder: 'e.g., Grade 9 - C' },
  { name: 'scheduledDate', label: 'Execution Date', type: 'date', placeholder: '' },
  { name: 'weekTerm', label: 'Academic Week', type: 'text', placeholder: 'e.g., Week 4' }
];

export const topicCoverageData = [
  {
    id: 1,
    topicName: "Linear Equations & Graphing",
    chapterName: "Chapter 1: Algebra Foundations",
    subjectName: "Advanced Mathematics",
    classSection: "Grade 10 - Section A",
    completionPercentage: 100,
    completionDate: "2026-09-10",
    status: "Completed"
  },
  {
    id: 2,
    topicName: "Periodic Trends & Electron Shells",
    chapterName: "Chapter 2: Atomic Structure",
    subjectName: "Organic Chemistry",
    classSection: "Grade 11 - Section B",
    completionPercentage: 45,
    completionDate: "",
    status: "In Progress"
  }
];

export const topicCoverageFormSchema = [
  { name: 'topicName', label: 'Topic / Sub-topic Title', type: 'text', placeholder: 'e.g., Balancing Chemical Equations' },
  { name: 'chapterName', label: 'Parent Chapter / Unit', type: 'text', placeholder: 'e.g., Chapter 3: Stoichiometry' },
  { name: 'subjectName', label: 'Subject Name', type: 'text', placeholder: 'e.g., Chemistry' },
  { name: 'classSection', label: 'Class & Section Placement', type: 'text', placeholder: 'e.g., Grade 11 - B' },
  { name: 'completionPercentage', label: 'Current Progress Completion (%)', type: 'number', placeholder: 'e.g., 75' },
  { name: 'completionDate', label: 'Completion Date (If Finished)', type: 'date', placeholder: '' }
];

export const homeworkData = [
  {
    id: 1,
    title: "Exercise 3.4: Quadratic Proofs",
    description: "Complete problems 1 through 15 on sheets",
    subjectName: "Advanced Mathematics",
    classSection: "Grade 10 - Section A",
    issueDate: "2026-09-12",
    dueDate: "2026-09-15",
    status: "Graded"
  },
  {
    id: 2,
    title: "Lab Report: Covalent Bonding Structures",
    description: "Write conclusions based on Wednesday's lab model",
    subjectName: "Organic Chemistry",
    classSection: "Grade 11 - Section B",
    issueDate: "2026-09-14",
    dueDate: "2026-09-18",
    status: "Pending Review"
  }
];

export const homeworkFormSchema = [
  { name: 'title', label: 'Assignment Title / Topic', type: 'text', placeholder: 'e.g., Chapter 2 Review Questions' },
  { name: 'description', label: 'Instructions / Description', type: 'text', placeholder: 'e.g., Complete even numbers only...' },
  { name: 'subjectName', label: 'Subject Name', type: 'text', placeholder: 'e.g., English Literature' },
  { name: 'classSection', label: 'Class & Target Section', type: 'text', placeholder: 'e.g., Grade 9 - C' },
  { name: 'issueDate', label: 'Date Issued', type: 'date', placeholder: '' },
  { name: 'dueDate', label: 'Submission Due Date', type: 'date', placeholder: '' }
];

export const attendanceData = [
  {
    id: 1,
    studentName: "Zain Ali",
    rollNo: "2026-CS-04",
    classSection: "Grade 10 - Section A",
    subjectName: "Advanced Mathematics",
    dateLogged: "2026-06-17",
    remarks: "On Time",
    status: "Present"
  },
  {
    id: 2,
    studentName: "Sara Khan",
    rollNo: "2026-CS-12",
    classSection: "Grade 11 - Section B",
    subjectName: "Organic Chemistry",
    dateLogged: "2026-06-17",
    remarks: "Medical checkup document submitted",
    status: "Leave"
  }
];

export const attendanceFormSchema = [
  { name: 'studentName', label: 'Student Name', type: 'text', placeholder: 'e.g., Ali Raza' },
  { name: 'rollNo', label: 'Roll Number / ID', type: 'text', placeholder: 'e.g., 2026-CS-88' },
  { name: 'classSection', label: 'Class & Section Context', type: 'text', placeholder: 'e.g., Grade 10 - A' },
  { name: 'subjectName', label: 'Subject / Lecture Session', type: 'text', placeholder: 'e.g., Advanced Mathematics' },
  { name: 'dateLogged', label: 'Attendance Date', type: 'date', placeholder: '' },
  { name: 'status', label: 'Status (Present, Absent, Leave)', type: 'text', placeholder: 'e.g., Present' }
];

export const marksEntryData = [
  {
    id: 1,
    studentName: "Zain Ali",
    rollNo: "2026-CS-04",
    classSection: "Grade 10 - Section A",
    subjectName: "Advanced Mathematics",
    assessmentType: "Midterm Exam",
    obtainedMarks: "85",
    totalMarks: "100",
    status: "Published"
  },
  {
    id: 2,
    studentName: "Sara Khan",
    rollNo: "2026-CS-12",
    classSection: "Grade 11 - Section B",
    subjectName: "Organic Chemistry",
    assessmentType: "Quiz 1",
    obtainedMarks: "18",
    totalMarks: "20",
    status: "Published"
  }
];

export const marksEntryFormSchema = [
  { name: 'studentName', label: 'Student Name', type: 'text', placeholder: 'e.g., Haris Raza' },
  { name: 'rollNo', label: 'Roll Number / Student ID', type: 'text', placeholder: 'e.g., 2026-CS-99' },
  { name: 'classSection', label: 'Class & Section Context', type: 'text', placeholder: 'e.g., Grade 10 - A' },
  { name: 'subjectName', label: 'Subject Name', type: 'text', placeholder: 'e.g., Advanced Mathematics' },
  { name: 'assessmentType', label: 'Assessment Type (Exam, Quiz, Project)', type: 'text', placeholder: 'e.g., Midterm Exam' },
  { name: 'obtainedMarks', label: 'Obtained Marks', type: 'number', placeholder: 'e.g., 45' },
  { name: 'totalMarks', label: 'Total Weightage Marks', type: 'number', placeholder: 'e.g., 50' }
];

export const resultsData = [
  {
    id: 1,
    studentName: "Zain Ali",
    rollNo: "2026-CS-04",
    classSection: "Grade 10 - Section A",
    percentage: "88.4",
    gpa: "3.85",
    termName: "First Semester Finals",
    status: "Published"
  },
  {
    id: 2,
    studentName: "Sara Khan",
    rollNo: "2026-CS-12",
    classSection: "Grade 11 - Section B",
    percentage: "92.1",
    gpa: "3.98",
    termName: "First Semester Finals",
    status: "Published"
  }
];

export const resultsFormSchema = [
  { name: 'studentName', label: 'Student Name', type: 'text', placeholder: 'e.g., Sana Malik' },
  { name: 'rollNo', label: 'Roll Number / Student ID', type: 'text', placeholder: 'e.g., 2026-CS-102' },
  { name: 'classSection', label: 'Class & Section Context', type: 'text', placeholder: 'e.g., Grade 10 - A' },
  { name: 'percentage', label: 'Overall Cumulative Percentage (%)', type: 'number', placeholder: 'e.g., 85.5' },
  { name: 'gpa', label: 'Calculated CGPA', type: 'text', placeholder: 'e.g., 3.75' },
  { name: 'termName', label: 'Academic Term Framework', type: 'text', placeholder: 'e.g., Mid-Term Examination' }
];