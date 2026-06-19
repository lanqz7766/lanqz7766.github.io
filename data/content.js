window.SITE_CONTENT = {
  profile: {
    name: "Qizhen Lan",
    title: "Postdoctoral Research Fellow",
    affiliation: "UThealth-Houston",
    affiliationUrl: "https://www.uth.edu/",
    email: "Qizhen.Lan@uth.tmc.edu",
    avatar: "assets/img/profile-photo.webp",
    links: [
      {
        label: "Scholar",
        url: "https://scholar.google.com/citations?user=hz8cb2AAAAAJ&hl=en&oi=ao"
      },
      { label: "GitHub", url: "https://github.com/lanqz7766" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/qizhen-lan/" },
      { label: "CV", url: "assets/files/curriculum_vitae.pdf" }
    ]
  },

  linkMap: {
    "McWilliams School of Biomedical Informatics": "https://sbmi.uth.edu/",
    "University of Texas Health Science Center at Houston": "https://www.uth.edu/",
    "UTHealth Houston": "https://www.uth.edu/",
    "UThealth-Houston": "https://www.uth.edu/",
    "University of Alabama at Birmingham": "https://www.uab.edu/home/",
    "Dr. Xiaoqian Jiang": "https://sbmi.uth.edu/faculty-and-staff/xiaoqian-jiang.htm",
    "Xiaoqian Jiang": "https://sbmi.uth.edu/faculty-and-staff/xiaoqian-jiang.htm",
    "Dr. Qing Tian": "https://qtianreal.github.io/",
    "Qing Tian": "https://qtianreal.github.io/",
    "npj Health Systems": "https://www.nature.com/npjhealthsyst/",
    "npj Digital Medicine": "https://www.nature.com/npjdigitalmed/",
    "NeurIPS 2026": "https://nips.cc/",
    "ACM Multimedia 2026": "https://2026.acmmm.org/",
    "MICCAI 2026": "https://conferences.miccai.org/2026/en/",
    "WWW 2026": "https://www2026.thewebconf.org/",
    "ACL 2026 Main Conference": "https://2026.aclweb.org/program/accepted_main_conference/",
    "ICLR 2026": "https://iclr.cc/Conferences/2026",
    "ECCV 2026": "https://eccv.ecva.net/",
    "ICCV 2025": "https://iccv.thecvf.com/",
    "WACV 2025": "https://wacv2025.thecvf.com/",
    "WACV 2024": "https://wacv2024.thecvf.com/",
    "CVPR 2026": "https://cvpr2026.thecvf.com/"
  },

  about: [
    "I am currently a Postdoctoral Research Fellow in the McWilliams School of Biomedical Informatics at UTHealth Houston, working with Dr. Xiaoqian Jiang. I received my Ph.D. in Computer Science from the University of Alabama at Birmingham, where I worked with Dr. Qing Tian.",
    "My work sits at the intersection of medical imaging, efficient vision models, and agentic AI. I am especially interested in problems where algorithm design meets real workflows, including deployable medical AI, trustworthy evaluation, efficient models under resource constraints, and clinical agents for biomedical reasoning and care delivery. I am also exploring startup and product opportunities around clinical AI systems."
  ],

  collaboration:
    "Open to research internships, visiting opportunities, collaborations, and conversations around clinical AI products. If my work overlaps with your interests, or if you simply want to exchange ideas, please feel free to reach out.",

  researchInterests: [
    {
      title: "Medical AI",
      text: "Clinical imaging, 3D segmentation, and deployable medical AI systems."
    },
    {
      title: "Efficient AI",
      text: "Knowledge distillation, pruning, and compact models for real deployment."
    },
    {
      title: "Computer Vision",
      text: "Detection, tracking, robustness, and task-aware perception."
    },
    {
      title: "Agentic & Trustworthy AI",
      text: "Adaptive perception, decision-aware learning, safety, and reliability."
    }
  ],

  news: [
    {
      year: "2026",
      items: [
        { date: "Jun", text: "One paper was accepted to ECCV 2026." },
        {
          date: "May",
          text: "Four papers were accepted to MICCAI 2026, including two early accepts (top 9% among 4,601 submissions).",
          highlightText: "two early accepts (top 9% among 4,601 submissions)."
        },
        { date: "May", text: "One paper was accepted to Nature - npj Health Systems." },
        {
          date: "Apr",
          text: "KnowMe-Bench was accepted to ACL 2026 Main Conference as an Oral Presentation.",
          highlightText: "Oral Presentation."
        },
        { date: "Jan", text: "Uni-NTFM was accepted to ICLR 2026 as a Poster." },
        { date: "Jan", text: "One paper has been accepted to ICASSP 2026." },
        { date: "Jan", text: "One co-first-author paper was accepted to WWW 2026." }
      ]
    },
    {
      year: "2025",
      items: [
        { date: "Nov", text: "Two papers have been accepted to WACV 2026." },
        { date: "May", text: "One paper on knowledge distillation has been accepted to ICCV 2025." },
        { date: "May", text: "Started postdoctoral research at UTHealth Houston." },
        { date: "May", text: "Received Ph.D. in Computer Science from the University of Alabama at Birmingham." }
      ]
    },
    {
      year: "2024",
      items: [
        {
          date: "Oct",
          text: "One paper on detector robustness was accepted to WACV 2025 as an Oral Presentation.",
          highlightText: "Oral Presentation."
        },
        { date: "Sep", text: "One paper on medical image segmentation was accepted to ICTAI 2024." }
      ]
    }
  ],

  selectedPublications: [
    {
      title: "KnowMe-Bench: Benchmarking Person Understanding for Lifelong Digital Companions",
      authors: "Tingyu Wu, Zhisheng Chen, Ziyan Weng, Shuhe Wang, Chenglong Li, Shuo Zhang, Sen Hu, Silin Wu, Qizhen Lan, Huacan Wang, Ronghao Chen",
      venue: "ACL 2026 Main Conference",
      contribution: "Corresponding author",
      note: "Oral Presentation",
      image: "assets/img/KnowMeBench-main.png",
      links: [
        { label: "Paper", url: "https://arxiv.org/pdf/2601.04745" },
        { label: "Code", url: "https://github.com/QuantaAlpha/KnowMeBench" }
      ]
    },
    {
      title: "Detail Consistent Stage-Wise Distillation for Efficient 3D MRI Segmentation",
      authors: "Mengchen Fan, Baocheng Geng, Xi Xiao, Tianyang Wang, Siyuan Mei, Pulin Che, Xiaoqian Jiang, Qizhen Lan",
      venue: "MICCAI 2026",
      contribution: "Corresponding author",
      note: "Top 9% provisionally accepted among 4,601 MICCAI 2026 submissions",
      image: "assets/img/DCD-main.png",
      links: [
        { label: "Paper", url: "https://arxiv.org/pdf/2605.26382" },
        { label: "Code", url: "https://github.com/ClinicaAlpha/DCD-3D-MedSeg" }
      ]
    },
    {
      title: "ACAM-KD: Adaptive and Cooperative Attention Masking for Knowledge Distillation",
      authors: "Qizhen Lan, Qing Tian",
      venue: "ICCV 2025",
      contribution: "First author",
      image: "assets/img/ACAM-KD.png",
      links: [{ label: "Paper", url: "https://arxiv.org/pdf/2503.06307" }]
    },
    {
      title: "Improving Deep Detector Robustness via Detection-Related Discriminant Maximization and Reorganization",
      authors: "Jung Im Choi*, Qizhen Lan*, Qing Tian",
      venue: "WACV 2025",
      contribution: "Co-first author",
      note: "Oral Presentation",
      image: "assets/img/DDMR.png",
      links: [
        {
          label: "Paper",
          url: "https://openaccess.thecvf.com/content/WACV2025/papers/Choi_Improving_Deep_Detector_Robustness_via_Detection-Related_Discriminant_Maximization_and_Reorganization_WACV_2025_paper.pdf"
        }
      ]
    },
    {
      title: "Gradient-Guided Knowledge Distillation for Object Detectors",
      authors: "Qizhen Lan, Qing Tian",
      venue: "WACV 2024",
      contribution: "First author",
      image: "assets/img/GKD.png",
      links: [
        {
          label: "Paper",
          url: "https://openaccess.thecvf.com/content/WACV2024/papers/Lan_Gradient-Guided_Knowledge_Distillation_for_Object_Detectors_WACV_2024_paper.pdf"
        },
        { label: "Code", url: "https://github.com/lanqz7766/GKD" }
      ]
    }
  ],

  otherPublications: [
    {
      year: "2026",
      items: [
        {
          title: "Uni-NTFM: A Unified Foundation Model for EEG Signal Representation Learning",
          authors: "Zhisheng Chen, Yingwei Zhang, Qizhen Lan, Tianyu Liu, Huacan Wang, Yi Ding, Ziyu Jia, Ronghao Chen, Kun Wang, Xinliang Zhou",
          venue: "ICLR 2026 Poster",
          image: "assets/img/Uni-NTFM-main.png?v=20260528-13",
          links: [{ label: "Paper", url: "https://arxiv.org/pdf/2509.24222" }]
        },
        {
          title: "From Performance to Practice: Knowledge-Distilled Segmentator for On-Premises Clinical Workflows",
          authors: "Qizhen Lan, Aaron Choi, Jun Ma, Bo Wang, Zhongming Zhao, Xiaoqian Jiang, Yu-Chun Hsu",
          venue: "npj Health Systems, 2026",
          links: [{ label: "Paper", url: "https://arxiv.org/pdf/2601.09191" }]
        },
        {
          title: "Difficulty-Aware Agentic Orchestration for Query-Specific Multi-Agent Workflows",
          authors: "Jinwei Su*, Qizhen Lan*, Yinghui Xia, Lifan Sun, Weiyou Tian, Tianyu Shi, Xinyuan Song, Lewei He",
          venue: "WWW 2026 Research Track, 20.1% acceptance rate (* Co-first author)"
        }
      ]
    },
    {
      year: "2025",
      items: [
        {
          title: "CLoCKDistill: Consistent Location-and-Context-aware Knowledge Distillation for DETRs",
          authors: "Qizhen Lan, Qing Tian",
          venue: "WACV 2025",
          links: [{ label: "Paper", url: "https://arxiv.org/pdf/2502.10683" }]
        }
      ]
    },
    {
      year: "2022",
      items: [
        {
          title: "Instance, Scale, and Teacher Adaptive Knowledge Distillation for Visual Detection in Autonomous Driving",
          authors: "Qizhen Lan, Qing Tian",
          venue: "IEEE Transactions on Intelligent Vehicles",
          links: [{ label: "Paper", url: "https://par.nsf.gov/servlets/purl/10405166" }]
        }
      ]
    }
  ],

  education: [
    {
      title: "Ph.D. in Computer Science",
      organization: "University of Alabama at Birmingham",
      period: "Completed May 2025",
      location: "Birmingham, Alabama, USA",
      detail: "Advisor: Dr. Qing Tian"
    }
  ],

  experience: [
    {
      title: "Postdoctoral Research Fellow",
      organization: "UTHealth Houston",
      period: "May 2025 - Present",
      location: "Houston, Texas, USA",
      detail: "McWilliams School of Biomedical Informatics; supervised by Dr. Xiaoqian Jiang."
    }
  ],

  awards: [
    "[2026] NSF ACCESS Advanced Computing Allocation, approximately $10,000 GPU resources.",
    "[2023] Graduate College Professional Development Funds.",
    "[2018] Analytics Instructional Fee Award."
  ],

  serviceGroups: [
    {
      title: "Conference Reviewers",
      items: [
        {
          label: "Annual Conference on Neural Information Processing Systems (NeurIPS) 2026",
          url: "https://nips.cc/"
        },
        {
          label: "ACM Multimedia (MM) 2026",
          url: "https://2026.acmmm.org/"
        },
        {
          label: "International Conference on Medical Image Computing and Computer-Assisted Intervention (MICCAI) 2026",
          url: "https://conferences.miccai.org/2026/en/default.asp"
        },
        {
          label: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2026",
          url: "https://cvpr2026.thecvf.com/"
        },
        {
          label: "AAAI Conference on Artificial Intelligence (AAAI) 2025",
          url: "https://aaai.org/conference/aaai/aaai-25/"
        },
        {
          label: "IEEE International Symposium on Biomedical Imaging (ISBI) 2025",
          url: "https://biomedicalimaging.org/2025/"
        },
        {
          label: "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV) 2024, 2025",
          url: "https://wacv2025.thecvf.com/"
        }
      ]
    },
    {
      title: "Journal Reviewers",
      items: [
        { label: "Nature - npj Digital Medicine", url: "https://www.nature.com/npjdigitalmed/" },
        {
          label: "IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)",
          url: "https://ieee-cas.org/publication/tcsvt"
        },
        {
          label: "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)",
          url: "https://cis.ieee.org/publications/t-neural-networks-and-learning-systems"
        },
        {
          label: "IEEE Transactions on Multimedia (TMM)",
          url: "https://ieee-cas.org/publication/ieee-transactions-multimedia"
        }
      ]
    }
  ]
};
