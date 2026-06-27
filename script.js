// ==========================================================================
// 1. ระบบควบคุมการเปิดซองจดหมาย (Envelope Controls)
// ==========================================================================
const envelope = document.getElementById('envelope');
const introOverlay = document.getElementById('introOverlay');
const mainContent = document.getElementById('mainContent');
let introClickCount = 0;

envelope.addEventListener('click', (e) => {
  e.stopPropagation();
  introClickCount++;
  
  if (introClickCount === 1) {
    // คลิกครั้งที่ 1: เปิดฝาซองจดหมายขึ้นมา
    envelope.classList.add('open');
  } else if (introClickCount === 2) {
    // คลิกครั้งที่ 2: เฟดหน้าซองจดหมายออก และเปิดหน้าสมุดไดอารี่
    introOverlay.classList.add('fade-out');
    mainContent.classList.add('visible');
  }
});

// ==========================================================================
// 2. ระบบควบคุมการเปิดหน้าสมุดไดอารี่ (Diary Book Page Controls)
// ==========================================================================
let currentPage = 1;
const totalPages = 15; // หากคุณเพิ่มจำนวนหน้าใน HTML ให้มาแก้ตัวเลขรวมตรงนี้ด้วยนะครับ

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');

function updateDiary() {
  // ซ่อนหน้ากระดาษทั้งหมดก่อน
  document.querySelectorAll('.diary-page').forEach(page => {
    page.classList.remove('active');
  });

  // แสดงเฉพาะหน้าซ้ายและขวาที่มีค่า data-page ตรงกับหน้าปัจจุบัน
  document.querySelectorAll(`[data-page="${currentPage}"]`).forEach(page => {
    page.classList.add('active');
  });

  // อัปเดตข้อความตัวเลขระบุหน้าด้านล่างสมุด
  pageIndicator.innerText = `หน้า ${currentPage} / ${totalPages}`;

  // เช็คสถานะการเปิด/ปิดการใช้งานของปุ่มควบคุม
  prevBtn.disabled = (currentPage === 1);
  nextBtn.disabled = (currentPage === totalPages);
}

// อีเวนต์ปุ่มกดหน้าถัดไป
nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateDiary();
  }
});

// อีเวนต์ปุ่มกดหน้าก่อนหน้า
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateDiary();
  }
});

// ==========================================================================
// 3. ระบบคลิกเปลี่ยนรูปเฉพาะหน้า 2 (Food Image Gallery)
// ==========================================================================

// ลิสต์รายการรูปภาพทั้งหมดที่คุณต้องการให้แสดงในหน้า 2 (คุณเอาพาธรูปจริงมาใส่เพิ่มตรงนี้ได้เรื่อย ๆ เลยครับ)
const foodImages = [
  "/picture/6f609933ed7b49e98f4a9b3266ae4a8a.jpg", // รูปที่ 1 (บิงซูเมล่อน)
  "/picture/11ad64f180ad4460bc18dee21c8984a5.jpg",         // รูปที่ 2 (ลองเปลี่ยนเป็นพาธรูปข้าวหรือรูปถัดไปของคุณ)
  "/picture/307ed0787fe44e22a31822b89d3c44db.jpg"           // รูปที่ 3 (ถ้ามีเพิ่ม สามารถพิมพ์ต่อท้ายในคอมมาได้เลย)
];

let currentFoodIndex = 0;
const galleryImg = document.getElementById('galleryImg');
const foodGallery = document.getElementById('foodGallery');

// ดักจับเหตุการณ์เมื่อมีการคลิกที่ตัวกรอบรูปหน้า 2
if (foodGallery && galleryImg) {
  foodGallery.addEventListener('click', (e) => {
    e.stopPropagation(); // ป้องกันเอฟเฟกต์ไปกระทบส่วนอื่น
    
    // บวกลำดับรูปไปทีละ 1
    currentFoodIndex++;
    
    // ถ้าคลิกจนเลยรูปสุดท้าย ให้กลับมาเริ่มที่รูปแรก (Index 0)
    if (currentFoodIndex >= foodImages.length) {
      currentFoodIndex = 0;
    }
    
    // เปลี่ยนภาพต้นทาง
    galleryImg.src = foodImages[currentFoodIndex];
  });
}

envelope.addEventListener('click', (e) => {
  e.stopPropagation();
  introClickCount++;
  
  // สั่งให้เพลงเล่นตั้งแต่การคลิกครั้งแรกที่เปิดฝาซอง
  const music = document.getElementById('bgMusic');
  if (music) { music.play().catch(err => console.log("Audio play blocked")); }

  if (introClickCount === 1) {
    envelope.classList.add('open');
  } else if (introClickCount === 2) {
    introOverlay.classList.add('fade-out');
    mainContent.classList.add('visible');
  }
});