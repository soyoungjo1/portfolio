export interface VisualGalleryItem {
  thumb: string
  full: string
  title?: string
}

export interface VisualSection {
  title?: string
  mockups?: string[]
  items?: VisualGalleryItem[]
  bulkThumb?: string
  bulkImages?: string[]
  gifGrid?: { src: string; title: string }[]
}

export interface VisualProject {
  id: string
  title: string
  titleEn: string
  client: string
  year: string
  type: string
  tags: string[]
  description: string
  thumb: string
  sections?: VisualSection[]
}

export const visualProjects: VisualProject[] = [
  {
    id: 'recurit',
    title: '채용공고 상세페이지',
    titleEn: 'Recruit Detail Page',
    client: '아이스크림미디어',
    year: '2021',
    type: '상세페이지',
    tags: ['Photoshop', 'Illustrator'],
    description: '아이스크림미디어 채용공고 상세페이지 디자인. 직군별 특성을 살린 레이아웃.',
    thumb: 'visual_list1_recurit.jpg',
    sections: [
      {
        title: '개발직 채용 상세페이지',
        mockups: [
          'auto/recurit_developer_mockup1.jpg',
          'auto/recurit_developer_mockup2.png',
          'auto/recurit_developer_mockup3.jpg',
        ],
        items: [
          { thumb: 'auto/recurit_developer_mockup4.png', full: 'auto/recurit_developer_detail.jpg' },
        ],
      },
      {
        title: '팀별 채용 상세페이지',
        mockups: [
          'auto/recurit_team_mockup1.jpg',
          'auto/recurit_team_mockup2.png',
          'auto/recurit_team_mockup3.jpg',
        ],
        items: [
          { thumb: 'auto/recurit_team_mockup4.png', full: 'auto/recurit_team_detail.jpg' },
        ],
      },
    ],
  },
  {
    id: 'iscream_detail',
    title: '상품 상세페이지',
    titleEn: 'Product Detail Page',
    client: '아이스크림몰',
    year: '2021–22',
    type: '상세페이지',
    tags: ['Photoshop', 'Illustrator'],
    description: '교육상품의 느낌에 맞춰 상품만의 특징을 부각시킨 상세페이지 디자인.',
    thumb: 'visual_list2_iscream_detail.jpg',
    sections: [
      {
        mockups: [
          'auto/iscreamdetail_mockup1.jpg',
          'auto/iscreamdetail_mockup2.jpg',
          'auto/iscreamdetail_mockup3.jpg',
        ],
        items: Array.from({ length: 19 }, (_, i) => ({
          thumb: `auto/iscreamdetail_click${i + 1}.png`,
          full: `auto/iscreamdetail${i + 1}.jpg`,
        })),
      },
    ],
  },
  {
    id: 'iscream_experience',
    title: '체험단 페이지',
    titleEn: 'Experience Campaign',
    client: '아이스크림몰',
    year: '2021–22',
    type: '기획전',
    tags: ['Photoshop', 'Illustrator'],
    description: '아이스크림몰 체험단 모집 기획전 페이지.',
    thumb: 'visual_list3_iscream_experience.jpg',
    sections: [
      {
        mockups: [
          'auto/experience_mockup1.jpg',
          'auto/experience_mockup2.jpg',
          'auto/experience_mockup3.jpg',
        ],
        items: [
          ...Array.from({ length: 8 }, (_, i) => ({
            thumb: `auto/experience_click${i + 1}.png`,
            full: `auto/iscream_experience${i + 1}.jpg`,
          })),
          { thumb: 'auto/experience_click9.png', full: 'auto/iscream_experience9.gif' },
          ...Array.from({ length: 6 }, (_, i) => ({
            thumb: `auto/experience_click${i + 10}.png`,
            full: `auto/iscream_experience${i + 10}.jpg`,
          })),
        ],
      },
    ],
  },
  {
    id: 'iscream_planning',
    title: '기획전',
    titleEn: 'Planning Campaign',
    client: '아이스크림몰',
    year: '2021–22',
    type: '기획전',
    tags: ['Photoshop', 'Illustrator'],
    description: '시즌·테마별 기획전 페이지 디자인으로 클릭률 향상.',
    thumb: 'visual_list4_iscream_planning.jpg',
    sections: [
      {
        mockups: [
          'auto/exhibitions_mockup1.jpg',
          'auto/exhibitions_mockup2.jpg',
          'auto/exhibitions_mockup3.jpg',
        ],
        bulkThumb: 'auto/exhibitions_click1.png',
        bulkImages: [
          'auto/iscream_exhibitions1.gif', 'auto/iscream_exhibitions2.gif', 'auto/iscream_exhibitions3.jpg',
          'auto/iscream_exhibitions4.gif', 'auto/iscream_exhibitions5.gif', 'auto/iscream_exhibitions6.gif',
          'auto/iscream_exhibitions7.gif', 'auto/iscream_exhibitions8.gif', 'auto/iscream_exhibitions9.jpg',
          'auto/iscream_exhibitions10.gif', 'auto/iscream_exhibitions11.jpg', 'auto/iscream_exhibitions12.gif',
          'auto/iscream_exhibitions13.gif', 'auto/iscream_exhibitions14.gif', 'auto/iscream_exhibitions15.jpg',
          'auto/iscream_exhibitions16.jpg', 'auto/iscream_exhibitions17.jpg', 'auto/iscream_exhibitions18.jpg',
          'auto/iscream_exhibitions19.jpg', 'auto/iscream_exhibitions20.jpg', 'auto/iscream_exhibitions21.gif',
          'auto/iscream_exhibitions22.jpg', 'auto/iscream_exhibitions23.jpg', 'auto/iscream_exhibitions24.jpg',
          'auto/iscream_exhibitions25.png', 'auto/iscream_exhibitions26.gif', 'auto/iscream_exhibitions27.gif',
          'auto/iscream_exhibitions28.jpg', 'auto/iscream_exhibitions29.jpg', 'auto/iscream_exhibitions30.gif',
          'auto/iscream_exhibitions31.gif', 'auto/iscream_exhibitions32.jpg', 'auto/iscream_exhibitions33.jpg',
          'auto/iscream_exhibitions34.jpg', 'auto/iscream_exhibitions35.jpg', 'auto/iscream_exhibitions36.jpg',
          'auto/iscream_exhibitions37.jpg', 'auto/iscream_exhibitions38.gif', 'auto/iscream_exhibitions39.jpg',
          'auto/iscream_exhibitions40.jpg', 'auto/iscream_exhibitions41.jpg', 'auto/iscream_exhibitions42.jpg',
          'auto/iscream_exhibitions43.jpg', 'auto/iscream_exhibitions44.jpg', 'auto/iscream_exhibitions45.jpg',
          'auto/iscream_exhibitions46.jpg', 'auto/iscream_exhibitions47.jpg', 'auto/iscream_exhibitions48.jpg',
          'auto/iscream_exhibitions49.jpg', 'auto/iscream_exhibitions50.jpg',
        ],
      },
    ],
  },
  {
    id: 'histore',
    title: '기획전 + 상세페이지',
    titleEn: 'Histore Campaign',
    client: '쌤마켓 · 하이스토어',
    year: '2022',
    type: '기획전 · 상세페이지',
    tags: ['Photoshop', 'Illustrator'],
    description: '쌤마켓·하이스토어 기획전 및 상품 상세페이지 디자인.',
    thumb: 'visual_list5_histore.jpg',
    sections: [
      {
        title: '기획전',
        mockups: [
          'auto/samm_histore_mockup1.jpg',
          'auto/samm_histore_mockup2.jpg',
          'auto/samm_histore_mockup3.jpg',
          'auto/samm_histore_mockup4.jpg',
        ],
        bulkThumb: 'auto/samm_histore_click1.png',
        bulkImages: [
          'auto/samm_histore1.jpg', 'auto/samm_histore2.jpg', 'auto/samm_histore3.jpg',
          'auto/samm_histore4.jpg', 'auto/samm_histore5.jpg', 'auto/samm_histore6.jpg',
          'auto/samm_histore7.jpg', 'auto/samm_histore8.jpg', 'auto/samm_histore9.jpg',
          'auto/samm_histore10.gif', 'auto/samm_histore11.jpg', 'auto/samm_histore12.jpg',
          'auto/samm_histore13.jpg', 'auto/samm_histore14.jpg', 'auto/samm_histore15.jpg',
          'auto/samm_histore16.jpg', 'auto/samm_histore17.jpg', 'auto/samm_histore18.jpg',
          'auto/samm_histore19.jpg', 'auto/samm_histore20.jpg', 'auto/samm_histore21.jpg',
          'auto/samm_histore22.jpg', 'auto/samm_histore23.jpg', 'auto/samm_histore24.jpg',
          'auto/samm_histore25.jpg', 'auto/samm_histore26.jpg', 'auto/samm_histore27.jpg',
          'auto/samm_histore28.jpg', 'auto/samm_histore29.jpg', 'auto/samm_histore30.jpg',
          'auto/samm_histore31.jpg', 'auto/samm_histore32.jpg', 'auto/samm_histore33.jpg',
          'auto/samm_histore34.jpg', 'auto/samm_histore35.jpg', 'auto/samm_histore36.jpg',
          'auto/samm_histore37.jpg', 'auto/samm_histore38.jpg', 'auto/samm_histore39.jpg',
          'auto/samm_histore40.jpg',
        ],
      },
      {
        title: '상세페이지',
        items: Array.from({ length: 10 }, (_, i) => ({
          thumb: `auto/samm_histore_detail_click${i + 1}.png`,
          full: `auto/samm_histore_detail${i + 1}.jpg`,
        })),
      },
    ],
  },
  {
    id: 'iscream_popup',
    title: '팝업 디자인',
    titleEn: 'Popup Design',
    client: '아이스크림몰',
    year: '2021–23',
    type: '팝업',
    tags: ['Photoshop', 'Illustrator'],
    description: '아이스크림몰 각종 팝업 디자인. 시즌별 이벤트 및 공지 팝업.',
    thumb: 'visual_list6_iscream_popup.jpg',
    sections: [
      {
        mockups: [
          'auto/iscreampopup_mockup1.jpg',
          'auto/iscreampopup_mockup2.jpg',
        ],
        bulkThumb: 'auto/iscreampopup_click1.png',
        bulkImages: [
          'auto/iscreampopup1.gif', 'auto/iscreampopup2.gif', 'auto/iscreampopup3.gif',
          'auto/iscreampopup4.gif', 'auto/iscreampopup5.gif', 'auto/iscreampopup6.jpg',
          'auto/iscreampopup7.png', 'auto/iscreampopup8.jpg', 'auto/iscreampopup9.jpg',
          'auto/iscreampopup10.jpg', 'auto/iscreampopup11.jpg', 'auto/iscreampopup12.jpg',
          'auto/iscreampopup13.jpg',
        ],
      },
    ],
  },
  {
    id: 'iscream_logo',
    title: '브랜드 로고 GIF',
    titleEn: 'Brand Logo GIF',
    client: '아이스크림',
    year: '2021–23',
    type: '모션 그래픽',
    tags: ['After Effects', 'Illustrator'],
    description: '아이스크림 브랜드 로고 GIF 애니메이션 제작.',
    thumb: 'visual_list7_iscream_logo.jpg',
    sections: [
      {
        mockups: [
          'auto/iscreamlogo_mockup1.jpg',
          'auto/iscreamlogo_mockup2.jpg',
        ],
        gifGrid: [
          { src: 'auto/iscreamlogo1.gif', title: 'Logo 01' },
          { src: 'auto/iscreamlogo2.gif', title: 'Logo 02' },
          { src: 'auto/iscreamlogo3.gif', title: 'Logo 03' },
          { src: 'auto/iscreamlogo4.gif', title: 'Logo 04' },
          { src: 'auto/iscreamlogo5.gif', title: 'Logo 05' },
          { src: 'auto/iscreamlogo6.gif', title: 'Logo 06' },
          { src: 'auto/iscreamlogo7.gif', title: 'Logo 07' },
          { src: 'auto/iscreamlogo8.gif', title: 'Logo 08' },
        ],
      },
    ],
  },
  {
    id: 'truck',
    title: '푸드트럭 로고 + 배너',
    titleEn: 'Food Truck Branding',
    client: '푸드트럭',
    year: '2020',
    type: '브랜딩',
    tags: ['Photoshop', 'Illustrator'],
    description: '푸드트럭 브랜드 로고 및 배너 디자인.',
    thumb: 'visual_list8_truck.jpg',
    sections: [
      {
        mockups: [
          'auto/dolbal_mockup2.png',
          'auto/dolbal_mockup3.jpg',
          'auto/dolbal_mockup4.jpg',
        ],
        items: [
          { thumb: 'auto/dolbal_click1.jpg', full: 'auto/dolbal1.jpg' },
        ],
      },
    ],
  },
  {
    id: 'namecard',
    title: '로고 + 명함 디자인',
    titleEn: 'Logo & Name Card',
    client: '태성티에스 · 쌀마니',
    year: '2019',
    type: '브랜딩',
    tags: ['Photoshop', 'Illustrator'],
    description: '로고 디자인 및 명함 제작.',
    thumb: 'visual_list9_namecard.jpg',
    sections: [
      {
        mockups: [
          'auto/namecard_mockup1.jpg',
          'auto/namecard_mockup2.png',
          'auto/namecard_mockup3.jpg',
        ],
      },
    ],
  },
  {
    id: 'forme',
    title: '포미주스 브랜드',
    titleEn: 'Forme Juice Brand',
    client: '포미주스',
    year: '2022',
    type: '브랜딩',
    tags: ['Photoshop', 'Illustrator'],
    description: '포미주스 브랜드 아이덴티티 및 패키지 디자인.',
    thumb: 'visual_list11_formejuice.jpg',
    sections: [
      {
        mockups: [
          'auto/forme_mockup1.jpg',
          'auto/forme_mockup2.png',
          'auto/forme_mockup3.jpg',
          'auto/forme_mockup4.jpg',
          'auto/forme_mockup5.jpg',
          'auto/forme_mockup6.jpg',
        ],
        items: Array.from({ length: 13 }, (_, i) => ({
          thumb: `auto/forme_click${i + 1}.png`,
          full: `auto/forme${i + 1}.jpg`,
        })),
      },
    ],
  },
]
