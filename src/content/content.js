/**
 * ─── BILINGUAL CONTENT ──────────────────────────────────────────────────────
 * ALL user-facing strings live here. Components import { useContent } and
 * read content[lang].section.key — no hardcoded strings in JSX.
 *
 * Hindi uses natural, culturally appropriate wording — not machine translation.
 */

const content = {
  en: {
    meta: {
      title: 'Parul weds Shubham — 20 November 2026',
      description:
        'With the blessings of our families, we joyfully invite you to the wedding celebration of Parul Sharma & Shubham Sharma on 20 November 2026 at Swarnabhoomi, Aligarh.',
    },

    curtain: {
      blessing: 'With the blessings of our families',
      invite: 'We joyfully invite you to the wedding of',
      brideGroom: 'Parul & Shubham',
      date: '20 · November · 2026',
      cta: 'Open Invitation',
      ctaSub: 'Tap to begin',
    },

    hero: {
      saveTheDate: 'Save the Date',
      names: 'Parul & Shubham',
      date: 'Friday, 20 November 2026',
      guestGreeting: (name) => `Dear ${name},`,
      defaultGreeting: 'You are warmly invited',
    },

    blessings: {
      ganesh: '॥ Shri Ganeshaya Namah ॥',
      shlok:
        'Vakratunda Mahakaya Suryakoti Samaprabha |\nNirvighnam Kurume Deva Sarva Karyeshu Sarvada ॥',
      vishnu:
        'Mangalam Bhagwan Vishnu, Mangalam Garudadhwaja |\nMangalam Pundarikaaksha, Mangalaya Tano Hari ॥',
      invite:
        'By the grace of the Almighty and the blessings of our elders, a joyous occasion has come to our family.',
      sectionLabel: 'WITH THE BLESSINGS OF OUR FAMILIES',
      heading: 'The Bride & Groom',

      bride: {
        label: 'BRIDE',
        name: 'Er. Parul Sharma',
        grandparentsLabel: 'Granddaughter of',
        grandparents: 'Shri Charansingh Sharma & Late Smt. Premadevi Sharma',
        parentsLabel: 'Daughter of',
        parents: 'Shri Kamalkant Sharma & Smt. Renu Sharma',
        city: 'Ujjain',
        granddaughterOf: 'Granddaughter of: Shri Charansingh Sharma & Late Smt. Premadevi Sharma',
        daughterOf: 'Daughter of: Shri Kamalkant Sharma & Smt. Renu Sharma (Ujjain)',
        alt: 'Parul Sharma, the bride',
      },

      groom: {
        label: 'GROOM',
        name: 'Er. Shubham Sharma',
        grandparentsLabel: 'Grandson of',
        grandparents: 'Late Shri Harnarayan Sharma & Smt. Satyawati Devi Sharma',
        parentsLabel: 'Son of',
        parents: 'Shri Sudhir Kumar Sharma & Smt. Rajbala Sharma',
        city: 'Aligarh',
        grandsonOf: 'Grandson of: Late Shri Harnarayan Sharma & Smt. Satyawati Devi Sharma',
        sonOf: 'Son of: Shri Sudhir Kumar Sharma & Smt. Rajbala Sharma (Aligarh)',
        alt: 'Shubham Sharma, the groom',
      },

      closing:
        'We humbly request your presence at this auspicious celebration',
    },

    mataPoojan: {
      eyebrow: 'UJJAIN · AUSPICIOUS CEREMONIES',
      title: 'Mata Poojan & Snehbhoj',
      dateBanner: 'Sunday, 15 November 2026',
      intro:
        'With traditional Vedic rituals and heartfelt hospitality, we invoke the divine maternal blessings and welcome our cherished family for the celebratory feast.',
      footerLine: 'WARMLY WELCOMING YOU IN UJJAIN',
      events: [
        {
          id: 'mata-pujan',
          tag: 'SACRED PUJAN',
          name: 'Mata Poojan',
          time: '9:30 AM',
          timeLabel: 'Morning 9:30 AM',
          venue: 'Nij Niwas (Family Residence), Ujjain',
          address: '',
          mapQuery: 'Nij Niwas Ujjain',
          desc: 'Auspicious Vedic rituals invoking maternal and divine blessings for happiness, prosperity, and everlasting harmony.',
        },
        {
          id: 'sneh-bhoj',
          tag: 'FESTIVE FEAST',
          name: 'Snehbhoj',
          time: '12:30 PM – 3:30 PM',
          timeLabel: 'Afternoon 12:30 PM to 3:30 PM',
          venue: 'Shri Riddhi-Siddhi Vinayak Parisar',
          address: 'Opp. Gayatri Shakti Peeth, Ankpat Marg, Ujjain (M.P.)',
          mapQuery: 'Shri Riddhi-Siddhi Vinayak Parisar, Opp. Gayatri Shakti Peeth, Ankpat Marg, Ujjain',
          desc: 'A joyous traditional feast bringing together family and loved ones to celebrate with warm hospitality and fellowship.',
        },
      ],
      calendarBtn: 'Add to Calendar',
      mapsBtn: 'View Venue Map',
      threeTitle: 'SACRED AKHAND JYOTI',
      threeHint: 'Interactive 3D • Move cursor or tap to sway the sacred flame',
    },

    weddingCelebrations: {
      eyebrow: 'ALIGARH · WEDDING CEREMONIES',
      title: 'The Wedding Celebrations',
      dateBanner: 'Friday, 20 November 2026',
      intro:
        'Join us as two families unite in joy, with rituals, music and blessings, followed by a warm celebration dinner.',
      footerLine: 'WARMLY WELCOMING YOU IN ALIGARH',
      threeTitle: 'THE SACRED STAGE',
      threeHint: 'Interactive 3D · move your cursor or tap to look around',
      threeAlt: 'Interactive 3D representation of the wedding ceremonies',
      events: [
        {
          id: 'lagn-sagai',
          badge: 'SACRED UNION',
          title: 'Lagn & Sagai',
          time: 'Evening 4:00 PM',
          note: 'The ring ceremony and the auspicious lagn rituals.',
          ariaLabel: 'Event 1: Lagn & Sagai, Evening 4:00 PM',
        },
        {
          id: 'baraat-swagat',
          badge: 'GRAND WELCOME',
          title: 'Baraat Swagat',
          time: 'Evening 7:00 PM',
          note: 'A joyful welcome for the baraat with music and celebration.',
          ariaLabel: 'Event 2: Baraat Swagat, Evening 7:00 PM',
        },
        {
          id: 'ashirwad-bhoj',
          badge: 'BLESSINGS & FEAST',
          title: 'Ashirwad Samaroh & Swaruchi Bhoj',
          time: 'From 7:30 PM until your arrival',
          note: 'Bless the couple and enjoy dinner of your choice with family and friends.',
          ariaLabel: 'Event 3: Ashirwad Samaroh & Swaruchi Bhoj, From 7:30 PM until your arrival',
        },
      ],
      venue: {
        label: 'WEDDING VENUE',
        name: 'Swarnbhoomi',
        address: 'Near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
        mapQuery: 'Swarnbhoomi, near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
        mapsBtn: 'View Venue Map',
        calendarBtn: 'Add to Calendar',
      },
      dotLabels: [
        'Lagn & Sagai (Interlocking Rings)',
        'Baraat Swagat (Jaimala Garland)',
        'Ashirwad & Bhoj (Golden Kalash)',
      ],
    },

    vidaai: {
      eyebrow: 'A BLESSED FAREWELL',
      title: 'Vidaai',
      date: 'Saturday, 21 November 2026',
      badge: 'NEW BEGINNINGS',
      time: 'Morning 6:00 AM',
      description:
        'With moist eyes and full hearts, we bid the bride a loving farewell as she begins a new journey, carrying the blessings of both families.',
      calendarBtn: 'Add to Calendar',
      mapsBtn: 'View Venue Map',
      venueLabel: 'VENUE',
      threeTitle: 'VIDAAI AT DAWN',
      threeHint: 'Interactive 3D · drag to look around',
      threeAlt: 'Interactive 3D scene of Vidaai at dawn',
      replayBtn: 'Replay sunrise',
      footerLine: 'WITH LOVE AND BLESSINGS',
    },

    couple: {
      bride: {
        name: 'Er. Parul Sharma',
        bio: 'A spirited engineer with a heart full of warmth, Parul brings light to every room she enters.',
      },
      groom: {
        name: 'Er. Shubham Sharma',
        bio: "A dedicated engineer with a gentle soul, Shubham's quiet strength and kind smile complete every moment.",
      },
    },

    countdown: {
      heading: 'Counting Down to Forever',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      past: 'The celebration has begun!',
    },

    events: {
      heading: 'Celebrations',
      subheading: 'Join us across these joyful occasions',
      addToCalendar: 'Add to Calendar',
      list: [
        {
          id: 'mata-pujan',
          name: 'Mata Pujan',
          date: 'Sunday, 15 November 2026',
          time: '9:30 AM',
          venue: 'Nij Nivas',
          address: '55, Gandhi Nagar, Agar Road, Ujjain (M.P.)',
          icon: 'diya',
        },
        {
          id: 'sneh-bhoj',
          name: 'Sneh Bhoj',
          subtitle: 'Family Luncheon',
          date: 'Sunday, 15 November 2026',
          time: '12:30 PM – 3:30 PM',
          venue: 'Shri Riddhi-Siddhi Vinayak Parisar',
          address: 'Opp. Gayatri Shakti Peeth, Ankpat Marg, Ujjain (M.P.)',
          icon: 'marigold',
        },
        {
          id: 'lagna-sagaai',
          name: 'Lagna & Sagaai',
          subtitle: 'Wedding & Engagement',
          date: 'Friday, 20 November 2026',
          time: '4:00 PM',
          venue: 'Swarnabhoomi',
          address: 'Near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
          icon: 'rings',
        },
        {
          id: 'baraat',
          name: 'Baraat Swagat',
          subtitle: "Groom's Procession",
          date: 'Friday, 20 November 2026',
          time: '7:00 PM',
          venue: 'Swarnabhoomi',
          address: 'Near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
          icon: 'horse',
        },
        {
          id: 'ashirwad',
          name: 'Ashirwad Samaroh & Dinner',
          subtitle: 'Reception & Dinner',
          date: 'Friday, 20 November 2026',
          time: '7:30 PM onwards',
          venue: 'Swarnabhoomi',
          address: 'Near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
          icon: 'garland',
        },
        {
          id: 'vidai',
          name: 'Vidai',
          subtitle: 'Farewell Ceremony',
          date: 'Saturday, 21 November 2026',
          time: '6:00 AM',
          venue: 'Swarnabhoomi',
          address: 'Near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
          icon: 'lotus',
        },
      ],
    },

    baraat: {
      heading: 'The Baraat Arrives',
      subtext: "Groom's procession · 20 November · 7:00 PM",
      reveal: 'The Baraat arrives at 7:00 PM',
    },

    card: {
      heading: 'Our Invitation Card',
      download: 'Download Card',
      pinchHint: 'Pinch to zoom',
    },

    gallery: {
      heading: 'Moments Together',
    },

    venue: {
      heading: 'Venue',
      name: 'Swarnabhoomi',
      address: 'Near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
      mapButton: 'Open in Google Maps',
      clickForMap: 'Click to load map',
    },

    rsvp: {
      heading: 'Send Your Blessings',
      subheading: 'Bless the couple with your love and warm wishes',
      nameLabel: 'Your Name / Family Name',
      messageLabel: 'Your Blessings & Wishes',
      whatsappBtn: 'Send Blessings via WhatsApp',
      callBtn: 'Call Us',
      placeholderName: 'e.g. Sharma Family',
      placeholderMessage: 'Wishing Parul & Shubham a lifetime of endless joy, love and harmony...',
      whatsappMessage: (name, message) =>
        `Namaste 🙏\nHeartiest congratulations to Parul & Shubham! 🌸\n\n"${message || 'Wishing you both a joyful and blessed married life!'}"\n\nWith love and blessings,\n*${name}*`,
    },

    footer: {
      blessing: 'शुभ विवाह 🌸',
      tagline: 'May love, laughter and happily ever after fill your days.',
      hashtag: '#ParulWedShubham',
      madeWith: 'Made with ❤️ for Parul & Shubham',
      replayIntro: 'Replay Intro',
      language: 'हिन्दी में देखें',
    },

    music: {
      play: 'Play Music',
      pause: 'Pause Music',
      notAvailable: 'Music coming soon',
    },
  },

  // ─── HINDI ────────────────────────────────────────────────────────────────
  hi: {
    meta: {
      title: 'पारुल & शुभम का शुभ विवाह — 20 नवम्बर 2026',
      description:
        'परिवार के आशीर्वाद से हम आपको पारुल शर्मा एवं शुभम शर्मा के मंगल परिणयोत्सव में सादर आमंत्रित करते हैं। दिनांक 20 नवम्बर 2026, स्वर्णभूमि, अलीगढ़।',
    },

    curtain: {
      blessing: 'परिवार के आशीर्वाद से',
      invite: 'हम सादर आमंत्रित करते हैं',
      brideGroom: 'पारुल एवं शुभम',
      date: '20 · नवम्बर · 2026',
      cta: 'निमंत्रण खोलें',
      ctaSub: 'स्पर्श करें',
    },

    hero: {
      saveTheDate: 'तिथि याद रखें',
      names: 'पारुल & शुभम',
      date: 'शुक्रवार, 20 नवम्बर 2026',
      guestGreeting: (name) => `आदरणीय ${name},`,
      defaultGreeting: 'आप सादर आमंत्रित हैं',
    },

    blessings: {
      ganesh: '॥ श्री गणेशाय नम: ॥',
      shlok:
        'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ: ।\nनिर्विघ्नं कुरुमेदेव सर्व कार्येषु सर्वदा ॥',
      vishnu:
        'मंगलम् भगवान विष्णु: मंगलम् गरुड़ध्वज: ।\nमंगलम् पुण्डरीकाक्ष: मंगलाय तनो5 हरि: ॥',
      invite:
        'स्नेहिल स्वजन, परमपिता परमेश्वर की असीम अनुकम्पा व आशीर्वाद से हमारे परिवार में शुभ प्रसंग का अवसर आया है।',
      sectionLabel: 'सपरिवार सादर आमंत्रण',
      heading: 'वधू एवं वर परिचय',

      bride: {
        label: 'वधू',
        name: 'Er. पारुल शर्मा',
        grandparentsLabel: 'पौत्री',
        grandparents: 'श्री चरणसिंह शर्मा एवं स्व. श्रीमती प्रेमादेवी शर्मा',
        parentsLabel: 'पुत्री',
        parents: 'श्री कमलकांत शर्मा एवं श्रीमती रेनू शर्मा',
        city: 'उज्जैन',
        granddaughterOf: 'पौत्री: श्री चरणसिंह शर्मा एवं स्व. श्रीमती प्रेमादेवी शर्मा',
        daughterOf: 'पुत्री: श्री कमलकांत शर्मा एवं श्रीमती रेनू शर्मा (उज्जैन)',
        alt: 'पारुल शर्मा, वधू',
      },

      groom: {
        label: 'वर',
        name: 'Er. शुभम शर्मा',
        grandparentsLabel: 'पौत्र',
        grandparents: 'स्व. श्री हरनारायण शर्मा एवं श्रीमती सत्यवती देवी शर्मा',
        parentsLabel: 'पुत्र',
        parents: 'श्री सुधीर कुमार शर्मा एवं श्रीमती राजबाला शर्मा',
        city: 'अलीगढ़',
        grandsonOf: 'पौत्र: स्व. श्री हरनारायण शर्मा एवं श्रीमती सत्यवती देवी शर्मा',
        sonOf: 'पुत्र: श्री सुधीर कुमार शर्मा एवं श्रीमती राजबाला शर्मा (अलीगढ़)',
        alt: 'शुभम शर्मा, वर',
      },

      closing:
        'हम विनम्रतापूर्वक इस शुभ अवसर पर आपकी उपस्थिति का अनुरोध करते हैं',
    },

    mataPoojan: {
      eyebrow: 'उज्जैन · मंगल अनुष्ठान',
      title: 'माता पूजन एवं स्नेहभोज',
      dateBanner: 'दि. 15 नवम्बर 2026, रविवार',
      intro:
        'परमपिता परमेश्वर, कुलदेवी एवं पूज्य पूर्वजों के असीम आशीर्वाद से उज्जैन में आयोजित मांगलिक अनुष्ठान एवं प्रीतिभोज।',
      footerLine: 'उज्जैन में आपका हार्दिक स्वागत है',
      events: [
        {
          id: 'mata-pujan',
          tag: 'मांगलिक पूजन',
          name: 'माता पूजन',
          time: 'सुबह 9:30 बजे',
          timeLabel: 'सुबह 9:30 बजे',
          venue: 'निज निवास (पारिवारिक निवास), उज्जैन',
          address: '',
          mapQuery: 'Nij Niwas Ujjain',
          desc: 'कुलदेवी एवं मातृ शक्तियों की विधि-विधान से पावन आराधना, वधू के मंगलमय जीवन एवं अखण्ड सौभाग्य हेतु प्रार्थना।',
        },
        {
          id: 'sneh-bhoj',
          tag: 'पारिवारिक स्नेहभोज',
          name: 'स्नेहभोज',
          time: 'दोप. 12:30 बजे से 3:30 बजे तक',
          timeLabel: 'दोप. 12:30 बजे से 3:30 बजे तक',
          venue: 'श्री रिद्धि–सिद्धि विनायक परिसर',
          address: 'गायत्री शक्ति पीठ के सामने, अंकपात मार्ग, उज्जैन (म.प्र.)',
          mapQuery: 'श्री रिद्धि–सिद्धि विनायक परिसर, गायत्री शक्ति पीठ के सामने, अंकपात मार्ग, उज्जैन',
          desc: 'समस्त स्नेही स्वजनों, इष्ट-मित्रों एवं परिजनों के साथ स्नेहपूर्ण मिलन एवं स्वरुचिभोज का मंगलमय आयोजन।',
        },
      ],
      calendarBtn: 'कैलेंडर में जोड़ें',
      mapsBtn: 'स्थान का नक्शा देखें',
      threeTitle: 'पावन अखंड ज्योति',
      threeHint: 'इंटरैक्टिव 3D • ज्योति को स्पर्श करें या कर्सर घुमाएं',
    },

    weddingCelebrations: {
      eyebrow: 'अलीगढ़ · विवाह समारोह',
      title: 'विवाह समारोह',
      dateBanner: 'दि. 20 नवम्बर 2026, शुक्रवार',
      intro:
        'दो परिवारों के मिलन के इस आनंदमय अवसर पर आप सादर आमंत्रित हैं। रस्मों, संगीत और आशीर्वाद के साथ स्नेहपूर्ण स्वरुचिभोज का आयोजन है।',
      footerLine: 'अलीगढ़ में आपका हार्दिक स्वागत है',
      threeTitle: 'मंगल वेदी',
      threeHint: 'इंटरैक्टिव 3D · देखने के लिए कर्सर घुमाएँ या टैप करें',
      threeAlt: 'विवाह समारोहों का इंटरैक्टिव 3D प्रदर्शन',
      events: [
        {
          id: 'lagn-sagai',
          badge: 'पावन बंधन',
          title: 'लग्न एवं सगाई',
          time: 'शाम 04 बजे',
          note: 'सगाई की रस्म एवं शुभ लग्न अनुष्ठान।',
          ariaLabel: 'कार्यक्रम 1: लग्न एवं सगाई, शाम 04 बजे',
        },
        {
          id: 'baraat-swagat',
          badge: 'भव्य स्वागत',
          title: 'बारात स्वागत',
          time: 'शाम 07 बजे',
          note: 'संगीत और उल्लास के साथ बारात का भव्य स्वागत।',
          ariaLabel: 'कार्यक्रम 2: बारात स्वागत, शाम 07 बजे',
        },
        {
          id: 'ashirwad-bhoj',
          badge: 'आशीर्वाद एवं भोज',
          title: 'आशीर्वाद समारोह एवं स्वरुचिभोज',
          time: 'रात्रि 7:30 बजे से आपके आगमन तक',
          note: 'वर-वधू को आशीर्वाद दें और परिवार व मित्रों के साथ स्वरुचिभोज का आनंद लें।',
          ariaLabel: 'कार्यक्रम 3: आशीर्वाद समारोह एवं स्वरुचिभोज, रात्रि 7:30 बजे से आपके आगमन तक',
        },
      ],
      venue: {
        label: 'विवाह स्थल',
        name: 'स्वर्णभूमि',
        address: 'निकट खेरेश्वर मंदिर, खैर रोड, अलीगढ़ (उ.प्र.)',
        mapQuery: 'Swarnbhoomi, near Khereshwar Mandir, Khair Road, Aligarh (U.P.)',
        mapsBtn: 'वेन्यू मैप देखें',
        calendarBtn: 'कैलेंडर में जोड़ें',
      },
      dotLabels: [
        'लग्न एवं सगाई (अंगूठी युगल)',
        'बारात स्वागत (जयमाला)',
        'आशीर्वाद एवं भोज (मंगल कलश)',
      ],
    },

    vidaai: {
      eyebrow: 'आशीर्वाद सहित विदाई',
      title: 'विदाई',
      date: 'दि. 21 नवम्बर 2026, शनिवार',
      badge: 'नई शुरुआत',
      time: 'प्रातः 06 बजे',
      description:
        'नम आँखों और भरे हृदय से हम वधू को स्नेहपूर्ण विदाई देते हैं, जब वह दोनों परिवारों के आशीर्वाद के साथ अपने नए जीवन की यात्रा आरंभ करती हैं।',
      calendarBtn: 'कैलेंडर में जोड़ें',
      mapsBtn: 'वेन्यू मैप देखें',
      venueLabel: 'विदाई स्थल',
      threeTitle: 'विदाई - उषाकाल',
      threeHint: 'इंटरैक्टिव 3D · देखने के लिए खींचें',
      threeAlt: 'उषाकाल में विदाई का 3D दृश्य',
      replayBtn: 'सूर्योदय फिर देखें',
      footerLine: 'प्रेम और आशीर्वाद सहित',
    },

    couple: {
      bride: {
        name: 'Er. पारुल शर्मा',
        bio: 'एक प्रतिभाशाली इंजीनियर, जिनकी मुस्कान से हर आँगन रोशन हो जाता है।',
      },
      groom: {
        name: 'Er. शुभम शर्मा',
        bio: 'एक समर्पित इंजीनियर, जिनका सौम्य स्वभाव और प्रेमिल हृदय हर पल को विशेष बनाता है।',
      },
    },

    countdown: {
      heading: 'शुभ मुहूर्त की प्रतीक्षा',
      days: 'दिन',
      hours: 'घंटे',
      minutes: 'मिनट',
      seconds: 'सेकंड',
      past: 'उत्सव आरम्भ हो चुका है!',
    },

    events: {
      heading: 'आयोजन',
      subheading: 'इन मंगल कार्यक्रमों में पधारें',
      addToCalendar: 'कैलेंडर में जोड़ें',
      list: [
        {
          id: 'mata-pujan',
          name: 'माता पूजन',
          date: 'रविवार, 15 नवम्बर 2026',
          time: 'सुबह 9:30 बजे',
          venue: 'निज निवास',
          address: '55, गाँधी नगर, आगर रोड, उज्जैन (म.प्र.)',
          icon: 'diya',
        },
        {
          id: 'sneh-bhoj',
          name: 'स्नेहभोज',
          subtitle: 'पारिवारिक भोजन',
          date: 'रविवार, 15 नवम्बर 2026',
          time: 'दोप. 12:30 से 3:30 बजे',
          venue: 'श्री रिद्धी-सिद्धी विनायक परिसर',
          address: 'गायत्री शक्ति पीठ के सामने, अंकपात मार्ग, उज्जैन',
          icon: 'marigold',
        },
        {
          id: 'lagna-sagaai',
          name: 'लग्न एवं सगाई',
          date: 'शुक्रवार, 20 नवम्बर 2026',
          time: 'शाम 4:00 बजे',
          venue: 'स्वर्णभूमि',
          address: 'निकट खेरेश्वर मंदिर, खैर रोड, अलीगढ़ (उ.प्र.)',
          icon: 'rings',
        },
        {
          id: 'baraat',
          name: 'बारात स्वागत',
          date: 'शुक्रवार, 20 नवम्बर 2026',
          time: 'शाम 7:00 बजे',
          venue: 'स्वर्णभूमि',
          address: 'निकट खेरेश्वर मंदिर, खैर रोड, अलीगढ़ (उ.प्र.)',
          icon: 'horse',
        },
        {
          id: 'ashirwad',
          name: 'आशीर्वाद समारोह एवं स्वरुचिभोज',
          date: 'शुक्रवार, 20 नवम्बर 2026',
          time: 'रात्रि 7:30 बजे से आगमन तक',
          venue: 'स्वर्णभूमि',
          address: 'निकट खेरेश्वर मंदिर, खैर रोड, अलीगढ़ (उ.प्र.)',
          icon: 'garland',
        },
        {
          id: 'vidai',
          name: 'विदाई',
          date: 'शनिवार, 21 नवम्बर 2026',
          time: 'प्रात: 6:00 बजे',
          venue: 'स्वर्णभूमि',
          address: 'निकट खेरेश्वर मंदिर, खैर रोड, अलीगढ़ (उ.प्र.)',
          icon: 'lotus',
        },
      ],
    },

    baraat: {
      heading: 'बारात आ रही है',
      subtext: 'वर-पक्ष की बारात · 20 नवम्बर · शाम 7:00 बजे',
      reveal: 'बारात शाम 7:00 बजे पधारेगी',
    },

    card: {
      heading: 'हमारा निमंत्रण पत्र',
      download: 'कार्ड डाउनलोड करें',
      pinchHint: 'ज़ूम करने के लिए चुटकी बजाएँ',
    },

    gallery: {
      heading: 'यादगार पल',
    },

    venue: {
      heading: 'विवाह स्थल',
      name: 'स्वर्णभूमि',
      address: 'निकट खेरेश्वर मंदिर, खैर रोड, अलीगढ़ (उ.प्र.)',
      mapButton: 'गूगल मैप में देखें',
      clickForMap: 'मानचित्र देखने के लिए क्लिक करें',
    },

    rsvp: {
      heading: 'शुभकामनाएँ एवं आशीर्वाद',
      subheading: 'वर-वधू को अपने स्नेह और मंगल आशीर्वाद से अभिसिंचित करें',
      nameLabel: 'आपका नाम / परिवार का नाम',
      messageLabel: 'शुभकामना संदेश एवं आशीर्वाद',
      whatsappBtn: 'WhatsApp पर शुभकामनाएँ भेजें',
      callBtn: 'फ़ोन करें',
      placeholderName: 'जैसे: शर्मा परिवार',
      placeholderMessage: 'पारुल एवं शुभम को सुखद वैवाहिक जीवन एवं अनंत खुशियों की हार्दिक मंगलकामनाएँ...',
      whatsappMessage: (name, message) =>
        `नमस्ते 🙏\nपारुल एवं शुभम के शुभ विवाह पर हार्दिक बधाई व मंगलकामनाएँ! 🌸\n\n"${message || 'सदा सुहागन रहो, जीवन में अपार खुशियाँ और प्रेम रहे!'}"\n\nस्नेह और आशीर्वाद सहित,\n*${name}*`,
    },

    footer: {
      blessing: 'शुभ विवाह 🌸',
      tagline: 'प्रेम, हास्य और खुशियों से भरा जीवन मिले आप दोनों को।',
      hashtag: '#ParulWedShubham',
      madeWith: 'प्यार से बनाया गया — पारुल & शुभम के लिए',
      replayIntro: 'परिचय फिर देखें',
      language: 'View in English',
    },

    music: {
      play: 'संगीत चलाएं',
      pause: 'संगीत रोकें',
      notAvailable: 'संगीत शीघ्र आएगा',
    },
  },
};

export default content;
