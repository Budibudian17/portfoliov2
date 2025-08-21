// Script untuk mengupdate project yang sudah ada dengan field projectType
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Konfigurasi Firebase (sesuaikan dengan konfigurasi Anda)
const firebaseConfig = {
  // Tambahkan konfigurasi Firebase Anda di sini
  // apiKey: "your-api-key",
  // authDomain: "your-auth-domain",
  // projectId: "your-project-id",
  // storageBucket: "your-storage-bucket",
  // messagingSenderId: "your-messaging-sender-id",
  // appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mapping project berdasarkan nama untuk menentukan tipe
const projectTypeMapping = {
  'CiptaLife Healthcare Platform': 'collaboration',
  'Platform Kesehatan CiptaLife': 'collaboration',
  'CiptaLifeヘルスケアプラットフォーム': 'collaboration',
  'Enterprise Resource Planning System': 'collaboration',
  'Sistem Enterprise Resource Planning': 'collaboration',
  '企業資源計画システム': 'collaboration',
  'Personal Portfolio Website': 'individual',
  'Website Portfolio Pribadi': 'individual',
  '個人ポートフォリオウェブサイト': 'individual'
};

async function updateProjectTypes() {
  try {
    console.log('🔄 Memulai update project types...');
    
    // Ambil semua project
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    
    if (snapshot.empty) {
      console.log('ℹ️ Tidak ada project yang ditemukan.');
      return;
    }
    
    console.log(`📊 Ditemukan ${snapshot.size} project untuk diupdate.`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const docSnapshot of snapshot.docs) {
      const projectData = docSnapshot.data();
      const projectId = docSnapshot.id;
      
      // Skip jika sudah ada projectType
      if (projectData.projectType) {
        console.log(`⏭️ Project "${projectData.title}" sudah memiliki projectType: ${projectData.projectType}`);
        skippedCount++;
        continue;
      }
      
      // Tentukan tipe project berdasarkan nama
      let projectType = 'individual'; // default
      
      if (projectTypeMapping[projectData.title]) {
        projectType = projectTypeMapping[projectData.title];
      } else {
        // Jika tidak ada mapping, gunakan default atau logic lain
        console.log(`⚠️ Tidak ada mapping untuk project "${projectData.title}", menggunakan default: individual`);
      }
      
      // Update project dengan projectType
      await updateDoc(doc(db, 'projects', projectId), {
        projectType: projectType
      });
      
      console.log(`✅ Project "${projectData.title}" diupdate dengan projectType: ${projectType}`);
      updatedCount++;
    }
    
    console.log('\n🎉 Update selesai!');
    console.log(`📈 Total project diupdate: ${updatedCount}`);
    console.log(`⏭️ Total project dilewati: ${skippedCount}`);
    console.log(`📊 Total project diproses: ${updatedCount + skippedCount}`);
    
  } catch (error) {
    console.error('❌ Error saat update project types:', error);
  }
}

// Jalankan script
updateProjectTypes()
  .then(() => {
    console.log('✅ Script selesai dijalankan.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script gagal:', error);
    process.exit(1);
  });
