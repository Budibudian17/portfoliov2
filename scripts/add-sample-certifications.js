const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCS3qb-46rW_LVA6vDWZib2KWwlqdvI4qQ",
  authDomain: "hilmiportfoliodev.firebaseapp.com",
  projectId: "hilmiportfoliodev",
  storageBucket: "hilmiportfoliodev.firebasestorage.app",
  messagingSenderId: "387779604069",
  appId: "1:387779604069:web:114a89857946a9f3c5208c",
  measurementId: "G-T9RC0YKQN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleCertifications = [
  {
    title: "BNSP Competency Certificate",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    issueDate: "2023-06-15",
    description: "Professional competency certification in software development and programming",
    category: "Programming",
    pinned: true,
    credentialId: "BNSP-2023-001",
    credentialUrl: "https://bnsp.go.id/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "TOEIC Score Certificate",
    issuer: "ETS (Educational Testing Service)",
    issueDate: "2023-03-20",
    description: "English proficiency certification with high score in listening and reading",
    category: "Language",
    pinned: true,
    credentialId: "TOEIC-2023-001",
    credentialUrl: "https://www.ets.org/toeic/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Game Development Workshop",
    issuer: "Unity Technologies",
    issueDate: "2023-08-10",
    description: "Advanced game development workshop covering Unity engine and C# programming",
    category: "Programming",
    pinned: false,
    credentialId: "UNITY-2023-001",
    credentialUrl: "https://unity.com/learn/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Public Speaking Masterclass",
    issuer: "Toastmasters International",
    issueDate: "2023-05-12",
    description: "Advanced public speaking and presentation skills certification",
    category: "Other",
    pinned: false,
    credentialId: "TM-2023-001",
    credentialUrl: "https://www.toastmasters.org/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Industry Class Certificate",
    issuer: "SMK Negeri 1 Depok",
    issueDate: "2023-01-15",
    description: "Industry-focused software development training program",
    category: "Programming",
    pinned: false,
    credentialId: "SMK-2023-001",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Japanese Language Proficiency",
    issuer: "Japan Foundation",
    issueDate: "2022-12-01",
    description: "Basic Japanese language proficiency certification",
    category: "Language",
    pinned: false,
    credentialId: "JP-2022-001",
    credentialUrl: "https://www.jpf.go.jp/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Dibimbing.id Bootcamp",
    issuer: "Dibimbing.id",
    issueDate: "2023-09-20",
    description: "Intensive web development bootcamp covering modern technologies",
    category: "Programming",
    pinned: false,
    credentialId: "DIBIMBING-2023-001",
    credentialUrl: "https://dibimbing.id/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    issueDate: "2023-11-05",
    description: "Google Cloud Platform fundamentals and basic infrastructure",
    category: "Cloud Computing",
    pinned: false,
    credentialId: "GCP-2023-001",
    credentialUrl: "https://cloud.google.com/certification/verify",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

async function addSampleCertifications() {
  try {
    console.log('🚀 Adding sample certifications...');
    
    for (const cert of sampleCertifications) {
      const docRef = await addDoc(collection(db, "certifications"), cert);
      console.log(`✅ Added certification: ${cert.title} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 All sample certifications added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding certifications:', error);
    process.exit(1);
  }
}

// Run the script
addSampleCertifications();
