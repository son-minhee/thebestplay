/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Ticket, 
  Info, 
  ArrowRight, 
  Play, 
  Instagram, 
  Home, 
  Drama, 
  Archive, 
  User, 
  Twitter, 
  Facebook, 
  X, 
  Calendar, 
  MapPin, 
  Check, 
  Sparkles, 
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types for Play information
interface PlayItem {
  id: string;
  title: string;
  period: string;
  venue: string;
  image: string;
  badge: 'COMING SOON' | 'NOW';
  badgeColor: string;
  synopsis: string;
  cast: string[];
  bannerDesc?: string;
  directors?: string;
}

interface ArchiveItem {
  id: string;
  title: string;
  period: string;
  image: string;
  description: string;
  cast: string[];
}

interface FeedItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function App() {
  // Main Navigation / Tab State
  const [activeTab, setActiveTab] = useState<'home' | 'plays' | 'tickets' | 'archive' | 'my'>('home');

  // Interactive UI States
  const [selectedPlay, setSelectedPlay] = useState<PlayItem | null>(null);
  const [bookingPlay, setBookingPlay] = useState<PlayItem | null>(null);
  const [selectedArchive, setSelectedArchive] = useState<ArchiveItem | null>(null);

  // Booking process states
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1); // 1: Info & Date, 2: Select Seats & Tix, 3: Completed
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketConfirmedCode, setTicketConfirmedCode] = useState<string>('');
  
  // Interactive Custom Calendar and Seat Select warning states
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarMonth, setCalendarMonth] = useState<number>(6);
  const [seatWarning, setSeatWarning] = useState<string>('');

  // Accordion lists states
  const [expandedNews, setExpandedNews] = useState<number | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  // Search overlay state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile side menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock Play Data
  const playsData: PlayItem[] = [
    {
      id: 'nature_of_forgetting',
      title: '네이처 오브 포겟팅 (The Nature of Forgetting)',
      period: '2026.09 (예정)',
      venue: '세종문화회관 S씨어터',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtsM1cVKLOD27O7CoumpGneFb2dA9yWQLiuNQwLE5oC3cpMwIgyrufhRVbsAYc7UZ6tFQNcM_H4L902n8j7GKOWbhAp2sIFUED61zIRHc6YECHCY33AvMV8GQiA8xmtW40n1Tf5RA8Z-wJmCTXzFxdACagzUbzWBK7ch9PbPJS5yIZ7fVPku6wfuHPkx6USZ3wIolEy2YOeJHsAhrOxjoG0pbtdNh6RDwm98cKK05Ky-ekB2GfozKBfVRI=s0',
      badge: 'COMING SOON',
      badgeColor: 'bg-brand-orange',
      bannerDesc: '세종문화회관 S씨어터에서 만나는 감동적인 무대. 기억의 조각을 맞추는 특별한 여정.',
      synopsis: '영국 피지컬 시어터 극단 "Theatre Re"의 대표작이자, 전 세계 평단을 사로잡은 수작. 치매에 걸려 기억을 점차 잃어가는 55세 남성 톰의 머릿속에서 일어나는 눈부신 생의 찬가와 애틋한 순간들을 대사 없는 역동적인 아크로바틱 신체 연기와 피아노 라이브 독주로 그려냅니다.',
      cast: ['기욤 피지 (Guillaume Pigé)', '셀린 뒤프레 (Céline Dupuis)', '알렉스 필모어 (Alex Filmore)'],
      directors: '기욤 피지 (Guillaume Pigé)'
    },
    {
      id: 'mouthpiece',
      title: '마우스피스 (Mouthpiece)',
      period: '2026.4.4 - 6.21',
      venue: '예스24아트원 2관',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGVAoOBE-mAvQRkaoRoHfaRAicH_sKh_TXdLpnctgjqXaZoul2JmXe6r6yr0j7jgHfQX-L2wuj7tQJuSmtFrq_6G9GB7Pq7bHSD3g8WMVQJ3hd7dOvzncd47TYTdIZ7nrnTXcguIaC4f_UE0ads41XAo1T3cE6vdwEuv5RU9d5qN4y6XkGVZ00XG556_x-4Tu2-XN18zhhF6rUh9NELFrf3GXglmVz3z4dfcznha34rUSwCtINIHYCTQ3u7yP32AOu7X8yejnEB9L-vQ',
      badge: 'NOW',
      badgeColor: 'bg-brand-orange',
      synopsis: '슬럼프에 빠진 중년의 작가 리비와 그림 재능이 있지만 현실에 짓눌려 방황하는 17세 소년 데클란. 두 사람의 운명적인 조우를 통해 예술이 타인의 고통을 다루는 방식, 창작과 재현의 윤리적 딜레마에 대해 숨 막히도록 날카롭고 격렬한 물음을 던집니다.',
      cast: ['김여진', '유송이', '이휘종', '홍우진'],
      directors: '부새롬'
    },
    {
      id: 'lungs',
      title: '렁스 (Lungs)',
      period: '2026.05.23 - 08.02',
      venue: '충무아트센터 중극장 블랙',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdAtNBoT4ZmfnuDrDHH9kws-XzHaC0eiYFCJoB6PwXaT8TlMIEpSQS1_juV1rWVRJJ7LpeeugRXBRRs3geI6SF1vRZyIq1RompHAwMu7t2NDMec5M3S9kNjKP6pIv3nhBueoeCH45tNB_XLWiLSzvBBHfx_g720xC_QDiOo_YzzLCsY3j3lkjtbUaCW6ANUwj6q-lEydCRHefTNhxVyuOpzpjnQWKGmykIddZ6cSGRdvbRrkscguEi38LOGy4eUiFqAApjV3utS_cRAA',
      badge: 'NOW',
      badgeColor: 'bg-brand-orange',
      synopsis: '기후 위기, 환경 오염과 인구 포화 속에서 "과연 우리는 지구에 또 하나의 인간을 보태는 것이 좋은 일인가?" 라는 질문을 매개로 삼은 2인극. 배경음악이나 무대 장치, 의상 변화 없이 오직 두 배우의 거침없는 밀도 높은 롱테이크 독백과 대화로 일생의 모든 사랑과 슬픔을 압축하여 펼쳐 보입니다.',
      cast: ['성두섭', '이동하', '이진희', '정준우'],
      directors: '박소영'
    }
  ];

  // Mock Archive Data
  const archiveData: ArchiveItem[] = [
    {
      id: 'archive_10',
      title: '연극열전10',
      period: '2024.3 - 2026.11',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLvWnMhuvSySrWO7Bfufua3rudk82dKhE8cADNQ0Zgb83oEB9k85I1KLcVeTGFAiD3PZnkkKygV8dHC4nZ-y2PPLz-OS_Y5c-sc_zLchtmnKkDSp7ovPARj2zeIUNBwuOX_HHV45-oGw1ddmIeoVWRT8SrgDVSdWt_EquMLtanchDjgWpixNeJWm96pVjgCRDK4kRGFk03hvKpA0j6eaXzzwifhWRahWvawyOobgTk039zapQvV8Dr01zA',
      description: '연극열전 극단의 열 번째 명작 퍼레이드 시즌. "엠.버터플라이", "렁스", "마우스피스", "웃음의 대학" 등 한층 깊어진 예술적 완성도와 대중성을 겸비한 웰메이드 정기 라인업을 선보이며 관객들의 압도적인 찬사를 받았습니다.',
      cast: ['모든 참여 연출 및 출연 배우 일동']
    },
    {
      id: 'archive_9',
      title: '연극열전9',
      period: '2022.4 - 2023.2',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLt8y6GWCGz8-aoE0GlxP5eHPZ9Sy15TCE1Q_FGVkwwOkeq2Mry-N5fVONPGaXLICqWPCktG059uDEOVqys6R5uT_DOq5L3MmFY-bkqpkzh9IegYoBlqbr10_Yzta-ZHmMPw7jXv9EVmMP9ipoxtETwAr-F6Dx07xnLjhhKQZi3wYrZpkqcRY-Upd7ZgvWTjEfZ0Chob3-wrrRkJLPIr6UTi15M7VqSTgIUwLPm4Uj8r47a5zOYs7qYv7Co',
      description: '아홉 번째로 마주한 연극열전의 아름다운 라인업. 연극 "보이지 않는 손" 한국 초연을 포함하여 현대 사회의 여러 이면과 자본을 통렬히 풍자하고 삶과 죽음, 그리고 관계에 관한 독특한 희비극을 전달하였습니다.',
      cast: ['이강우', '황상민', '곽시형', '김진아']
    },
    {
      id: 'archive_8',
      title: '연극열전8',
      period: '2020.5 - 2021.2',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtHwU-VNuHodbP_rcgDREfZP4Afoy891OU8-xS0YhuL5luV_R_oX7DYFKZZkgdpEfw8ftN5I6m_emZ3vXJkeU3BCg1LzXVB5oz1X3UnhaCx3vO8Na9Zx4Bxzzs4XOa8X7ZqO9jP2rB3PeFzBbVuCbfX3BxQ-vWPwVBYT3mCa1xRQw0X69Zg4uob72nH3I9YcXqvASeFt-ueH8OVO9m2LJLGRYiuesB-ezqnlyKjtl17w9i48nn16jSRg-Y',
      description: '어려운 시기 힘을 보태어준 깊은 감동의 시즌. "렁스" 국내 역사적인 초연, 연극 "아들" 등의 심리 드라마를 세밀하게 직진하며 관객들에게 정서적인 유대감과 위로, 사색을 전하는 소중한 발자취가 되었습니다.',
      cast: ['김석우', '민나래', '오정헌', '서지현']
    },
    {
      id: 'archive_7',
      title: '연극열전7',
      period: '2018.4 - 2019.2',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLs7SZzEJ_cJGqEMgr2e__zmFAQEUmojMAp0MP71nrqLwcocn4AiSnrsFsl2KwyTrd6m84IYc2T_2ThOo9K8hjmL7mqLEZSkcctrU8EhXpml5dCIzZjMQc7UDHifjz4bAozm9zMMmJFKN_3ykM7X13VBa9IOsdK2Zx7yzIh3a04N5O7oGYbP3UrMp8n1OV0DPGDWlk8iAjdjZWItldJzaCqoAZJPSSEDH5TvzvackjiB8xgKYljYXVssNYY',
      description: '연극열전 일곱 번째 정기 컬렉션. 사회 부조리의 고발과 인간 내면의 솔직한 감정들을 심층적으로 투영해낸 "킬롤로지", "신인류의 백분토론" 등 지적이면서도 격정적인 작품들로 뜨겁게 소통한 시즌입니다.',
      cast: ['최정원', '강민호', '이지영', '박연우']
    }
  ];

  // News Accordion Data
  const newsData: FeedItem[] = [
    {
      id: 1,
      title: '[공지] 연극열전10 대단원의 막! 차기작 준비 소식 및 관객 특별 혜택 안내',
      date: '2026.06.01',
      content: '연극열전 10번째 시즌에 끝없는 사랑을 보내주셔서 진심으로 감사드립니다. 보내주신 성원에 힘입어 다가오는 9월 세종문화회관 S씨어터에서 공연되는 초청 내한 특별작 《네이처 오브 포겟팅》을 야심차게 준비하고 있으니 많은 관심과 티켓팅 참여를 부탁드립니다.'
    },
    {
      id: 2,
      title: "[안내] '마우스피스' 스페셜 관객과의 대화(GV) 행사 일정 안내 및 참가 신청",
      date: '2026.05.20',
      content: '예스24아트원 2관에서 절찬 상영 중인 연극 《마우스피스》의 GV 인터뷰가 마련되었습니다. 6월 10일 저녁 8시 공연 종료 후, 부새롬 연출과 주연 배우들이 함께하여 무대 비하인드 스토리, 캐릭터 분석 등 깊이 있는 질의응답 시간을 가질 예정입니다.'
    },
    {
      id: 3,
      title: '[할인] 연극열전 특별 연간 유료회원권 "열레인저 4기" 선착순 온라인 모집 오픈',
      date: '2026.05.12',
      content: '혜택 가득한 연극열전 마니아 회원권 《열레인저 4기》 가입이 시작됩니다! 가입비 30,000원으로 전 시즌 티켓 상시 40% 단독 할인, 프로필 프로그램 북 무료 증정, 일반 선예매 권한 부여 등 오직 마니아들을 위한 풍성한 서포트 특전을 누려보세요.'
    }
  ];

  // Event Accordion Data
  const eventData: FeedItem[] = [
    {
      id: 1,
      title: '[이벤트] 《렁스》 한여름 에코 리사이클 릴레이 - 관람 당일 친환경 텀블러 소지자 쿠폰 증정',
      date: '2026.05.25',
      content: '연극 《렁스》의 주제인 지속 가능한 지구 수호에 동참해 주세요! 일회용 컵 대신 친환경 다회용 텀블러를 지참하고 충무아트센터 중극장 로비를 방문하시는 관객 전원에게, 극장 앞 카페 음료 1,000원 할인권과 렁스 한정 핀버튼을 선물로 드립니다.'
    },
    {
      id: 2,
      title: '[스페셜] 6월 문화가 있는 날 맞이 《마우스피스》 45% 특별 타임세일',
      date: '2026.05.18',
      content: '6월 마지막 주 "문화가 있는 날" 주간을 맞이하여, 당일 예매 및 잔여석 선착순 특전으로 VIP석 기준 45%의 놀라운 혜택을 선사합니다. 기회를 놓쳐 미처 관람하지 못했던 회차가 있다면 이번 패스를 통해 합리적으로 전석을 예약하세요.'
    },
    {
      id: 3,
      title: '[콜라보] SNS 관람 인증 해시태그 참여 시, 배우 친필 사인이 담긴 리미티드 대본집 선물',
      date: '2026.05.08',
      content: '당신의 솔직하고 깊이 있는 소감을 널리 알려주세요! 필수 해시태그 #렁스 #마우스피스 #연극열전 과 함께 인스타그램에 본인 티켓 실물 이미지와 영수증, 멋진 후기를 공유해주시는 분들 중 20명을 추첨하여 전 출연진 친필 사인이 새겨진 한정판 희곡 대본집을 보내드립니다.'
    }
  ];

  // Review Accordion Data
  const reviewData: FeedItem[] = [
    {
      id: 1,
      title: '"소리 없는 아우성과 피아노가 전하는 인생의 웅장한 선율" - 이은혜 관객',
      date: '2026.05.28',
      content: '기억을 잃어가며 조각난 옷장에서 아내와의 첫 만남, 딸의 탄생 옷을 필死적으로 꺼내는 톰의 몸짓과, 무대 뒤에서 쉴 새 없이 몰아치는 격정적인 피아노의 엇박자 라이브 독주가 심장 박동을 두드리는 듯했습니다. 9월 내한이 너무나도 기다려집니다.'
    },
    {
      id: 2,
      title: '"예술에 담긴 타인의 가난과 고통, 그것을 재현할 윤리적 경계" - 박태인 평론가',
      date: '2026.05.15',
      content: '연극 《마우스피스》는 관람하는 이에게 엄청난 감정적 서스펜스와 모순적 도덕심을 부과한다. 데클란의 눈물을 원고지 위 글자로 정제해 갈 때마다 무대 가득 퍼지는 소름 돋는 침묵은 최근 대학로 극장가 역사상 가장 강렬한 마침표를 찍는다.'
    },
    {
      id: 3,
      title: '"아무 장치 없는 빈 무대 위에 오직 쉼 없는 대사로 지어 올린 찬란한 두 인생" - 최용우 관객',
      date: '2026.05.02',
      content: '음악도 없고 조명 전환도 하나 없이 컵 단 하나를 들고서 지구 온난화, 결혼, 부모로서의 결격 사유를 속사포처럼 쏟아내는 두 남녀의 110분에 빨려 들어갔습니다. 대사만으로 평생의 연대기를 일순간 펼치고 닫는 명작입니다.'
    }
  ];

  // Simple Booking Simulation handler
  const handleOpenBooking = (play: PlayItem) => {
    setBookingPlay(play);
    setBookingStep(1);
    
    // Set appropriate calendar month/year based on production period
    if (play.id === 'nature_of_forgetting') {
      setCalendarYear(2026);
      setCalendarMonth(9);
      setBookingDate('2026-09-12');
    } else if (play.id === 'mouthpiece') {
      setCalendarYear(2026);
      setCalendarMonth(6);
      setBookingDate('2026-06-15');
    } else { // lungs
      setCalendarYear(2026);
      setCalendarMonth(6);
      setBookingDate('2026-06-16');
    }
    
    setBookingTime('15:00');
    setTicketCount(1);
    setSelectedSeats([]); // Start clean without pre-selected seats
    setSeatWarning('');
  };

  const handleNextBookingStep = () => {
    if (bookingStep === 1) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      // Confirmed ticket
      const randomCode = 'BP' + Math.floor(Math.random() * 900000 + 100000);
      setTicketConfirmedCode(randomCode);
      setBookingStep(3);
    }
  };

  const isSoldOut = (row: string, colNum: number) => {
    // Elegant static layout of already sold-out seats
    const soldOutList = [
      'A-1', 'A-2', 'A-9', 'A-10',
      'B-5', 'B-6',
      'C-3', 'C-4', 'C-7', 'C-8',
      'D-1', 'D-10', 'E-5', 'E-6'
    ];
    return soldOutList.includes(`${row}-${colNum}`);
  };

  const handleSeatClick = (row: string, colNum: number) => {
    const seatName = `${row}열 ${colNum}번`;
    setSeatWarning('');
    
    if (selectedSeats.includes(seatName)) {
      // Toggle off
      const updated = selectedSeats.filter(s => s !== seatName);
      setSelectedSeats(updated);
      setTicketCount(updated.length > 0 ? updated.length : 1);
    } else {
      // Toggle on
      if (selectedSeats.length >= 4) {
        setSeatWarning('※ 예매 매수는 1인 최대 4매까지 제한되어 다른 좌석을 선택할 수 없습니다.');
        return;
      }
      const updated = [...selectedSeats, seatName];
      setSelectedSeats(updated);
      setTicketCount(updated.length);
    }
  };

  const currentPlay = playsData[0]; // Hero Banner Play (Nature of Forgetting)

  return (
    <div className="bg-surface-custom text-on-surface-custom font-sans min-h-screen pb-24 antialiased">
      {/* Search Overlay Portal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-deep-charcoal/95 z-[100] backdrop-blur-md flex flex-col justify-start p-6"
          >
            <div className="w-full max-w-xl mx-auto flex items-center justify-between border-b border-white/20 pb-4 mt-8">
              <input
                id="search-input"
                type="text"
                placeholder="검색어를 입력해 주세요 (예: 렁스, 마우스피스)"
                className="bg-transparent text-white text-lg w-full focus:outline-none placeholder-white/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                id="close-search-btn"
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="text-white hover:text-brand-orange transition-colors ml-4"
              >
                <X size={24} />
              </button>
            </div>

            <div className="w-full max-w-xl mx-auto mt-8 text-white/70">
              <span className="font-mono text-xs text-white/45 tracking-wider uppercase block mb-4">SEARCH RESULTS</span>
              {searchQuery ? (
                <div className="flex flex-col gap-4">
                  {playsData.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.venue.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                    <div 
                      key={p.id}
                      onClick={() => { setSelectedPlay(p); setSearchOpen(false); }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-brand-orange/60 transition-colors cursor-pointer flex gap-4 items-center"
                    >
                      <img src={p.image} referrerPolicy="no-referrer" alt="" className="w-12 h-16 object-cover rounded" />
                      <div>
                        <h4 className="font-semibold text-white text-base">{p.title}</h4>
                        <p className="text-xs text-white/50">{p.period} @ {p.venue}</p>
                      </div>
                    </div>
                  ))}
                  {playsData.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="text-sm italic text-white/45 pt-4">일치하는 공연 정보가 없습니다.</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-sm mb-2 text-white/40">추천 검색어</p>
                  <div className="flex flex-wrap gap-2">
                    {['렁스', '마우스피스', '네이처 오브 포겟팅', '예스24', 'S씨어터'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-white hover:bg-brand-orange hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-[90]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[95] shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold font-headline">연열</div>
                    <span className="font-headline font-bold text-brand-primary text-lg">연극열전</span>
                  </div>
                  <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setActiveTab('home'); setMenuOpen(false); }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left font-semibold ${activeTab === 'home' ? 'bg-brand-orange/10 text-brand-orange' : 'text-on-surface-variant-custom hover:bg-gray-50'}`}
                  >
                    <Home size={18} />
                    <span>홈 화면</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('plays'); setMenuOpen(false); }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left font-semibold ${activeTab === 'plays' ? 'bg-brand-orange/10 text-brand-orange' : 'text-on-surface-variant-custom hover:bg-gray-50'}`}
                  >
                    <Drama size={18} />
                    <span>현재 상영작 (Now Playing)</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('archive'); setMenuOpen(false); }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left font-semibold ${activeTab === 'archive' ? 'bg-brand-orange/10 text-brand-orange' : 'text-on-surface-variant-custom hover:bg-gray-50'}`}
                  >
                    <Archive size={18} />
                    <span>공연 아카이브</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('my'); setMenuOpen(false); }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left font-semibold ${activeTab === 'my' ? 'bg-brand-orange/10 text-brand-orange' : 'text-on-surface-variant-custom hover:bg-gray-50'}`}
                  >
                    <User size={18} />
                    <span>나의 예매내역</span>
                  </button>
                </nav>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-gray-50 rounded-full hover:text-brand-orange"><Twitter size={18} /></a>
                  <a href="#" className="p-2 bg-gray-50 rounded-full hover:text-brand-orange"><Facebook size={18} /></a>
                </div>
                <p className="text-xs text-gray-400">© 2026 THE BEST PLAY. ALL RIGHTS RESERVED.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TopAppBar Container */}
      <header className="bg-surface-lowest/80 backdrop-blur-xl docked full-width top-0 z-50 fixed left-0 w-full px-4 h-16 flex items-center justify-between border-b border-outline-variant-custom/10">
        <div className="flex items-center gap-4">
          <button 
            id="menu-toggle-btn"
            onClick={() => setMenuOpen(true)}
            className="text-brand-primary p-2 hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Main centered Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="font-headline text-headline-md font-bold tracking-tighter text-brand-primary cursor-pointer absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida/AP1WRLsIxcPjlhlkDlWoWj7hLx0HnEG61nTmeL7zeBE9PbXemt3D9x6V8otaTIU46gbRR4Tx7f5_suzPlkQ__HBG2FpYcXmPAtBXbyDhNHTW35QMr1O2f1_h8rWzznzSeiFjTra3lAYvtalxyeKO7LRuRorrYkxL_v4aGdWpT3i4lO7SUtP_GDptuGlSVQEOKK8YRD0bxyyxdfHO2LSq8u0CVQVSMXX9P09-T1hePqGn-X-fClzaKPgpIlmrpok" 
            alt="Best Play Logo" 
            referrerPolicy="no-referrer"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            id="search-open-btn"
            onClick={() => setSearchOpen(true)}
            className="text-brand-primary p-2 hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <Search size={24} />
          </button>
        </div>
      </header>

      {/* Main Container spacing for header */}
      <main className="pt-16">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            {currentPlay.id === 'nature_of_forgetting' ? (
              <section className="relative w-full h-[55vh] md:h-[75vh] bg-[#FAF6ED] overflow-hidden flex flex-col justify-end">
                <img 
                  alt="네이처 오브 포겟팅 배너" 
                  className="absolute inset-x-0 top-0 w-full h-full object-contain object-center z-0" 
                  src={currentPlay.image}
                  referrerPolicy="no-referrer"
                />
                
                {/* Clean, elegant floating action container */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-12 pb-6 md:pb-8 flex justify-end">
                  <div className="flex gap-3 bg-stone-900/10 backdrop-blur-md p-2 rounded-xl border border-stone-950/5 w-full md:w-auto md:shadow-lg shadow-stone-950/5">
                    <button 
                      onClick={() => handleOpenBooking(currentPlay)}
                      className="flex-1 md:flex-none bg-brand-primary text-white hover:bg-brand-primary/95 px-6 py-2.5 rounded-lg font-sans text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-primary/20"
                    >
                      <span>예매하기</span>
                      <Ticket size={16} />
                    </button>
                    <button 
                      onClick={() => setSelectedPlay(currentPlay)}
                      className="flex-1 md:flex-none bg-white/70 hover:bg-white text-stone-900 px-6 py-2.5 rounded-lg font-sans text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-stone-300"
                    >
                      <span>상세보기</span>
                      <Info size={16} />
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex flex-col justify-end p-4 md:p-12 pb-8">
                <img 
                  alt="히어로 배너" 
                  className="absolute inset-0 w-full h-full object-cover z-0" 
                  src={currentPlay.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-deep-charcoal/40 to-transparent z-10" />
                
                <div className="relative z-20 text-white flex flex-col items-start gap-4 max-w-7xl mx-auto w-full">
                  <span className="inline-block px-3 py-1 bg-brand-orange font-mono text-[12px] text-white rounded-full uppercase tracking-wider font-semibold">
                    {currentPlay.badge}
                  </span>
                  
                  <h1 className="font-headline text-3xl md:text-5xl text-white font-extrabold leading-tight drop-shadow-md">
                    {currentPlay.title.split(' (')[0]}
                  </h1>
                  
                  <p className="font-sans text-sm md:text-base text-[#ffe2da] max-w-xl drop-shadow leading-relaxed">
                    {currentPlay.bannerDesc || currentPlay.synopsis}
                  </p>
                  
                  <div className="flex gap-4 mt-4 w-full md:w-auto">
                    <button 
                      onClick={() => handleOpenBooking(currentPlay)}
                      className="flex-1 md:flex-none bg-brand-primary text-white px-6 py-3 rounded-lg font-sans text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-primary/20"
                    >
                      <span>예매하기</span>
                      <Ticket size={16} />
                    </button>
                    <button 
                      onClick={() => setSelectedPlay(currentPlay)}
                      className="flex-1 md:flex-none border border-white text-white px-6 py-3 rounded-lg font-sans text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
                    >
                      <span>상세보기</span>
                      <Info size={16} />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* NOW PLAYING Section */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
              <h2 className="font-headline text-xl md:text-2xl text-on-surface-custom mb-8 border-b border-outline-variant-custom/30 pb-4 font-bold tracking-tight">
                NOW PLAYING
              </h2>
              
              <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory -mx-4 px-4 hide-scrollbar">
                {playsData.slice(1).map((play) => (
                  <div 
                    key={play.id}
                    className="min-w-[280px] w-[80vw] md:w-[320px] snap-center flex flex-col gap-4 bg-surface-lowest rounded-xl shadow-sm border border-outline-variant-custom/20 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-dim">
                      <img 
                        alt={play.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                        src={play.image}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-brand-orange font-mono text-[11px] font-bold text-white rounded-md shadow-sm">
                          {play.badge}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col gap-2">
                      <h3 className="font-headline text-[18px] md:text-[20px] text-on-surface-custom leading-tight font-extrabold truncate">
                        {play.title.split(' (')[0]}
                      </h3>
                      <p className="font-sans text-xs text-on-surface-variant-custom">{play.period}</p>
                      <p className="font-sans text-xs text-on-surface-variant-custom truncate">{play.venue}</p>
                      
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => setSelectedPlay(play)}
                          className="flex-1 bg-transparent border border-outline-custom text-[#5c4037] py-2 rounded-md font-sans text-xs font-semibold hover:bg-surface-container-custom/50 transition-colors text-center cursor-pointer"
                        >
                          상세보기
                        </button>
                        <button 
                          onClick={() => handleOpenBooking(play)}
                          className="flex-1 bg-brand-primary text-white py-2 rounded-md font-sans text-xs font-semibold hover:opacity-90 transition-opacity text-center cursor-pointer"
                        >
                          예매하기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Information Stack Section (News, Event, Review) */}
            <section className="py-12 px-4 max-w-7xl mx-auto bg-surface-lowest border-y border-outline-variant-custom/10">
              <div className="flex flex-col gap-12">
                
                {/* News & Notice */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-outline-variant-custom/30 pb-2">
                    <h2 className="font-headline text-lg md:text-xl text-on-surface-custom font-extrabold">NEWS & NOTICE</h2>
                    <button 
                      onClick={() => setExpandedNews(expandedNews === 0 ? null : 0)}
                      className="font-mono text-[11px] text-brand-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      MORE <ArrowRight size={12} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {newsData.map((news, idx) => (
                      <div key={news.id} className="flex flex-col border-b border-gray-50 pb-2 last:border-b-0">
                        <div 
                          onClick={() => setExpandedNews(expandedNews === idx ? null : idx)}
                          className="cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-sans text-sm text-on-surface-custom font-medium group-hover:text-brand-orange transition-colors truncate pr-4">
                              {news.title}
                            </p>
                            <span className="font-mono text-[10px] text-on-surface-variant-custom flex-shrink-0">{news.date}</span>
                          </div>
                          
                          {/* Simulated placeholder bar matching exact image mock if not expanded */}
                          {expandedNews !== idx && (
                            <div className={`h-[6px] bg-outline-variant-custom rounded-sm mt-1.5 opacity-40 transition-all ${idx === 1 ? 'w-11/12' : 'w-full'}`} />
                          )}
                        </div>

                        {/* Accordion Expansion */}
                        <AnimatePresence>
                          {expandedNews === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="py-3 px-4 bg-surface-container-custom/30 rounded-lg mt-2 text-xs md:text-sm text-on-surface-variant-custom leading-relaxed">
                                {news.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-outline-variant-custom/30 pb-2">
                    <h2 className="font-headline text-lg md:text-xl text-on-surface-custom font-extrabold">EVENT</h2>
                    <button 
                      onClick={() => setExpandedEvent(expandedEvent === 0 ? null : 0)}
                      className="font-mono text-[11px] text-brand-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      MORE <ArrowRight size={12} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {eventData.map((ev, idx) => (
                      <div key={ev.id} className="flex flex-col border-b border-gray-50 pb-2 last:border-b-0">
                        <div 
                          onClick={() => setExpandedEvent(expandedEvent === idx ? null : idx)}
                          className="cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-sans text-sm text-on-surface-custom font-medium group-hover:text-brand-orange transition-colors truncate pr-4">
                              {ev.title}
                            </p>
                            <span className="font-mono text-[10px] text-on-surface-variant-custom flex-shrink-0">{ev.date}</span>
                          </div>
                          
                          {/* Simulated placeholder bar matching exact image mock if not expanded */}
                          {expandedEvent !== idx && (
                            <div className={`h-[6px] bg-outline-variant-custom rounded-sm mt-1.5 opacity-40 transition-all ${idx === 1 ? 'w-10/12' : 'w-full'}`} />
                          )}
                        </div>

                        {/* Accordion Expansion */}
                        <AnimatePresence>
                          {expandedEvent === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="py-3 px-4 bg-surface-container-custom/30 rounded-lg mt-2 text-xs md:text-sm text-on-surface-variant-custom leading-relaxed">
                                {ev.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-outline-variant-custom/30 pb-2">
                    <h2 className="font-headline text-lg md:text-xl text-on-surface-custom font-extrabold">REVIEW</h2>
                    <button 
                      onClick={() => setExpandedReview(expandedReview === 0 ? null : 0)}
                      className="font-mono text-[11px] text-brand-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      MORE <ArrowRight size={12} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {reviewData.map((rev, idx) => (
                      <div key={rev.id} className="flex flex-col border-b border-gray-50 pb-2 last:border-b-0">
                        <div 
                          onClick={() => setExpandedReview(expandedReview === idx ? null : idx)}
                          className="cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-sans text-sm text-on-surface-custom font-medium group-hover:text-brand-orange transition-colors truncate pr-4">
                              {rev.title}
                            </p>
                            <span className="font-mono text-[10px] text-on-surface-variant-custom flex-shrink-0">{rev.date}</span>
                          </div>
                          
                          {/* Simulated placeholder bar matching exact image mock if not expanded */}
                          {expandedReview !== idx && (
                            <div className={`h-[6px] bg-outline-variant-custom rounded-sm mt-1.5 opacity-40 transition-all ${idx === 0 ? 'w-11/12' : idx === 1 ? 'w-9/12' : 'w-full'}`} />
                          )}
                        </div>

                        {/* Accordion Expansion */}
                        <AnimatePresence>
                          {expandedReview === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="py-3 px-4 bg-surface-container-custom/30 rounded-lg mt-2 text-xs md:text-sm text-on-surface-variant-custom leading-relaxed">
                                {rev.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Archive Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto text-center">
              <h2 className="font-headline text-3xl md:text-4xl text-on-surface-custom mb-2 font-extrabold tracking-tight">
                ARCHIVE
              </h2>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant-custom font-medium tracking-wide mb-10">
                공연연보
              </p>
              
              <div className="relative w-full">
                <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar justify-start md:justify-center">
                  {archiveData.map((arch) => (
                    <div 
                      key={arch.id} 
                      className="min-w-[140px] w-[40vw] max-w-[200px] snap-center flex flex-col gap-3 items-center"
                    >
                      <div className="aspect-[3/4] w-full bg-surface-dim overflow-hidden rounded-md shadow-sm border border-outline-variant-custom/30">
                        <img 
                          alt={arch.title} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                          src={arch.image}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center w-full">
                        <h4 className="font-sans text-xs md:text-sm text-on-surface-custom font-bold truncate w-full">
                          {arch.title}
                        </h4>
                        <p className="font-mono text-[9px] md:text-[10px] text-on-surface-variant-custom mt-1">
                          {arch.period}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedArchive(arch)}
                        className="bg-white border border-outline-variant-custom text-on-surface-variant-custom px-3 py-1 text-xs rounded font-sans font-medium hover:bg-surface-container-custom transition-colors cursor-pointer"
                      >
                        상세보기
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Tab 2: PLAYS list tab */}
        {activeTab === 'plays' && (
          <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="font-headline text-2xl text-on-surface-custom mb-8 border-b border-outline-variant-custom/30 pb-4 font-bold">
              상영작 및 라인업
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {playsData.map((play) => (
                <div key={play.id} className="bg-white rounded-xl shadow-md border border-outline-variant-custom/20 overflow-hidden flex flex-col">
                  <div className="relative aspect-[3/4] w-full bg-surface-dim overflow-hidden">
                    <img src={play.image} alt={play.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-md uppercase">
                      {play.badge}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline text-xl font-bold text-on-surface-custom mb-2">
                        {play.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant-custom mb-1 font-semibold">{play.period}</p>
                      <p className="text-xs text-on-surface-variant-custom mb-4 font-medium">{play.venue}</p>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">{play.synopsis}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedPlay(play)}
                        className="flex-1 bg-gray-50 text-gray-700 py-2.5 rounded-lg font-sans text-xs font-semibold hover:bg-gray-100 transition-colors text-center cursor-pointer"
                      >
                        상세 정보
                      </button>
                      <button 
                        onClick={() => handleOpenBooking(play)}
                        className="flex-1 bg-brand-primary text-white py-2.5 rounded-lg font-sans text-xs font-semibold hover:opacity-95 transition-opacity text-center cursor-pointer"
                      >
                        예매하기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: TICKETS Booking lists */}
        {activeTab === 'tickets' && (
          <section className="py-12 px-4 max-w-xl mx-auto text-center">
            <Ticket size={48} className="mx-auto text-brand-orange mb-4" />
            <h2 className="font-headline text-2xl font-bold mb-2">연극열전 빠른 예매</h2>
            <p className="text-sm text-on-surface-variant-custom mb-8">관람하고 싶으신 연극의 예약 및 예매 시뮬레이션을 신속하게 진행해 보세요.</p>
            
            <div className="flex flex-col gap-4 text-left">
              {playsData.map(play => (
                <div 
                  key={play.id} 
                  onClick={() => handleOpenBooking(play)}
                  className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-brand-orange/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img src={play.image} referrerPolicy="no-referrer" alt="" className="w-12 h-16 object-cover rounded shadow-inner" />
                    <div>
                      <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded font-bold">{play.badge}</span>
                      <h4 className="font-semibold text-gray-900 mt-1">{play.title.split(' (')[0]}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{play.venue}</p>
                    </div>
                  </div>
                  <button className="bg-brand-primary text-white p-2.5 rounded-full hover:opacity-90">
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: ARCHIVE complete page */}
        {activeTab === 'archive' && (
          <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="font-headline text-2xl text-on-surface-custom mb-2 font-bold text-center">
              PREVIOUS ARTWORKS
            </h2>
            <p className="font-sans text-xs text-on-surface-variant-custom text-center mb-10">지난 명작 라인업 살펴보기</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {archiveData.map((arch) => (
                <div 
                  key={arch.id}
                  className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-inner flex flex-col p-4"
                >
                  <img src={arch.image} alt={arch.title} referrerPolicy="no-referrer" className="w-full aspect-[3/4] object-cover rounded-md mb-4" />
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{arch.title}</h3>
                  <span className="text-xs font-mono text-gray-500 mb-3 block">{arch.period}</span>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">{arch.description}</p>
                  <button 
                    onClick={() => setSelectedArchive(arch)}
                    className="mt-auto w-full bg-brand-primary/5 text-brand-primary py-2 rounded-md hover:bg-brand-primary/10 transition-colors pointer-event text-xs font-bold"
                  >
                    소개 보기
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 5: MY PAGE */}
        {activeTab === 'my' && (
          <section className="py-12 px-4 max-w-xl mx-auto">
            <h2 className="font-headline text-2xl text-on-surface-custom mb-6 border-b border-gray-100 pb-4 font-bold">
              마이 예매 내역
            </h2>
            
            {ticketConfirmedCode ? (
              <div className="bg-white rounded-xl shadow-md border border-brand-orange/20 p-6 flex flex-col">
                <div className="flex border-b border-gray-100 pb-4 justify-between items-center mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">CONFIRMED TICKET</span>
                    <h3 className="font-bold text-xl text-gray-900 mt-2">{bookingPlay?.title.split(' (')[0]}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-mono block">RESERVATION CODE</span>
                    <span className="font-mono text-brand-primary font-bold text-lg">{ticketConfirmedCode}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-700">
                  <div>
                    <span className="text-gray-400 block text-xs">일시</span>
                    <span className="font-semibold">{bookingDate} @ {bookingTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">장소</span>
                    <span className="font-semibold truncate block">{bookingPlay?.venue}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">인원 및 수량</span>
                    <span className="font-semibold">{ticketCount}매</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">지정 좌석</span>
                    <span className="font-semibold">{selectedSeats.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-8 bg-brand-orange/5 p-4 rounded-lg flex items-center gap-3 border border-brand-orange/10">
                  <Sparkles className="text-brand-orange flex-shrink-0" size={18} />
                  <p className="text-xs text-brand-orange font-medium leading-relaxed">
                    공연 당일 매표소에서 예매 코드 수령 및 신분증 지참 시 실물 실크인쇄 티켓으로 발급해 드립니다.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setTicketConfirmedCode('');
                    setBookingPlay(null);
                  }}
                  className="mt-6 border border-gray-200 text-gray-600 hover:text-red-500 hover:bg-red-50 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  기록 지우기 / 취소 시뮬레이션
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-inner border border-gray-100 p-8 text-center text-gray-400">
                <Ticket className="mx-auto text-gray-200 mb-4" size={40} />
                <p className="text-sm font-medium">예매 내역이 존재하지 않습니다.</p>
                <p className="text-xs mt-1">원하는 연극의 예매 시뮬레이션을 완료해 주세요.</p>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="mt-6 bg-brand-primary text-white px-5 py-2 rounded-md hover:opacity-95 transition-all text-xs font-bold"
                >
                  예매하러 가기
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Primary Footer */}
      <footer className="w-full px-4 py-12 flex flex-col items-center gap-8 border-t border-outline-variant-custom/30 bg-surface-container-custom/30 dark:bg-deep-charcoal text-center mt-12">
        <div className="flex gap-4 items-center justify-center text-on-surface-variant-custom">
          <a className="p-2.5 hover:text-brand-orange transition-colors bg-white rounded-full shadow-sm text-gray-600 flex items-center justify-center" href="#" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a className="p-2.5 hover:text-brand-orange transition-colors bg-white rounded-full shadow-sm text-gray-600 flex items-center justify-center" href="#" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a className="p-2.5 hover:text-brand-orange transition-colors bg-white rounded-full shadow-sm text-gray-600 flex items-center justify-center" href="#" aria-label="YouTube">
            <Play size={20} fill="currentColor" />
          </a>
          <a className="p-2.5 hover:text-brand-orange transition-colors bg-white rounded-full shadow-sm text-gray-600 flex items-center justify-center" href="#" aria-label="Instagram">
            <Instagram size={20} />
          </a>
        </div>
        
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-on-surface-variant-custom font-medium">
          <li><a className="hover:text-brand-orange transition-colors" href="#">연극열전 소개</a></li>
          <li><a className="hover:text-brand-orange transition-colors" href="#">이용약관</a></li>
          <li><a className="font-bold hover:text-brand-orange transition-colors" href="#">개인정보처리방침</a></li>
          <li><a className="hover:text-brand-orange transition-colors" href="#">이메일 무단수집거부</a></li>
        </ul>
        
        <div className="text-[11px] text-on-surface-variant-custom opacity-80 flex flex-col gap-1 max-w-md">
          <p className="font-sans leading-relaxed">
            사업자정보: (주)연극열전 | 대표자: 허지혜 | 서울특별시 종로구 대학로길 기획실
          </p>
          <p className="font-sans font-medium">
            © 2026 THE BEST PLAY (연극열전). ALL RIGHTS RESERVED.
          </p>
        </div>
        
        <img 
          alt="Best Play Footer Logo" 
          className="h-8 opacity-50 grayscale mix-blend-multiply dark:mix-blend-screen mt-4 cursor-pointer" 
          src="https://lh3.googleusercontent.com/aida/AP1WRLsIxcPjlhlkDlWoWj7hLx0HnEG61nTmeL7zeBE9PbXemt3D9x6V8otaTIU46gbRR4Tx7f5_suzPlkQ__HBG2FpYcXmPAtBXbyDhNHTW35QMr1O2f1_h8rWzznzSeiFjTra3lAYvtalxyeKO7LRuRorrYkxL_v4aGdWpT3i4lO7SUtP_GDptuGlSVQEOKK8YRD0bxyyxdfHO2LSq8u0CVQVSMXX9P09-T1hePqGn-X-fClzaKPgpIlmrpok"
          referrerPolicy="no-referrer"
          onClick={() => setActiveTab('home')}
        />
      </footer>

      {/* BottomNavigationBar with active state markers */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-white/95 dark:bg-deep-charcoal/95 backdrop-blur-xl rounded-t-xl shadow-lg border-t border-outline-variant-custom/20 md:hidden">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-300 ${activeTab === 'home' ? 'text-brand-orange bg-brand-orange/10 rounded-full px-4' : 'text-on-surface-variant-custom hover:text-brand-orange'}`}
        >
          <Home size={18} fill={activeTab === 'home' ? 'currentColor' : 'none'} />
          <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">Home</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('plays')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-300 ${activeTab === 'plays' ? 'text-brand-orange bg-brand-orange/10 rounded-full px-4' : 'text-on-surface-variant-custom hover:text-brand-orange'}`}
        >
          <Drama size={18} />
          <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">Plays</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('tickets')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-300 ${activeTab === 'tickets' ? 'text-brand-orange bg-brand-orange/10 rounded-full px-4' : 'text-on-surface-variant-custom hover:text-brand-orange'}`}
        >
          <Ticket size={18} />
          <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">Tickets</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('archive')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-300 ${activeTab === 'archive' ? 'text-brand-orange bg-brand-orange/10 rounded-full px-4' : 'text-on-surface-variant-custom hover:text-brand-orange'}`}
        >
          <Archive size={18} />
          <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">Archive</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('my')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-300 ${activeTab === 'my' ? 'text-brand-orange bg-brand-orange/10 rounded-full px-4' : 'text-on-surface-variant-custom hover:text-brand-orange'}`}
        >
          <User size={18} />
          <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">My</span>
        </button>
      </nav>

      {/* Interactive Play Detail Modal */}
      <AnimatePresence>
        {selectedPlay && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlay(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl z-[60] overflow-y-auto shadow-2xl p-6"
            >
              <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[11px] font-bold text-white bg-brand-orange px-2.5 py-0.5 rounded uppercase">
                    {selectedPlay.badge}
                  </span>
                  <h3 className="font-headline text-2xl font-black text-gray-900 mt-2">{selectedPlay.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPlay(null)}
                  className="text-gray-400 hover:text-gray-900 p-1.5 bg-gray-100 rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedPlay.image} 
                  referrerPolicy="no-referrer"
                  alt={selectedPlay.title} 
                  className="w-full md:w-1/3 aspect-[3/4] object-cover rounded-xl shadow-lg" 
                />
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <span className="text-gray-400 text-xs block mb-1">상영 정보 및 극장</span>
                    <p className="font-bold text-gray-800 text-sm">{selectedPlay.period} @ {selectedPlay.venue}</p>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs block mb-1 font-semibold">줄거리 및 시놉시스</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedPlay.synopsis}</p>
                  </div>

                  {selectedPlay.directors && (
                    <div>
                      <span className="text-gray-400 text-xs block mb-1">크리에이티브 연출</span>
                      <p className="text-gray-800 text-sm font-semibold">{selectedPlay.directors}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-gray-400 text-xs block mb-1">캐스팅 라인업</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPlay.cast.map(actor => (
                        <span key={actor} className="bg-brand-primary/5 border border-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={() => {
                        const target = selectedPlay;
                        setSelectedPlay(null);
                        setTimeout(() => handleOpenBooking(target), 200);
                      }}
                      className="flex-1 bg-brand-primary text-white py-3.5 rounded-xl font-bold hover:opacity-95 text-center cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-brand-primary/20"
                    >
                      <Ticket size={18} />
                      <span>티켓 바로 예매하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Interactive Archive Detail Modal */}
      <AnimatePresence>
        {selectedArchive && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArchive(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl z-[60] overflow-y-auto shadow-2xl p-6"
            >
              <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-extrabold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">
                    ARCHIVE RECORD
                  </span>
                  <h3 className="font-headline text-2xl font-black text-gray-900 mt-2">{selectedArchive.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedArchive(null)}
                  className="text-gray-400 hover:text-gray-900 p-1.5 bg-gray-100 rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedArchive.image} 
                  referrerPolicy="no-referrer"
                  alt={selectedArchive.title} 
                  className="w-full md:w-1/3 aspect-[3/4] object-cover rounded-xl shadow-lg" 
                />
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <span className="text-gray-400 text-xs block mb-1">상영 연보 및 기간</span>
                    <p className="font-bold text-gray-800 text-sm">{selectedArchive.period}</p>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs block mb-1">아카이브 연혁 소개</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedArchive.description}</p>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs block mb-1">참여 레전더리 캐스트</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedArchive.cast.map(actor => (
                        <span key={actor} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedArchive(null)}
                      className="w-full bg-deep-charcoal text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      목록으로 돌아가기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Interactive Booking Simulation Modal Flow */}
      <AnimatePresence>
        {bookingPlay && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingPlay(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="fixed inset-x-0 bottom-0 max-h-[90vh] bg-white rounded-t-3xl z-[60] overflow-y-auto shadow-2xl p-6"
            >
              <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest block mb-1">ONLINE TICKETS</span>
                  <h3 className="font-headline text-xl font-bold text-gray-900">
                    {bookingPlay.title.split(' (')[0]} <span className="font-normal text-sm text-gray-500">예매 시뮬레이터</span>
                  </h3>
                </div>
                <button 
                  onClick={() => setBookingPlay(null)}
                  className="text-gray-450 hover:text-gray-900 p-1.5 bg-gray-100 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Steps Indicator */}
              <div className="flex gap-2 mb-6 bg-gray-50 p-2 rounded-lg">
                <span className={`flex-1 text-center py-1.5 text-xs font-bold rounded ${bookingStep === 1 ? 'bg-brand-primary text-white' : 'text-gray-400'}`}>1. 날짜 및 회차</span>
                <span className={`flex-1 text-center py-1.5 text-xs font-bold rounded ${bookingStep === 2 ? 'bg-brand-primary text-white' : 'text-gray-400'}`}>2. 수량 및 좌석</span>
                <span className={`flex-1 text-center py-1.5 text-xs font-bold rounded ${bookingStep === 3 ? 'bg-brand-primary text-white' : 'text-gray-400'}`}>3. 예매 확정</span>
              </div>

              {/* Step 1 Content: Date & Time picker */}
              {bookingStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-2">1단계: 관람 희망 날짜 선택 (달력 형태)</label>
                    
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-4">
                      {/* Calendar Navigation Head */}
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          type="button"
                          onClick={() => {
                            if (calendarMonth === 1) {
                              setCalendarMonth(12);
                              setCalendarYear(prev => prev - 1);
                            } else {
                              setCalendarMonth(prev => prev - 1);
                            }
                          }}
                          className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-100 text-[11px] font-bold transition-colors cursor-pointer text-gray-600"
                        >
                          &lt; 이전 달
                        </button>
                        <span className="font-headline font-bold text-sm text-gray-800">
                          {calendarYear}년 {calendarMonth}월
                        </span>
                        <button 
                          type="button"
                          onClick={() => {
                            if (calendarMonth === 12) {
                              setCalendarMonth(1);
                              setCalendarYear(prev => prev + 1);
                            } else {
                              setCalendarMonth(prev => prev + 1);
                            }
                          }}
                          className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-100 text-[11px] font-bold transition-colors cursor-pointer text-gray-600"
                        >
                          다음 달 &gt;
                        </button>
                      </div>

                      {/* Weekday Labels */}
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
                        <span className="text-red-500">일</span>
                        <span>월</span>
                        <span>화</span>
                        <span>수</span>
                        <span>목</span>
                        <span>금</span>
                        <span className="text-blue-500">토</span>
                      </div>

                      {/* Monthly Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {/* Spacing empty blocks */}
                        {Array.from({ length: new Date(calendarYear, calendarMonth - 1, 1).getDay() }).map((_, idx) => (
                          <div key={`empty-${idx}`} className="h-9" />
                        ))}

                        {/* Valid days */}
                        {Array.from({ length: new Date(calendarYear, calendarMonth, 0).getDate() }).map((_, idx) => {
                          const dayNum = idx + 1;
                          const dateString = `${calendarYear}-${String(calendarMonth).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                          const isSelected = bookingDate === dateString;
                          
                          // Determine if the day is in official theatrical runs
                          let isPlayPeriod = false;
                          if (bookingPlay.id === 'nature_of_forgetting') {
                            isPlayPeriod = calendarYear === 2026 && calendarMonth === 9;
                          } else if (bookingPlay.id === 'mouthpiece') {
                            isPlayPeriod = calendarYear === 2026 && (
                              (calendarMonth === 4 && dayNum >= 4) ||
                              calendarMonth === 5 ||
                              (calendarMonth === 6 && dayNum <= 21)
                            );
                          } else if (bookingPlay.id === 'lungs') {
                            isPlayPeriod = calendarYear === 2026 && (
                              (calendarMonth === 5 && dayNum >= 23) ||
                              calendarMonth === 6 ||
                              calendarMonth === 7 ||
                              (calendarMonth === 8 && dayNum <= 2)
                            );
                          }

                          return (
                            <button
                              key={`day-${dayNum}`}
                              type="button"
                              onClick={() => setBookingDate(dateString)}
                              className={`h-9 text-xs font-semibold rounded-lg flex flex-col items-center justify-center transition-all relative cursor-pointer
                                ${isSelected 
                                  ? 'bg-brand-orange text-white ring-2 ring-brand-orange/40 font-bold' 
                                  : isPlayPeriod
                                    ? 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary font-bold' 
                                    : 'text-gray-300 hover:bg-gray-50'
                                }
                              `}
                            >
                              <span>{dayNum}</span>
                              {isPlayPeriod && !isSelected && (
                                <span className="absolute bottom-1 w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-[11px] text-brand-primary mt-2 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block"></span>
                      붉은 점 표시는 《{bookingPlay.title.split(' (')[0]}》 공식 상영 일정입니다.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-2">2단계: 회차 시간 선택</label>
                    <div className="flex gap-2">
                      {['15:00 (오후 3시)', '19:30 (오후 7시 30분)'].map(time => {
                        const parsedTime = time.split(' (')[0];
                        return (
                          <button
                            key={time}
                            onClick={() => setBookingTime(parsedTime)}
                            className={`flex-1 py-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${bookingTime === parsedTime ? 'bg-brand-orange text-white border-brand-orange font-bold shadow-sm' : 'bg-white text-gray-700 border-gray-150 hover:border-gray-300'}`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <MapPin className="text-brand-orange flex-shrink-0" size={18} />
                    <div>
                      <h4 className="text-xs text-gray-400 block">선택 극장 정보</h4>
                      <p className="text-sm font-bold text-gray-800">{bookingPlay.venue}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextBookingStep}
                    disabled={!bookingDate || !bookingTime}
                    className="w-full mt-4 bg-brand-primary text-white py-4 rounded-xl font-bold hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed text-center cursor-pointer shadow-md shadow-brand-primary/10"
                  >
                    다음 단계 (좌석 선택)
                  </button>
                </div>
              )}

              {/* Step 2 Content: Ticket Count & Seats */}
              {bookingStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-gray-450 font-bold block mb-2">티켓 예매 매수 및 좌석 직접 선택</label>
                    
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-150 mb-3 text-xs">
                      <span className="text-gray-650 font-semibold">전석 균일 좌석가: <span className="text-brand-primary">45,000원</span></span>
                      <span className="text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-md font-bold text-[11px]">
                        선택된 매수: <span className="font-extrabold">{selectedSeats.length}석</span>
                      </span>
                    </div>

                    {/* Dynamic Limit Warnings */}
                    {seatWarning && (
                      <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-medium mb-3 flex items-center gap-2 animate-bounce">
                        <span>⚠️</span>
                        <span>{seatWarning}</span>
                      </div>
                    )}

                    {/* Integrated Theater Seating Layout */}
                    <div className="p-4 bg-gray-900 rounded-xl flex flex-col items-center shadow-lg text-white mb-3">
                      {/* Interactive Stage Light Glow */}
                      <div className="w-11/12 h-1 bg-brand-orange/60 rounded-full blur-[1px] mb-1" />
                      <div className="w-full bg-gradient-to-b from-brand-orange/15 to-transparent text-white text-[10px] font-bold py-1 rounded-md text-center tracking-widest uppercase mb-6 font-headline">
                        STAGE (무대 정면)
                      </div>

                      {/* Seating Arrangement Map */}
                      <div className="flex flex-col gap-1.5 w-full items-center overflow-x-auto py-2">
                        {['A', 'B', 'C', 'D', 'E'].map(row => (
                          <div key={row} className="flex items-center gap-1.5">
                            {/* Row Label Label */}
                            <span className="w-4 text-[10px] font-bold text-gray-500 text-center mr-1 font-mono">{row}</span>
                            
                            {/* Columns 1~10 */}
                            {Array.from({ length: 10 }).map((_, idx) => {
                              const colNum = idx + 1;
                              const seatName = `${row}열 ${colNum}번`;
                              const isSelected = selectedSeats.includes(seatName);
                              const isSoldIndex = isSoldOut(row, colNum);

                              return (
                                <button
                                  key={seatName}
                                  type="button"
                                  disabled={isSoldIndex}
                                  onClick={() => handleSeatClick(row, colNum)}
                                  className={`w-6.5 h-6.5 md:w-8 md:h-8 rounded-md flex items-center justify-center text-[9px] md:text-xs font-semibold font-mono transition-all cursor-pointer relative
                                    ${isSoldIndex 
                                      ? 'bg-gray-800 text-gray-600 border border-gray-800 cursor-not-allowed' 
                                      : isSelected
                                        ? 'bg-brand-orange text-white ring-2 ring-brand-orange/40 font-bold border border-brand-orange'
                                        : 'bg-gray-700 text-white border border-gray-600 hover:border-brand-orange/50 hover:bg-gray-650'
                                    }
                                  `}
                                >
                                  {isSoldIndex ? '×' : colNum}
                                </button>
                              );
                            })}

                            <span className="w-4 text-[10px] font-bold text-gray-500 text-center ml-1 font-mono">{row}</span>
                          </div>
                        ))}
                      </div>

                      {/* Seating Arrangement Legends */}
                      <div className="flex gap-4 mt-6 text-[10px] font-medium text-gray-400 border-t border-white/10 pt-3 w-full justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 bg-gray-700 border border-gray-600 rounded-sm inline-block"></span>
                          <span>선택 가능</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 bg-brand-orange border border-brand-orange rounded-sm inline-block"></span>
                          <span>선택한 좌석</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 bg-gray-800 border border-gray-800 text-gray-600 rounded-sm inline-block text-center font-bold text-[8px] leading-3">×</span>
                          <span>판매 완료</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1">선택하신 좌석</label>
                    <div className="flex gap-1.5 flex-wrap min-h-8">
                      {selectedSeats.length > 0 ? (
                        selectedSeats.map(seat => (
                          <span key={seat} className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 px-2.5 py-1.5 shadow-sm">
                            <Check size={12} className="stroke-[3]" />
                            {seat}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-gray-450 italic mt-1 pb-1">배치도에서 관람 희망 좌석을 1석 이상 골라 주십시오. (인당 최대 4석)</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 p-4 rounded-xl">
                    <div>
                      <span className="text-xs text-gray-400 block font-semibold">총 예매 금액</span>
                      <span className="text-xl font-headline font-bold text-brand-orange">
                        {(selectedSeats.length * 45000).toLocaleString()}원
                      </span>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1.5 rounded font-bold">현장 수령</span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="w-1/3 border border-gray-200 text-gray-600 py-4 rounded-xl font-bold bg-white hover:bg-gray-50 transition-colors text-center text-sm cursor-pointer"
                    >
                      이전으로
                    </button>
                    <button
                      onClick={handleNextBookingStep}
                      disabled={selectedSeats.length === 0}
                      className="flex-1 bg-brand-primary text-white py-4 rounded-xl font-bold hover:opacity-95 transition-opacity text-center flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm cursor-pointer shadow-md shadow-brand-primary/10"
                    >
                      <span>결제 및 예매 완료</span>
                      <Sparkles size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 Content: Completed confirmation */}
              {bookingStep === 3 && (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4 shadow-inner">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h4 className="font-headline text-xl font-black text-gray-900 mb-2">예매 시뮬레이션 완료!</h4>
                  <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
                    축하합니다! 성공적으로 극단 연극열전 가상 예매가 실행되었습니다. 마이페이지에서 코드를 항상 확인하실 수 있습니다.
                  </p>

                  <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-150 flex flex-col gap-3 text-left mb-6">
                    <div className="flex justify-between border-b border-gray-200 pb-2 text-xs">
                      <span className="text-gray-400 font-medium">가상 예매번호</span>
                      <span className="font-mono font-bold text-brand-primary text-sm">{ticketConfirmedCode}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">연극명</span>
                      <span className="font-bold text-gray-800">{bookingPlay.title.split(' (')[0]}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">일시</span>
                      <span className="font-bold text-gray-800">{bookingDate} @ {bookingTime}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">매수 / 좌석</span>
                      <span className="font-bold text-gray-800">{ticketCount}매 ({selectedSeats.join(', ')})</span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => {
                        setBookingPlay(null);
                        setActiveTab('my');
                      }}
                      className="flex-1 bg-brand-primary text-white py-3.5 rounded-xl font-bold hover:opacity-95 text-center cursor-pointer transition-colors"
                    >
                      나의 예매내역 확인
                    </button>
                    <button
                      onClick={() => {
                        setBookingPlay(null);
                      }}
                      className="border border-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
