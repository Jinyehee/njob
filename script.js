// DOM 요소들
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('section, footer');
const posterImages = document.querySelectorAll('.poster-image');
const posterModal = document.getElementById('posterModal');
const closeModal = document.querySelector('.close');

// Course tabs
const courseTabs = document.querySelectorAll('.course-tab');
const courseDetails = document.querySelectorAll('.course-detail');

// 스크롤 감지 및 탭 활성화
function updateActiveTab() {
    const scrollPosition = window.scrollY + 100; // 약간의 오프셋

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.id;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // 현재 섹션에 해당하는 탭 활성화
            navTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('href') === `#${sectionId}`) {
                    tab.classList.add('active');
                }
            });
        }
    });
}

// Course tab switching
function switchCourseTab(courseId) {
    console.log('Switching to course:', courseId); // 디버깅용
    
    // 모든 탭 비활성화
    courseTabs.forEach(tab => tab.classList.remove('active'));
    courseDetails.forEach(detail => detail.classList.remove('active'));
    
    // 선택된 탭과 상세정보 활성화 (과정 탭만 찾기)
    const selectedTab = document.querySelector(`.course-tab[data-course="${courseId}"]`);
    const selectedDetail = document.getElementById(courseId);
    
    console.log('Selected tab:', selectedTab); // 디버깅용
    console.log('Selected detail:', selectedDetail); // 디버깅용
    
    if (selectedTab && selectedDetail) {
        selectedTab.classList.add('active');
        selectedDetail.classList.add('active');
        console.log('Tab switched successfully!'); // 디버깅용
    }
}

// 포스터 모달 열기
function openPosterModal(imageSrc, altText) {
    // 모달 이미지 소스 변경
    const modalImage = posterModal.querySelector('.modal-image');
    modalImage.src = imageSrc;
    modalImage.alt = altText;
    
    posterModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 포스터 모달 닫기
function closePosterModal() {
    posterModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // 스크롤 복원
}

// 이벤트 리스너들
window.addEventListener('scroll', updateActiveTab);

// Course tab click events
courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const courseId = tab.getAttribute('data-course');
        console.log('Tab clicked:', courseId); // 디버깅용
        switchCourseTab(courseId);
    });
});

// 포스터 섹션의 이미지들 클릭 시 모달 열기
posterImages.forEach(image => {
    image.addEventListener('click', () => {
        openPosterModal(image.src, image.alt);
    });
});

// X 버튼 클릭 시 모달 닫기
closeModal.addEventListener('click', closePosterModal);

// 모달 배경 클릭 시 모달 닫기
posterModal.addEventListener('click', (e) => {
    if (e.target === posterModal) {
        closePosterModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && posterModal.classList.contains('show')) {
        closePosterModal();
    }
});

// 페이지 로드 시 첫 번째 탭 활성화
document.addEventListener('DOMContentLoaded', () => {
    updateActiveTab();
    console.log('Page loaded, course tabs:', courseTabs.length); // 디버깅용
    console.log('Course details:', courseDetails.length); // 디버깅용
    // 첫 번째 과정 탭이 기본으로 활성화되어 있음
});

