import { CourseTab } from "@/app/components/molecules/CourseTab";

interface TabItem {
  id: string;
  label: string;
}

interface CourseTabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const CourseTabNavigation = ({
  tabs,
  activeTab,
  setActiveTab
}: CourseTabNavigationProps) => {
  return (
    <div className="flex mb-6 w-full bg-[#f5f5f5]">
      {tabs.map((tab) => (
        <CourseTab
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={setActiveTab}
        />
      ))}
    </div>
  );
};
