export interface PostProps {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  slug: string;
}

export interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export interface StatItem {
  value: number;
  title: string;
  subtitle?: string;
}

export interface StatItemProps {
  count: number;
  title: string;
}

export interface TestimonialPaginationProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export interface TestimonialDotProps {
  active: boolean;
  onClick: () => void;
}

export interface TestimonialItemProps {
  name: string;
  role: string;
  image: string;
  content: string;
}

export interface SeoData {
  seo: {
    fullHead?: string;
    focusKeywords?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface IndustryGroup {
  industryname: string;
  description: string;
  image?: {
    node?: {
      mediaItemUrl?: string;
    };
  };
}

export interface NganhHocData {
  title?: string;
  banner?: {
    node?: {
      mediaItemUrl?: string;
    };
  };
  industrygroups?: IndustryGroup[];
}

export interface CountdownTimerProps {
  title?: string;
  date: string;
  includeTime?: boolean;
}
export interface Teacher {
  name?: string;
  role?: string;
  avarta?: {
    node?: {
      mediaItemUrl?: string;
    };
  };
}

export interface InstructorContent {
  courseDetails?: any[];
  courseContent?: string;
  teacher?: Teacher;
}

export interface CourseInstructorContentProps {
  data: InstructorContent;
}
export interface Detail {
  content?: string;
  tex?: string;
}

export interface CourseDetailsProps {
  details: Detail[];
}

export interface CurriculumContent {
  courseDetails?: any[];
  coursecontent?: string;
}

export interface CourseCurriculumContentProps {
  data: CurriculumContent;
}

export interface CourseTabsProps {
  courseData: any;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export interface OverviewContent {
  courseDetails?: any[];
  courseContent?: string;
}

export interface CourseOverviewContentProps {
  data: OverviewContent;
}
export interface CourseContentProps {
  courseData: any;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  loading?: boolean;
}
